-- Composal SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("composal_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ComposalSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

ComposalSDK.__index = function(self, key)
  local member = rawget(ComposalSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

ComposalSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function ComposalSDK:to_record()
  return { sdk = "Composal", mode = self.mode }
end

ComposalSDK.__tostring = function(self)
  return "ComposalSDK mode=" .. tostring(self.mode)
end

ComposalSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ComposalSDK._make_feature = _make_feature


function ComposalSDK.new(options)
  local self = setmetatable({}, ComposalSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: secrets
  -- feature: test
  -- feature: timeout


  return self
end


function ComposalSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ComposalSDK:get_utility()
  return Utility.copy(self._utility)
end


function ComposalSDK:get_root_ctx()
  return self._rootctx
end


function ComposalSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  -- A raw request has no point to declare its response type, so it asks
  -- for the JSON it reads: an API that negotiates on Accept otherwise
  -- answers in its own default format. A caller's own accept wins.
  local has_accept = false
  for k, _ in pairs(ctx.spec.headers) do
    if string.lower(tostring(k)) == "accept" then
      has_accept = true
      break
    end
  end
  if not has_accept then
    ctx.spec.headers["accept"] = "application/json"
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function ComposalSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function ComposalSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function ComposalSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "ComposalSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function ComposalSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function ComposalSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "ComposalSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Agent():list() / client:Agent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Agent(data)
  local EntityMod = require("entity.agent_entity")
  if data == nil then
    if self._agent == nil then
      self._agent = EntityMod.new(self, nil)
    end
    return self._agent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentAttachment():list() / client:AgentAttachment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentAttachment(data)
  local EntityMod = require("entity.agent_attachment_entity")
  if data == nil then
    if self._agent_attachment == nil then
      self._agent_attachment = EntityMod.new(self, nil)
    end
    return self._agent_attachment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentAutomation():list() / client:AgentAutomation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentAutomation(data)
  local EntityMod = require("entity.agent_automation_entity")
  if data == nil then
    if self._agent_automation == nil then
      self._agent_automation = EntityMod.new(self, nil)
    end
    return self._agent_automation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentAvatar():list() / client:AgentAvatar():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentAvatar(data)
  local EntityMod = require("entity.agent_avatar_entity")
  if data == nil then
    if self._agent_avatar == nil then
      self._agent_avatar = EntityMod.new(self, nil)
    end
    return self._agent_avatar
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentCommand():list() / client:AgentCommand():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentCommand(data)
  local EntityMod = require("entity.agent_command_entity")
  if data == nil then
    if self._agent_command == nil then
      self._agent_command = EntityMod.new(self, nil)
    end
    return self._agent_command
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentComputer():list() / client:AgentComputer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentComputer(data)
  local EntityMod = require("entity.agent_computer_entity")
  if data == nil then
    if self._agent_computer == nil then
      self._agent_computer = EntityMod.new(self, nil)
    end
    return self._agent_computer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentConnection():list() / client:AgentConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnection(data)
  local EntityMod = require("entity.agent_connection_entity")
  if data == nil then
    if self._agent_connection == nil then
      self._agent_connection = EntityMod.new(self, nil)
    end
    return self._agent_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentControlFlow():list() / client:AgentControlFlow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentControlFlow(data)
  local EntityMod = require("entity.agent_control_flow_entity")
  if data == nil then
    if self._agent_control_flow == nil then
      self._agent_control_flow = EntityMod.new(self, nil)
    end
    return self._agent_control_flow
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentCoordination():list() / client:AgentCoordination():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentCoordination(data)
  local EntityMod = require("entity.agent_coordination_entity")
  if data == nil then
    if self._agent_coordination == nil then
      self._agent_coordination = EntityMod.new(self, nil)
    end
    return self._agent_coordination
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentEmail():list() / client:AgentEmail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentEmail(data)
  local EntityMod = require("entity.agent_email_entity")
  if data == nil then
    if self._agent_email == nil then
      self._agent_email = EntityMod.new(self, nil)
    end
    return self._agent_email
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentFile():list() / client:AgentFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentFile(data)
  local EntityMod = require("entity.agent_file_entity")
  if data == nil then
    if self._agent_file == nil then
      self._agent_file = EntityMod.new(self, nil)
    end
    return self._agent_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentInput():list() / client:AgentInput():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentInput(data)
  local EntityMod = require("entity.agent_input_entity")
  if data == nil then
    if self._agent_input == nil then
      self._agent_input = EntityMod.new(self, nil)
    end
    return self._agent_input
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentIntegration():list() / client:AgentIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentIntegration(data)
  local EntityMod = require("entity.agent_integration_entity")
  if data == nil then
    if self._agent_integration == nil then
      self._agent_integration = EntityMod.new(self, nil)
    end
    return self._agent_integration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentInteraction():list() / client:AgentInteraction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentInteraction(data)
  local EntityMod = require("entity.agent_interaction_entity")
  if data == nil then
    if self._agent_interaction == nil then
      self._agent_interaction = EntityMod.new(self, nil)
    end
    return self._agent_interaction
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentLibrary():list() / client:AgentLibrary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentLibrary(data)
  local EntityMod = require("entity.agent_library_entity")
  if data == nil then
    if self._agent_library == nil then
      self._agent_library = EntityMod.new(self, nil)
    end
    return self._agent_library
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentManager():list() / client:AgentManager():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentManager(data)
  local EntityMod = require("entity.agent_manager_entity")
  if data == nil then
    if self._agent_manager == nil then
      self._agent_manager = EntityMod.new(self, nil)
    end
    return self._agent_manager
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentManagerChoice():list() / client:AgentManagerChoice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentManagerChoice(data)
  local EntityMod = require("entity.agent_manager_choice_entity")
  if data == nil then
    if self._agent_manager_choice == nil then
      self._agent_manager_choice = EntityMod.new(self, nil)
    end
    return self._agent_manager_choice
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentMarketplace():list() / client:AgentMarketplace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentMarketplace(data)
  local EntityMod = require("entity.agent_marketplace_entity")
  if data == nil then
    if self._agent_marketplace == nil then
      self._agent_marketplace = EntityMod.new(self, nil)
    end
    return self._agent_marketplace
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentMarketplaceShared():list() / client:AgentMarketplaceShared():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentMarketplaceShared(data)
  local EntityMod = require("entity.agent_marketplace_shared_entity")
  if data == nil then
    if self._agent_marketplace_shared == nil then
      self._agent_marketplace_shared = EntityMod.new(self, nil)
    end
    return self._agent_marketplace_shared
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentMissionControl():list() / client:AgentMissionControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentMissionControl(data)
  local EntityMod = require("entity.agent_mission_control_entity")
  if data == nil then
    if self._agent_mission_control == nil then
      self._agent_mission_control = EntityMod.new(self, nil)
    end
    return self._agent_mission_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentOperation():list() / client:AgentOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentOperation(data)
  local EntityMod = require("entity.agent_operation_entity")
  if data == nil then
    if self._agent_operation == nil then
      self._agent_operation = EntityMod.new(self, nil)
    end
    return self._agent_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentProvisioning():list() / client:AgentProvisioning():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentProvisioning(data)
  local EntityMod = require("entity.agent_provisioning_entity")
  if data == nil then
    if self._agent_provisioning == nil then
      self._agent_provisioning = EntityMod.new(self, nil)
    end
    return self._agent_provisioning
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentPullRequest():list() / client:AgentPullRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentPullRequest(data)
  local EntityMod = require("entity.agent_pull_request_entity")
  if data == nil then
    if self._agent_pull_request == nil then
      self._agent_pull_request = EntityMod.new(self, nil)
    end
    return self._agent_pull_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentQuestion():list() / client:AgentQuestion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentQuestion(data)
  local EntityMod = require("entity.agent_question_entity")
  if data == nil then
    if self._agent_question == nil then
      self._agent_question = EntityMod.new(self, nil)
    end
    return self._agent_question
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentRepository():list() / client:AgentRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRepository(data)
  local EntityMod = require("entity.agent_repository_entity")
  if data == nil then
    if self._agent_repository == nil then
      self._agent_repository = EntityMod.new(self, nil)
    end
    return self._agent_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentResource():list() / client:AgentResource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentResource(data)
  local EntityMod = require("entity.agent_resource_entity")
  if data == nil then
    if self._agent_resource == nil then
      self._agent_resource = EntityMod.new(self, nil)
    end
    return self._agent_resource
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentRoutine():list() / client:AgentRoutine():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRoutine(data)
  local EntityMod = require("entity.agent_routine_entity")
  if data == nil then
    if self._agent_routine == nil then
      self._agent_routine = EntityMod.new(self, nil)
    end
    return self._agent_routine
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentRun():list() / client:AgentRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRun(data)
  local EntityMod = require("entity.agent_run_entity")
  if data == nil then
    if self._agent_run == nil then
      self._agent_run = EntityMod.new(self, nil)
    end
    return self._agent_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentRuntime():list() / client:AgentRuntime():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRuntime(data)
  local EntityMod = require("entity.agent_runtime_entity")
  if data == nil then
    if self._agent_runtime == nil then
      self._agent_runtime = EntityMod.new(self, nil)
    end
    return self._agent_runtime
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSetting():list() / client:AgentSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSetting(data)
  local EntityMod = require("entity.agent_setting_entity")
  if data == nil then
    if self._agent_setting == nil then
      self._agent_setting = EntityMod.new(self, nil)
    end
    return self._agent_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSharing():list() / client:AgentSharing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSharing(data)
  local EntityMod = require("entity.agent_sharing_entity")
  if data == nil then
    if self._agent_sharing == nil then
      self._agent_sharing = EntityMod.new(self, nil)
    end
    return self._agent_sharing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSite():list() / client:AgentSite():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSite(data)
  local EntityMod = require("entity.agent_site_entity")
  if data == nil then
    if self._agent_site == nil then
      self._agent_site = EntityMod.new(self, nil)
    end
    return self._agent_site
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSkill():list() / client:AgentSkill():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSkill(data)
  local EntityMod = require("entity.agent_skill_entity")
  if data == nil then
    if self._agent_skill == nil then
      self._agent_skill = EntityMod.new(self, nil)
    end
    return self._agent_skill
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSlack():list() / client:AgentSlack():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSlack(data)
  local EntityMod = require("entity.agent_slack_entity")
  if data == nil then
    if self._agent_slack == nil then
      self._agent_slack = EntityMod.new(self, nil)
    end
    return self._agent_slack
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSubagent():list() / client:AgentSubagent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSubagent(data)
  local EntityMod = require("entity.agent_subagent_entity")
  if data == nil then
    if self._agent_subagent == nil then
      self._agent_subagent = EntityMod.new(self, nil)
    end
    return self._agent_subagent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSubscription():list() / client:AgentSubscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSubscription(data)
  local EntityMod = require("entity.agent_subscription_entity")
  if data == nil then
    if self._agent_subscription == nil then
      self._agent_subscription = EntityMod.new(self, nil)
    end
    return self._agent_subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentTeammate():list() / client:AgentTeammate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentTeammate(data)
  local EntityMod = require("entity.agent_teammate_entity")
  if data == nil then
    if self._agent_teammate == nil then
      self._agent_teammate = EntityMod.new(self, nil)
    end
    return self._agent_teammate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentTerminal():list() / client:AgentTerminal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentTerminal(data)
  local EntityMod = require("entity.agent_terminal_entity")
  if data == nil then
    if self._agent_terminal == nil then
      self._agent_terminal = EntityMod.new(self, nil)
    end
    return self._agent_terminal
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentThread():list() / client:AgentThread():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentThread(data)
  local EntityMod = require("entity.agent_thread_entity")
  if data == nil then
    if self._agent_thread == nil then
      self._agent_thread = EntityMod.new(self, nil)
    end
    return self._agent_thread
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentTool():list() / client:AgentTool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentTool(data)
  local EntityMod = require("entity.agent_tool_entity")
  if data == nil then
    if self._agent_tool == nil then
      self._agent_tool = EntityMod.new(self, nil)
    end
    return self._agent_tool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentVerifyProject():list() / client:AgentVerifyProject():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentVerifyProject(data)
  local EntityMod = require("entity.agent_verify_project_entity")
  if data == nil then
    if self._agent_verify_project == nil then
      self._agent_verify_project = EntityMod.new(self, nil)
    end
    return self._agent_verify_project
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWait():list() / client:AgentWait():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWait(data)
  local EntityMod = require("entity.agent_wait_entity")
  if data == nil then
    if self._agent_wait == nil then
      self._agent_wait = EntityMod.new(self, nil)
    end
    return self._agent_wait
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWebhook():list() / client:AgentWebhook():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWebhook(data)
  local EntityMod = require("entity.agent_webhook_entity")
  if data == nil then
    if self._agent_webhook == nil then
      self._agent_webhook = EntityMod.new(self, nil)
    end
    return self._agent_webhook
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWork():list() / client:AgentWork():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWork(data)
  local EntityMod = require("entity.agent_work_entity")
  if data == nil then
    if self._agent_work == nil then
      self._agent_work = EntityMod.new(self, nil)
    end
    return self._agent_work
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWorkflow():list() / client:AgentWorkflow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWorkflow(data)
  local EntityMod = require("entity.agent_workflow_entity")
  if data == nil then
    if self._agent_workflow == nil then
      self._agent_workflow = EntityMod.new(self, nil)
    end
    return self._agent_workflow
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWorkflowProposal():list() / client:AgentWorkflowProposal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWorkflowProposal(data)
  local EntityMod = require("entity.agent_workflow_proposal_entity")
  if data == nil then
    if self._agent_workflow_proposal == nil then
      self._agent_workflow_proposal = EntityMod.new(self, nil)
    end
    return self._agent_workflow_proposal
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWorkflowRun():list() / client:AgentWorkflowRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWorkflowRun(data)
  local EntityMod = require("entity.agent_workflow_run_entity")
  if data == nil then
    if self._agent_workflow_run == nil then
      self._agent_workflow_run = EntityMod.new(self, nil)
    end
    return self._agent_workflow_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWorkflowTrigger():list() / client:AgentWorkflowTrigger():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWorkflowTrigger(data)
  local EntityMod = require("entity.agent_workflow_trigger_entity")
  if data == nil then
    if self._agent_workflow_trigger == nil then
      self._agent_workflow_trigger = EntityMod.new(self, nil)
    end
    return self._agent_workflow_trigger
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWorkspace():list() / client:AgentWorkspace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWorkspace(data)
  local EntityMod = require("entity.agent_workspace_entity")
  if data == nil then
    if self._agent_workspace == nil then
      self._agent_workspace = EntityMod.new(self, nil)
    end
    return self._agent_workspace
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentWritePermission():list() / client:AgentWritePermission():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWritePermission(data)
  local EntityMod = require("entity.agent_write_permission_entity")
  if data == nil then
    if self._agent_write_permission == nil then
      self._agent_write_permission = EntityMod.new(self, nil)
    end
    return self._agent_write_permission
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AllocationLog():list() / client:AllocationLog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AllocationLog(data)
  local EntityMod = require("entity.allocation_log_entity")
  if data == nil then
    if self._allocation_log == nil then
      self._allocation_log = EntityMod.new(self, nil)
    end
    return self._allocation_log
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:App():list() / client:App():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:App(data)
  local EntityMod = require("entity.app_entity")
  if data == nil then
    if self._app == nil then
      self._app = EntityMod.new(self, nil)
    end
    return self._app
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppCdn():list() / client:AppCdn():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppCdn(data)
  local EntityMod = require("entity.app_cdn_entity")
  if data == nil then
    if self._app_cdn == nil then
      self._app_cdn = EntityMod.new(self, nil)
    end
    return self._app_cdn
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppConfigVariable():list() / client:AppConfigVariable():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppConfigVariable(data)
  local EntityMod = require("entity.app_config_variable_entity")
  if data == nil then
    if self._app_config_variable == nil then
      self._app_config_variable = EntityMod.new(self, nil)
    end
    return self._app_config_variable
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppDataResource():list() / client:AppDataResource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppDataResource(data)
  local EntityMod = require("entity.app_data_resource_entity")
  if data == nil then
    if self._app_data_resource == nil then
      self._app_data_resource = EntityMod.new(self, nil)
    end
    return self._app_data_resource
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppDeploy():list() / client:AppDeploy():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppDeploy(data)
  local EntityMod = require("entity.app_deploy_entity")
  if data == nil then
    if self._app_deploy == nil then
      self._app_deploy = EntityMod.new(self, nil)
    end
    return self._app_deploy
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppDeployment():list() / client:AppDeployment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppDeployment(data)
  local EntityMod = require("entity.app_deployment_entity")
  if data == nil then
    if self._app_deployment == nil then
      self._app_deployment = EntityMod.new(self, nil)
    end
    return self._app_deployment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppDeploymentOperation():list() / client:AppDeploymentOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppDeploymentOperation(data)
  local EntityMod = require("entity.app_deployment_operation_entity")
  if data == nil then
    if self._app_deployment_operation == nil then
      self._app_deployment_operation = EntityMod.new(self, nil)
    end
    return self._app_deployment_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppDeploymentRollback():list() / client:AppDeploymentRollback():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppDeploymentRollback(data)
  local EntityMod = require("entity.app_deployment_rollback_entity")
  if data == nil then
    if self._app_deployment_rollback == nil then
      self._app_deployment_rollback = EntityMod.new(self, nil)
    end
    return self._app_deployment_rollback
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppEnvironment():list() / client:AppEnvironment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppEnvironment(data)
  local EntityMod = require("entity.app_environment_entity")
  if data == nil then
    if self._app_environment == nil then
      self._app_environment = EntityMod.new(self, nil)
    end
    return self._app_environment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppLocation():list() / client:AppLocation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppLocation(data)
  local EntityMod = require("entity.app_location_entity")
  if data == nil then
    if self._app_location == nil then
      self._app_location = EntityMod.new(self, nil)
    end
    return self._app_location
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppMetric():list() / client:AppMetric():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppMetric(data)
  local EntityMod = require("entity.app_metric_entity")
  if data == nil then
    if self._app_metric == nil then
      self._app_metric = EntityMod.new(self, nil)
    end
    return self._app_metric
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppPreview():list() / client:AppPreview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppPreview(data)
  local EntityMod = require("entity.app_preview_entity")
  if data == nil then
    if self._app_preview == nil then
      self._app_preview = EntityMod.new(self, nil)
    end
    return self._app_preview
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppPreviewProfile():list() / client:AppPreviewProfile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppPreviewProfile(data)
  local EntityMod = require("entity.app_preview_profile_entity")
  if data == nil then
    if self._app_preview_profile == nil then
      self._app_preview_profile = EntityMod.new(self, nil)
    end
    return self._app_preview_profile
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppRun():list() / client:AppRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppRun(data)
  local EntityMod = require("entity.app_run_entity")
  if data == nil then
    if self._app_run == nil then
      self._app_run = EntityMod.new(self, nil)
    end
    return self._app_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppSecret():list() / client:AppSecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppSecret(data)
  local EntityMod = require("entity.app_secret_entity")
  if data == nil then
    if self._app_secret == nil then
      self._app_secret = EntityMod.new(self, nil)
    end
    return self._app_secret
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppService():list() / client:AppService():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppService(data)
  local EntityMod = require("entity.app_service_entity")
  if data == nil then
    if self._app_service == nil then
      self._app_service = EntityMod.new(self, nil)
    end
    return self._app_service
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppServiceBinding():list() / client:AppServiceBinding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppServiceBinding(data)
  local EntityMod = require("entity.app_service_binding_entity")
  if data == nil then
    if self._app_service_binding == nil then
      self._app_service_binding = EntityMod.new(self, nil)
    end
    return self._app_service_binding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppServicePlacement():list() / client:AppServicePlacement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppServicePlacement(data)
  local EntityMod = require("entity.app_service_placement_entity")
  if data == nil then
    if self._app_service_placement == nil then
      self._app_service_placement = EntityMod.new(self, nil)
    end
    return self._app_service_placement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppStorageResource():list() / client:AppStorageResource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppStorageResource(data)
  local EntityMod = require("entity.app_storage_resource_entity")
  if data == nil then
    if self._app_storage_resource == nil then
      self._app_storage_resource = EntityMod.new(self, nil)
    end
    return self._app_storage_resource
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AttachmentPart():list() / client:AttachmentPart():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AttachmentPart(data)
  local EntityMod = require("entity.attachment_part_entity")
  if data == nil then
    if self._attachment_part == nil then
      self._attachment_part = EntityMod.new(self, nil)
    end
    return self._attachment_part
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AutomationEvent():list() / client:AutomationEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AutomationEvent(data)
  local EntityMod = require("entity.automation_event_entity")
  if data == nil then
    if self._automation_event == nil then
      self._automation_event = EntityMod.new(self, nil)
    end
    return self._automation_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AutomationRun():list() / client:AutomationRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AutomationRun(data)
  local EntityMod = require("entity.automation_run_entity")
  if data == nil then
    if self._automation_run == nil then
      self._automation_run = EntityMod.new(self, nil)
    end
    return self._automation_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Binary():list() / client:Binary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Binary(data)
  local EntityMod = require("entity.binary_entity")
  if data == nil then
    if self._binary == nil then
      self._binary = EntityMod.new(self, nil)
    end
    return self._binary
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BinaryVersion():list() / client:BinaryVersion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BinaryVersion(data)
  local EntityMod = require("entity.binary_version_entity")
  if data == nil then
    if self._binary_version == nil then
      self._binary_version = EntityMod.new(self, nil)
    end
    return self._binary_version
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserEgressCandidate():list() / client:BrowserEgressCandidate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserEgressCandidate(data)
  local EntityMod = require("entity.browser_egress_candidate_entity")
  if data == nil then
    if self._browser_egress_candidate == nil then
      self._browser_egress_candidate = EntityMod.new(self, nil)
    end
    return self._browser_egress_candidate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSession():list() / client:BrowserSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSession(data)
  local EntityMod = require("entity.browser_session_entity")
  if data == nil then
    if self._browser_session == nil then
      self._browser_session = EntityMod.new(self, nil)
    end
    return self._browser_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionConnection():list() / client:BrowserSessionConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionConnection(data)
  local EntityMod = require("entity.browser_session_connection_entity")
  if data == nil then
    if self._browser_session_connection == nil then
      self._browser_session_connection = EntityMod.new(self, nil)
    end
    return self._browser_session_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionControl():list() / client:BrowserSessionControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionControl(data)
  local EntityMod = require("entity.browser_session_control_entity")
  if data == nil then
    if self._browser_session_control == nil then
      self._browser_session_control = EntityMod.new(self, nil)
    end
    return self._browser_session_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionEvent():list() / client:BrowserSessionEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionEvent(data)
  local EntityMod = require("entity.browser_session_event_entity")
  if data == nil then
    if self._browser_session_event == nil then
      self._browser_session_event = EntityMod.new(self, nil)
    end
    return self._browser_session_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionMedia():list() / client:BrowserSessionMedia():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionMedia(data)
  local EntityMod = require("entity.browser_session_media_entity")
  if data == nil then
    if self._browser_session_media == nil then
      self._browser_session_media = EntityMod.new(self, nil)
    end
    return self._browser_session_media
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionRecording():list() / client:BrowserSessionRecording():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionRecording(data)
  local EntityMod = require("entity.browser_session_recording_entity")
  if data == nil then
    if self._browser_session_recording == nil then
      self._browser_session_recording = EntityMod.new(self, nil)
    end
    return self._browser_session_recording
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionScreenshot():list() / client:BrowserSessionScreenshot():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionScreenshot(data)
  local EntityMod = require("entity.browser_session_screenshot_entity")
  if data == nil then
    if self._browser_session_screenshot == nil then
      self._browser_session_screenshot = EntityMod.new(self, nil)
    end
    return self._browser_session_screenshot
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BrowserSessionTask():list() / client:BrowserSessionTask():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BrowserSessionTask(data)
  local EntityMod = require("entity.browser_session_task_entity")
  if data == nil then
    if self._browser_session_task == nil then
      self._browser_session_task = EntityMod.new(self, nil)
    end
    return self._browser_session_task
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CatalogSelector():list() / client:CatalogSelector():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CatalogSelector(data)
  local EntityMod = require("entity.catalog_selector_entity")
  if data == nil then
    if self._catalog_selector == nil then
      self._catalog_selector = EntityMod.new(self, nil)
    end
    return self._catalog_selector
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CdnDeployment():list() / client:CdnDeployment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CdnDeployment(data)
  local EntityMod = require("entity.cdn_deployment_entity")
  if data == nil then
    if self._cdn_deployment == nil then
      self._cdn_deployment = EntityMod.new(self, nil)
    end
    return self._cdn_deployment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CdnHostname():list() / client:CdnHostname():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CdnHostname(data)
  local EntityMod = require("entity.cdn_hostname_entity")
  if data == nil then
    if self._cdn_hostname == nil then
      self._cdn_hostname = EntityMod.new(self, nil)
    end
    return self._cdn_hostname
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CdnSpace():list() / client:CdnSpace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CdnSpace(data)
  local EntityMod = require("entity.cdn_space_entity")
  if data == nil then
    if self._cdn_space == nil then
      self._cdn_space = EntityMod.new(self, nil)
    end
    return self._cdn_space
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CdnSpaceObject():list() / client:CdnSpaceObject():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CdnSpaceObject(data)
  local EntityMod = require("entity.cdn_space_object_entity")
  if data == nil then
    if self._cdn_space_object == nil then
      self._cdn_space_object = EntityMod.new(self, nil)
    end
    return self._cdn_space_object
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConnectionRequest():list() / client:ConnectionRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ConnectionRequest(data)
  local EntityMod = require("entity.connection_request_entity")
  if data == nil then
    if self._connection_request == nil then
      self._connection_request = EntityMod.new(self, nil)
    end
    return self._connection_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConnectionSource():list() / client:ConnectionSource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ConnectionSource(data)
  local EntityMod = require("entity.connection_source_entity")
  if data == nil then
    if self._connection_source == nil then
      self._connection_source = EntityMod.new(self, nil)
    end
    return self._connection_source
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CoordinationWait():list() / client:CoordinationWait():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CoordinationWait(data)
  local EntityMod = require("entity.coordination_wait_entity")
  if data == nil then
    if self._coordination_wait == nil then
      self._coordination_wait = EntityMod.new(self, nil)
    end
    return self._coordination_wait
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CredentialSignInCheck():list() / client:CredentialSignInCheck():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CredentialSignInCheck(data)
  local EntityMod = require("entity.credential_sign_in_check_entity")
  if data == nil then
    if self._credential_sign_in_check == nil then
      self._credential_sign_in_check = EntityMod.new(self, nil)
    end
    return self._credential_sign_in_check
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DataResourceRotateCredential():list() / client:DataResourceRotateCredential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DataResourceRotateCredential(data)
  local EntityMod = require("entity.data_resource_rotate_credential_entity")
  if data == nil then
    if self._data_resource_rotate_credential == nil then
      self._data_resource_rotate_credential = EntityMod.new(self, nil)
    end
    return self._data_resource_rotate_credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeepScan():list() / client:DeepScan():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeepScan(data)
  local EntityMod = require("entity.deep_scan_entity")
  if data == nil then
    if self._deep_scan == nil then
      self._deep_scan = EntityMod.new(self, nil)
    end
    return self._deep_scan
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeepScanFinding():list() / client:DeepScanFinding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeepScanFinding(data)
  local EntityMod = require("entity.deep_scan_finding_entity")
  if data == nil then
    if self._deep_scan_finding == nil then
      self._deep_scan_finding = EntityMod.new(self, nil)
    end
    return self._deep_scan_finding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeepScanFlow():list() / client:DeepScanFlow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeepScanFlow(data)
  local EntityMod = require("entity.deep_scan_flow_entity")
  if data == nil then
    if self._deep_scan_flow == nil then
      self._deep_scan_flow = EntityMod.new(self, nil)
    end
    return self._deep_scan_flow
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeepScanMappedFlow():list() / client:DeepScanMappedFlow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeepScanMappedFlow(data)
  local EntityMod = require("entity.deep_scan_mapped_flow_entity")
  if data == nil then
    if self._deep_scan_mapped_flow == nil then
      self._deep_scan_mapped_flow = EntityMod.new(self, nil)
    end
    return self._deep_scan_mapped_flow
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeepScanOption():list() / client:DeepScanOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeepScanOption(data)
  local EntityMod = require("entity.deep_scan_option_entity")
  if data == nil then
    if self._deep_scan_option == nil then
      self._deep_scan_option = EntityMod.new(self, nil)
    end
    return self._deep_scan_option
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DemoShare():list() / client:DemoShare():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DemoShare(data)
  local EntityMod = require("entity.demo_share_entity")
  if data == nil then
    if self._demo_share == nil then
      self._demo_share = EntityMod.new(self, nil)
    end
    return self._demo_share
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DemoShareSegment():list() / client:DemoShareSegment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DemoShareSegment(data)
  local EntityMod = require("entity.demo_share_segment_entity")
  if data == nil then
    if self._demo_share_segment == nil then
      self._demo_share_segment = EntityMod.new(self, nil)
    end
    return self._demo_share_segment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeploymentDashboardNomad():list() / client:DeploymentDashboardNomad():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentDashboardNomad(data)
  local EntityMod = require("entity.deployment_dashboard_nomad_entity")
  if data == nil then
    if self._deployment_dashboard_nomad == nil then
      self._deployment_dashboard_nomad = EntityMod.new(self, nil)
    end
    return self._deployment_dashboard_nomad
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeploymentFile():list() / client:DeploymentFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentFile(data)
  local EntityMod = require("entity.deployment_file_entity")
  if data == nil then
    if self._deployment_file == nil then
      self._deployment_file = EntityMod.new(self, nil)
    end
    return self._deployment_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainPathRule():list() / client:DomainPathRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DomainPathRule(data)
  local EntityMod = require("entity.domain_path_rule_entity")
  if data == nil then
    if self._domain_path_rule == nil then
      self._domain_path_rule = EntityMod.new(self, nil)
    end
    return self._domain_path_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Dream():list() / client:Dream():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Dream(data)
  local EntityMod = require("entity.dream_entity")
  if data == nil then
    if self._dream == nil then
      self._dream = EntityMod.new(self, nil)
    end
    return self._dream
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Environment():list() / client:Environment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Environment(data)
  local EntityMod = require("entity.environment_entity")
  if data == nil then
    if self._environment == nil then
      self._environment = EntityMod.new(self, nil)
    end
    return self._environment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentDiscoveryRun():list() / client:EnvironmentDiscoveryRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentDiscoveryRun(data)
  local EntityMod = require("entity.environment_discovery_run_entity")
  if data == nil then
    if self._environment_discovery_run == nil then
      self._environment_discovery_run = EntityMod.new(self, nil)
    end
    return self._environment_discovery_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentExploration():list() / client:EnvironmentExploration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentExploration(data)
  local EntityMod = require("entity.environment_exploration_entity")
  if data == nil then
    if self._environment_exploration == nil then
      self._environment_exploration = EntityMod.new(self, nil)
    end
    return self._environment_exploration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentFirstRun():list() / client:EnvironmentFirstRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentFirstRun(data)
  local EntityMod = require("entity.environment_first_run_entity")
  if data == nil then
    if self._environment_first_run == nil then
      self._environment_first_run = EntityMod.new(self, nil)
    end
    return self._environment_first_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentRevision():list() / client:EnvironmentRevision():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentRevision(data)
  local EntityMod = require("entity.environment_revision_entity")
  if data == nil then
    if self._environment_revision == nil then
      self._environment_revision = EntityMod.new(self, nil)
    end
    return self._environment_revision
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentSecretBinding():list() / client:EnvironmentSecretBinding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentSecretBinding(data)
  local EntityMod = require("entity.environment_secret_binding_entity")
  if data == nil then
    if self._environment_secret_binding == nil then
      self._environment_secret_binding = EntityMod.new(self, nil)
    end
    return self._environment_secret_binding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EnvironmentTestAccount():list() / client:EnvironmentTestAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EnvironmentTestAccount(data)
  local EntityMod = require("entity.environment_test_account_entity")
  if data == nil then
    if self._environment_test_account == nil then
      self._environment_test_account = EntityMod.new(self, nil)
    end
    return self._environment_test_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Evidence():list() / client:Evidence():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Evidence(data)
  local EntityMod = require("entity.evidence_entity")
  if data == nil then
    if self._evidence == nil then
      self._evidence = EntityMod.new(self, nil)
    end
    return self._evidence
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Exploration():list() / client:Exploration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Exploration(data)
  local EntityMod = require("entity.exploration_entity")
  if data == nil then
    if self._exploration == nil then
      self._exploration = EntityMod.new(self, nil)
    end
    return self._exploration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExplorationMessage():list() / client:ExplorationMessage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExplorationMessage(data)
  local EntityMod = require("entity.exploration_message_entity")
  if data == nil then
    if self._exploration_message == nil then
      self._exploration_message = EntityMod.new(self, nil)
    end
    return self._exploration_message
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExplorationReport():list() / client:ExplorationReport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExplorationReport(data)
  local EntityMod = require("entity.exploration_report_entity")
  if data == nil then
    if self._exploration_report == nil then
      self._exploration_report = EntityMod.new(self, nil)
    end
    return self._exploration_report
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExplorationScenario():list() / client:ExplorationScenario():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExplorationScenario(data)
  local EntityMod = require("entity.exploration_scenario_entity")
  if data == nil then
    if self._exploration_scenario == nil then
      self._exploration_scenario = EntityMod.new(self, nil)
    end
    return self._exploration_scenario
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Finding():list() / client:Finding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Finding(data)
  local EntityMod = require("entity.finding_entity")
  if data == nil then
    if self._finding == nil then
      self._finding = EntityMod.new(self, nil)
    end
    return self._finding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubConnection():list() / client:GithubConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubConnection(data)
  local EntityMod = require("entity.github_connection_entity")
  if data == nil then
    if self._github_connection == nil then
      self._github_connection = EntityMod.new(self, nil)
    end
    return self._github_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HostingAppDomain():list() / client:HostingAppDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:HostingAppDomain(data)
  local EntityMod = require("entity.hosting_app_domain_entity")
  if data == nil then
    if self._hosting_app_domain == nil then
      self._hosting_app_domain = EntityMod.new(self, nil)
    end
    return self._hosting_app_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ImageRepository():list() / client:ImageRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ImageRepository(data)
  local EntityMod = require("entity.image_repository_entity")
  if data == nil then
    if self._image_repository == nil then
      self._image_repository = EntityMod.new(self, nil)
    end
    return self._image_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Integration():list() / client:Integration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Integration(data)
  local EntityMod = require("entity.integration_entity")
  if data == nil then
    if self._integration == nil then
      self._integration = EntityMod.new(self, nil)
    end
    return self._integration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InteractionResponse():list() / client:InteractionResponse():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:InteractionResponse(data)
  local EntityMod = require("entity.interaction_response_entity")
  if data == nil then
    if self._interaction_response == nil then
      self._interaction_response = EntityMod.new(self, nil)
    end
    return self._interaction_response
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Invitation():list() / client:Invitation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Invitation(data)
  local EntityMod = require("entity.invitation_entity")
  if data == nil then
    if self._invitation == nil then
      self._invitation = EntityMod.new(self, nil)
    end
    return self._invitation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:JourneyVariantReplay():list() / client:JourneyVariantReplay():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:JourneyVariantReplay(data)
  local EntityMod = require("entity.journey_variant_replay_entity")
  if data == nil then
    if self._journey_variant_replay == nil then
      self._journey_variant_replay = EntityMod.new(self, nil)
    end
    return self._journey_variant_replay
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Knowledge():list() / client:Knowledge():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Knowledge(data)
  local EntityMod = require("entity.knowledge_entity")
  if data == nil then
    if self._knowledge == nil then
      self._knowledge = EntityMod.new(self, nil)
    end
    return self._knowledge
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LocalThreadDelivery():list() / client:LocalThreadDelivery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LocalThreadDelivery(data)
  local EntityMod = require("entity.local_thread_delivery_entity")
  if data == nil then
    if self._local_thread_delivery == nil then
      self._local_thread_delivery = EntityMod.new(self, nil)
    end
    return self._local_thread_delivery
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LocalThreadOperation():list() / client:LocalThreadOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LocalThreadOperation(data)
  local EntityMod = require("entity.local_thread_operation_entity")
  if data == nil then
    if self._local_thread_operation == nil then
      self._local_thread_operation = EntityMod.new(self, nil)
    end
    return self._local_thread_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Location():list() / client:Location():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Location(data)
  local EntityMod = require("entity.location_entity")
  if data == nil then
    if self._location == nil then
      self._location = EntityMod.new(self, nil)
    end
    return self._location
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Me():list() / client:Me():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Me(data)
  local EntityMod = require("entity.me_entity")
  if data == nil then
    if self._me == nil then
      self._me = EntityMod.new(self, nil)
    end
    return self._me
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MeEmail():list() / client:MeEmail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MeEmail(data)
  local EntityMod = require("entity.me_email_entity")
  if data == nil then
    if self._me_email == nil then
      self._me_email = EntityMod.new(self, nil)
    end
    return self._me_email
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MeOnboarding():list() / client:MeOnboarding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MeOnboarding(data)
  local EntityMod = require("entity.me_onboarding_entity")
  if data == nil then
    if self._me_onboarding == nil then
      self._me_onboarding = EntityMod.new(self, nil)
    end
    return self._me_onboarding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MediaFile():list() / client:MediaFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MediaFile(data)
  local EntityMod = require("entity.media_file_entity")
  if data == nil then
    if self._media_file == nil then
      self._media_file = EntityMod.new(self, nil)
    end
    return self._media_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Member():list() / client:Member():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Member(data)
  local EntityMod = require("entity.member_entity")
  if data == nil then
    if self._member == nil then
      self._member = EntityMod.new(self, nil)
    end
    return self._member
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Memory():list() / client:Memory():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Memory(data)
  local EntityMod = require("entity.memory_entity")
  if data == nil then
    if self._memory == nil then
      self._memory = EntityMod.new(self, nil)
    end
    return self._memory
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MergeRequest():list() / client:MergeRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MergeRequest(data)
  local EntityMod = require("entity.merge_request_entity")
  if data == nil then
    if self._merge_request == nil then
      self._merge_request = EntityMod.new(self, nil)
    end
    return self._merge_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MessagingConversationMessage():list() / client:MessagingConversationMessage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MessagingConversationMessage(data)
  local EntityMod = require("entity.messaging_conversation_message_entity")
  if data == nil then
    if self._messaging_conversation_message == nil then
      self._messaging_conversation_message = EntityMod.new(self, nil)
    end
    return self._messaging_conversation_message
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MessagingConversationUpload():list() / client:MessagingConversationUpload():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MessagingConversationUpload(data)
  local EntityMod = require("entity.messaging_conversation_upload_entity")
  if data == nil then
    if self._messaging_conversation_upload == nil then
      self._messaging_conversation_upload = EntityMod.new(self, nil)
    end
    return self._messaging_conversation_upload
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MetricQuery():list() / client:MetricQuery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MetricQuery(data)
  local EntityMod = require("entity.metric_query_entity")
  if data == nil then
    if self._metric_query == nil then
      self._metric_query = EntityMod.new(self, nil)
    end
    return self._metric_query
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NetworkConnection():list() / client:NetworkConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NetworkConnection(data)
  local EntityMod = require("entity.network_connection_entity")
  if data == nil then
    if self._network_connection == nil then
      self._network_connection = EntityMod.new(self, nil)
    end
    return self._network_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NomadAllocation():list() / client:NomadAllocation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NomadAllocation(data)
  local EntityMod = require("entity.nomad_allocation_entity")
  if data == nil then
    if self._nomad_allocation == nil then
      self._nomad_allocation = EntityMod.new(self, nil)
    end
    return self._nomad_allocation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NomadLog():list() / client:NomadLog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NomadLog(data)
  local EntityMod = require("entity.nomad_log_entity")
  if data == nil then
    if self._nomad_log == nil then
      self._nomad_log = EntityMod.new(self, nil)
    end
    return self._nomad_log
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Organization():list() / client:Organization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Organization(data)
  local EntityMod = require("entity.organization_entity")
  if data == nil then
    if self._organization == nil then
      self._organization = EntityMod.new(self, nil)
    end
    return self._organization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Page():list() / client:Page():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Page(data)
  local EntityMod = require("entity.page_entity")
  if data == nil then
    if self._page == nil then
      self._page = EntityMod.new(self, nil)
    end
    return self._page
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PageAgent():list() / client:PageAgent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PageAgent(data)
  local EntityMod = require("entity.page_agent_entity")
  if data == nil then
    if self._page_agent == nil then
      self._page_agent = EntityMod.new(self, nil)
    end
    return self._page_agent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PageProjectRun():list() / client:PageProjectRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PageProjectRun(data)
  local EntityMod = require("entity.page_project_run_entity")
  if data == nil then
    if self._page_project_run == nil then
      self._page_project_run = EntityMod.new(self, nil)
    end
    return self._page_project_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesProjectCredential():list() / client:PagesProjectCredential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesProjectCredential(data)
  local EntityMod = require("entity.pages_project_credential_entity")
  if data == nil then
    if self._pages_project_credential == nil then
      self._pages_project_credential = EntityMod.new(self, nil)
    end
    return self._pages_project_credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesProjectPersona():list() / client:PagesProjectPersona():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesProjectPersona(data)
  local EntityMod = require("entity.pages_project_persona_entity")
  if data == nil then
    if self._pages_project_persona == nil then
      self._pages_project_persona = EntityMod.new(self, nil)
    end
    return self._pages_project_persona
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesProjectRun():list() / client:PagesProjectRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesProjectRun(data)
  local EntityMod = require("entity.pages_project_run_entity")
  if data == nil then
    if self._pages_project_run == nil then
      self._pages_project_run = EntityMod.new(self, nil)
    end
    return self._pages_project_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesProjectScenario():list() / client:PagesProjectScenario():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesProjectScenario(data)
  local EntityMod = require("entity.pages_project_scenario_entity")
  if data == nil then
    if self._pages_project_scenario == nil then
      self._pages_project_scenario = EntityMod.new(self, nil)
    end
    return self._pages_project_scenario
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PersonalAccessToken():list() / client:PersonalAccessToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PersonalAccessToken(data)
  local EntityMod = require("entity.personal_access_token_entity")
  if data == nil then
    if self._personal_access_token == nil then
      self._personal_access_token = EntityMod.new(self, nil)
    end
    return self._personal_access_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PreviewOperation():list() / client:PreviewOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PreviewOperation(data)
  local EntityMod = require("entity.preview_operation_entity")
  if data == nil then
    if self._preview_operation == nil then
      self._preview_operation = EntityMod.new(self, nil)
    end
    return self._preview_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PreviewProfileSecretBinding():list() / client:PreviewProfileSecretBinding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PreviewProfileSecretBinding(data)
  local EntityMod = require("entity.preview_profile_secret_binding_entity")
  if data == nil then
    if self._preview_profile_secret_binding == nil then
      self._preview_profile_secret_binding = EntityMod.new(self, nil)
    end
    return self._preview_profile_secret_binding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PreviewSecret():list() / client:PreviewSecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PreviewSecret(data)
  local EntityMod = require("entity.preview_secret_entity")
  if data == nil then
    if self._preview_secret == nil then
      self._preview_secret = EntityMod.new(self, nil)
    end
    return self._preview_secret
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PreviewSharingApproval():list() / client:PreviewSharingApproval():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PreviewSharingApproval(data)
  local EntityMod = require("entity.preview_sharing_approval_entity")
  if data == nil then
    if self._preview_sharing_approval == nil then
      self._preview_sharing_approval = EntityMod.new(self, nil)
    end
    return self._preview_sharing_approval
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapIdentityDecision():list() / client:ProductMapIdentityDecision():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapIdentityDecision(data)
  local EntityMod = require("entity.product_map_identity_decision_entity")
  if data == nil then
    if self._product_map_identity_decision == nil then
      self._product_map_identity_decision = EntityMod.new(self, nil)
    end
    return self._product_map_identity_decision
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapJourney():list() / client:ProductMapJourney():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapJourney(data)
  local EntityMod = require("entity.product_map_journey_entity")
  if data == nil then
    if self._product_map_journey == nil then
      self._product_map_journey = EntityMod.new(self, nil)
    end
    return self._product_map_journey
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapJourneyReplay():list() / client:ProductMapJourneyReplay():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapJourneyReplay(data)
  local EntityMod = require("entity.product_map_journey_replay_entity")
  if data == nil then
    if self._product_map_journey_replay == nil then
      self._product_map_journey_replay = EntityMod.new(self, nil)
    end
    return self._product_map_journey_replay
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapObservation():list() / client:ProductMapObservation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapObservation(data)
  local EntityMod = require("entity.product_map_observation_entity")
  if data == nil then
    if self._product_map_observation == nil then
      self._product_map_observation = EntityMod.new(self, nil)
    end
    return self._product_map_observation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapQuestion():list() / client:ProductMapQuestion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapQuestion(data)
  local EntityMod = require("entity.product_map_question_entity")
  if data == nil then
    if self._product_map_question == nil then
      self._product_map_question = EntityMod.new(self, nil)
    end
    return self._product_map_question
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProductMapState():list() / client:ProductMapState():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProductMapState(data)
  local EntityMod = require("entity.product_map_state_entity")
  if data == nil then
    if self._product_map_state == nil then
      self._product_map_state = EntityMod.new(self, nil)
    end
    return self._product_map_state
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Project():list() / client:Project():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Project(data)
  local EntityMod = require("entity.project_entity")
  if data == nil then
    if self._project == nil then
      self._project = EntityMod.new(self, nil)
    end
    return self._project
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectAndroidApk():list() / client:ProjectAndroidApk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectAndroidApk(data)
  local EntityMod = require("entity.project_android_apk_entity")
  if data == nil then
    if self._project_android_apk == nil then
      self._project_android_apk = EntityMod.new(self, nil)
    end
    return self._project_android_apk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectCodeMap():list() / client:ProjectCodeMap():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectCodeMap(data)
  local EntityMod = require("entity.project_code_map_entity")
  if data == nil then
    if self._project_code_map == nil then
      self._project_code_map = EntityMod.new(self, nil)
    end
    return self._project_code_map
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectEnvironment():list() / client:ProjectEnvironment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectEnvironment(data)
  local EntityMod = require("entity.project_environment_entity")
  if data == nil then
    if self._project_environment == nil then
      self._project_environment = EntityMod.new(self, nil)
    end
    return self._project_environment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectFinding():list() / client:ProjectFinding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectFinding(data)
  local EntityMod = require("entity.project_finding_entity")
  if data == nil then
    if self._project_finding == nil then
      self._project_finding = EntityMod.new(self, nil)
    end
    return self._project_finding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectFixture():list() / client:ProjectFixture():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectFixture(data)
  local EntityMod = require("entity.project_fixture_entity")
  if data == nil then
    if self._project_fixture == nil then
      self._project_fixture = EntityMod.new(self, nil)
    end
    return self._project_fixture
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectIosApp():list() / client:ProjectIosApp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectIosApp(data)
  local EntityMod = require("entity.project_ios_app_entity")
  if data == nil then
    if self._project_ios_app == nil then
      self._project_ios_app = EntityMod.new(self, nil)
    end
    return self._project_ios_app
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectMessagingConversation():list() / client:ProjectMessagingConversation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectMessagingConversation(data)
  local EntityMod = require("entity.project_messaging_conversation_entity")
  if data == nil then
    if self._project_messaging_conversation == nil then
      self._project_messaging_conversation = EntityMod.new(self, nil)
    end
    return self._project_messaging_conversation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectOverviewMetric():list() / client:ProjectOverviewMetric():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectOverviewMetric(data)
  local EntityMod = require("entity.project_overview_metric_entity")
  if data == nil then
    if self._project_overview_metric == nil then
      self._project_overview_metric = EntityMod.new(self, nil)
    end
    return self._project_overview_metric
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectOverviewPullRequest():list() / client:ProjectOverviewPullRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectOverviewPullRequest(data)
  local EntityMod = require("entity.project_overview_pull_request_entity")
  if data == nil then
    if self._project_overview_pull_request == nil then
      self._project_overview_pull_request = EntityMod.new(self, nil)
    end
    return self._project_overview_pull_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectProductMap():list() / client:ProjectProductMap():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectProductMap(data)
  local EntityMod = require("entity.project_product_map_entity")
  if data == nil then
    if self._project_product_map == nil then
      self._project_product_map = EntityMod.new(self, nil)
    end
    return self._project_product_map
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectRecording():list() / client:ProjectRecording():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectRecording(data)
  local EntityMod = require("entity.project_recording_entity")
  if data == nil then
    if self._project_recording == nil then
      self._project_recording = EntityMod.new(self, nil)
    end
    return self._project_recording
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectRunPlan():list() / client:ProjectRunPlan():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectRunPlan(data)
  local EntityMod = require("entity.project_run_plan_entity")
  if data == nil then
    if self._project_run_plan == nil then
      self._project_run_plan = EntityMod.new(self, nil)
    end
    return self._project_run_plan
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectRunSchedule():list() / client:ProjectRunSchedule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectRunSchedule(data)
  local EntityMod = require("entity.project_run_schedule_entity")
  if data == nil then
    if self._project_run_schedule == nil then
      self._project_run_schedule = EntityMod.new(self, nil)
    end
    return self._project_run_schedule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectScenarioOption():list() / client:ProjectScenarioOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectScenarioOption(data)
  local EntityMod = require("entity.project_scenario_option_entity")
  if data == nil then
    if self._project_scenario_option == nil then
      self._project_scenario_option = EntityMod.new(self, nil)
    end
    return self._project_scenario_option
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectScenarioRow():list() / client:ProjectScenarioRow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectScenarioRow(data)
  local EntityMod = require("entity.project_scenario_row_entity")
  if data == nil then
    if self._project_scenario_row == nil then
      self._project_scenario_row = EntityMod.new(self, nil)
    end
    return self._project_scenario_row
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ProjectSetting():list() / client:ProjectSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProjectSetting(data)
  local EntityMod = require("entity.project_setting_entity")
  if data == nil then
    if self._project_setting == nil then
      self._project_setting = EntityMod.new(self, nil)
    end
    return self._project_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullRequest():list() / client:PullRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequest(data)
  local EntityMod = require("entity.pull_request_entity")
  if data == nil then
    if self._pull_request == nil then
      self._pull_request = EntityMod.new(self, nil)
    end
    return self._pull_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullRequestSetting():list() / client:PullRequestSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestSetting(data)
  local EntityMod = require("entity.pull_request_setting_entity")
  if data == nil then
    if self._pull_request_setting == nil then
      self._pull_request_setting = EntityMod.new(self, nil)
    end
    return self._pull_request_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullRequestSettingAddRepository():list() / client:PullRequestSettingAddRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestSettingAddRepository(data)
  local EntityMod = require("entity.pull_request_setting_add_repository_entity")
  if data == nil then
    if self._pull_request_setting_add_repository == nil then
      self._pull_request_setting_add_repository = EntityMod.new(self, nil)
    end
    return self._pull_request_setting_add_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullRequestSettingDetectComment():list() / client:PullRequestSettingDetectComment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestSettingDetectComment(data)
  local EntityMod = require("entity.pull_request_setting_detect_comment_entity")
  if data == nil then
    if self._pull_request_setting_detect_comment == nil then
      self._pull_request_setting_detect_comment = EntityMod.new(self, nil)
    end
    return self._pull_request_setting_detect_comment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Recorder():list() / client:Recorder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Recorder(data)
  local EntityMod = require("entity.recorder_entity")
  if data == nil then
    if self._recorder == nil then
      self._recorder = EntityMod.new(self, nil)
    end
    return self._recorder
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Registry():list() / client:Registry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Registry(data)
  local EntityMod = require("entity.registry_entity")
  if data == nil then
    if self._registry == nil then
      self._registry = EntityMod.new(self, nil)
    end
    return self._registry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RegistryV2():list() / client:RegistryV2():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RegistryV2(data)
  local EntityMod = require("entity.registry_v2_entity")
  if data == nil then
    if self._registry_v2 == nil then
      self._registry_v2 = EntityMod.new(self, nil)
    end
    return self._registry_v2
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RelayAgentLocalThread():list() / client:RelayAgentLocalThread():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RelayAgentLocalThread(data)
  local EntityMod = require("entity.relay_agent_local_thread_entity")
  if data == nil then
    if self._relay_agent_local_thread == nil then
      self._relay_agent_local_thread = EntityMod.new(self, nil)
    end
    return self._relay_agent_local_thread
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReportReplay():list() / client:ReportReplay():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ReportReplay(data)
  local EntityMod = require("entity.report_replay_entity")
  if data == nil then
    if self._report_replay == nil then
      self._report_replay = EntityMod.new(self, nil)
    end
    return self._report_replay
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReportScenario():list() / client:ReportScenario():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ReportScenario(data)
  local EntityMod = require("entity.report_scenario_entity")
  if data == nil then
    if self._report_scenario == nil then
      self._report_scenario = EntityMod.new(self, nil)
    end
    return self._report_scenario
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunScenarioRun():list() / client:RunScenarioRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunScenarioRun(data)
  local EntityMod = require("entity.run_scenario_run_entity")
  if data == nil then
    if self._run_scenario_run == nil then
      self._run_scenario_run = EntityMod.new(self, nil)
    end
    return self._run_scenario_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunScheduleOption():list() / client:RunScheduleOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunScheduleOption(data)
  local EntityMod = require("entity.run_schedule_option_entity")
  if data == nil then
    if self._run_schedule_option == nil then
      self._run_schedule_option = EntityMod.new(self, nil)
    end
    return self._run_schedule_option
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunSearch():list() / client:RunSearch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunSearch(data)
  local EntityMod = require("entity.run_search_entity")
  if data == nil then
    if self._run_search == nil then
      self._run_search = EntityMod.new(self, nil)
    end
    return self._run_search
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunUpdate():list() / client:RunUpdate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunUpdate(data)
  local EntityMod = require("entity.run_update_entity")
  if data == nil then
    if self._run_update == nil then
      self._run_update = EntityMod.new(self, nil)
    end
    return self._run_update
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScenarioRevision():list() / client:ScenarioRevision():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ScenarioRevision(data)
  local EntityMod = require("entity.scenario_revision_entity")
  if data == nil then
    if self._scenario_revision == nil then
      self._scenario_revision = EntityMod.new(self, nil)
    end
    return self._scenario_revision
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScenarioRunLesson():list() / client:ScenarioRunLesson():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ScenarioRunLesson(data)
  local EntityMod = require("entity.scenario_run_lesson_entity")
  if data == nil then
    if self._scenario_run_lesson == nil then
      self._scenario_run_lesson = EntityMod.new(self, nil)
    end
    return self._scenario_run_lesson
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScenarioRunScenarioEdit():list() / client:ScenarioRunScenarioEdit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ScenarioRunScenarioEdit(data)
  local EntityMod = require("entity.scenario_run_scenario_edit_entity")
  if data == nil then
    if self._scenario_run_scenario_edit == nil then
      self._scenario_run_scenario_edit = EntityMod.new(self, nil)
    end
    return self._scenario_run_scenario_edit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ServiceEndpoint():list() / client:ServiceEndpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ServiceEndpoint(data)
  local EntityMod = require("entity.service_endpoint_entity")
  if data == nil then
    if self._service_endpoint == nil then
      self._service_endpoint = EntityMod.new(self, nil)
    end
    return self._service_endpoint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SitePreview():list() / client:SitePreview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SitePreview(data)
  local EntityMod = require("entity.site_preview_entity")
  if data == nil then
    if self._site_preview == nil then
      self._site_preview = EntityMod.new(self, nil)
    end
    return self._site_preview
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SlackChannel():list() / client:SlackChannel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SlackChannel(data)
  local EntityMod = require("entity.slack_channel_entity")
  if data == nil then
    if self._slack_channel == nil then
      self._slack_channel = EntityMod.new(self, nil)
    end
    return self._slack_channel
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkAgentLocalThread():list() / client:SparkAgentLocalThread():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkAgentLocalThread(data)
  local EntityMod = require("entity.spark_agent_local_thread_entity")
  if data == nil then
    if self._spark_agent_local_thread == nil then
      self._spark_agent_local_thread = EntityMod.new(self, nil)
    end
    return self._spark_agent_local_thread
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StaticSite():list() / client:StaticSite():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StaticSite(data)
  local EntityMod = require("entity.static_site_entity")
  if data == nil then
    if self._static_site == nil then
      self._static_site = EntityMod.new(self, nil)
    end
    return self._static_site
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StaticSiteDeployment():list() / client:StaticSiteDeployment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StaticSiteDeployment(data)
  local EntityMod = require("entity.static_site_deployment_entity")
  if data == nil then
    if self._static_site_deployment == nil then
      self._static_site_deployment = EntityMod.new(self, nil)
    end
    return self._static_site_deployment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StaticSiteDomain():list() / client:StaticSiteDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StaticSiteDomain(data)
  local EntityMod = require("entity.static_site_domain_entity")
  if data == nil then
    if self._static_site_domain == nil then
      self._static_site_domain = EntityMod.new(self, nil)
    end
    return self._static_site_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SubscriptionModel():list() / client:SubscriptionModel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SubscriptionModel(data)
  local EntityMod = require("entity.subscription_model_entity")
  if data == nil then
    if self._subscription_model == nil then
      self._subscription_model = EntityMod.new(self, nil)
    end
    return self._subscription_model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ThreadPreview():list() / client:ThreadPreview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ThreadPreview(data)
  local EntityMod = require("entity.thread_preview_entity")
  if data == nil then
    if self._thread_preview == nil then
      self._thread_preview = EntityMod.new(self, nil)
    end
    return self._thread_preview
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerificationProjectCredential():list() / client:VerificationProjectCredential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerificationProjectCredential(data)
  local EntityMod = require("entity.verification_project_credential_entity")
  if data == nil then
    if self._verification_project_credential == nil then
      self._verification_project_credential = EntityMod.new(self, nil)
    end
    return self._verification_project_credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerificationProjectPersona():list() / client:VerificationProjectPersona():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerificationProjectPersona(data)
  local EntityMod = require("entity.verification_project_persona_entity")
  if data == nil then
    if self._verification_project_persona == nil then
      self._verification_project_persona = EntityMod.new(self, nil)
    end
    return self._verification_project_persona
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerificationProjectRun():list() / client:VerificationProjectRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerificationProjectRun(data)
  local EntityMod = require("entity.verification_project_run_entity")
  if data == nil then
    if self._verification_project_run == nil then
      self._verification_project_run = EntityMod.new(self, nil)
    end
    return self._verification_project_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerificationProjectScenario():list() / client:VerificationProjectScenario():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerificationProjectScenario(data)
  local EntityMod = require("entity.verification_project_scenario_entity")
  if data == nil then
    if self._verification_project_scenario == nil then
      self._verification_project_scenario = EntityMod.new(self, nil)
    end
    return self._verification_project_scenario
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerifyAppDomain():list() / client:VerifyAppDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerifyAppDomain(data)
  local EntityMod = require("entity.verify_app_domain_entity")
  if data == nil then
    if self._verify_app_domain == nil then
      self._verify_app_domain = EntityMod.new(self, nil)
    end
    return self._verify_app_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerifyBrowserSession():list() / client:VerifyBrowserSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerifyBrowserSession(data)
  local EntityMod = require("entity.verify_browser_session_entity")
  if data == nil then
    if self._verify_browser_session == nil then
      self._verify_browser_session = EntityMod.new(self, nil)
    end
    return self._verify_browser_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerifyStaticSiteDomain():list() / client:VerifyStaticSiteDomain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerifyStaticSiteDomain(data)
  local EntityMod = require("entity.verify_static_site_domain_entity")
  if data == nil then
    if self._verify_static_site_domain == nil then
      self._verify_static_site_domain = EntityMod.new(self, nil)
    end
    return self._verify_static_site_domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VersionLog():list() / client:VersionLog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VersionLog(data)
  local EntityMod = require("entity.version_log_entity")
  if data == nil then
    if self._version_log == nil then
      self._version_log = EntityMod.new(self, nil)
    end
    return self._version_log
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebBotAuth():list() / client:WebBotAuth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WebBotAuth(data)
  local EntityMod = require("entity.web_bot_auth_entity")
  if data == nil then
    if self._web_bot_auth == nil then
      self._web_bot_auth = EntityMod.new(self, nil)
    end
    return self._web_bot_auth
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkflowRunStep():list() / client:WorkflowRunStep():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkflowRunStep(data)
  local EntityMod = require("entity.workflow_run_step_entity")
  if data == nil then
    if self._workflow_run_step == nil then
      self._workflow_run_step = EntityMod.new(self, nil)
    end
    return self._workflow_run_step
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkflowRunStopNotice():list() / client:WorkflowRunStopNotice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkflowRunStopNotice(data)
  local EntityMod = require("entity.workflow_run_stop_notice_entity")
  if data == nil then
    if self._workflow_run_stop_notice == nil then
      self._workflow_run_stop_notice = EntityMod.new(self, nil)
    end
    return self._workflow_run_stop_notice
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkflowTriggerSkipped():list() / client:WorkflowTriggerSkipped():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkflowTriggerSkipped(data)
  local EntityMod = require("entity.workflow_trigger_skipped_entity")
  if data == nil then
    if self._workflow_trigger_skipped == nil then
      self._workflow_trigger_skipped = EntityMod.new(self, nil)
    end
    return self._workflow_trigger_skipped
  end
  return EntityMod.new(self, data)
end




function ComposalSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ComposalSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ComposalSDK
