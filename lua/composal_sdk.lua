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



-- Idiomatic facade: client:A2aWellKnown():list() / client:A2aWellKnown():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:A2aWellKnown(data)
  local EntityMod = require("entity.a2a_well_known_entity")
  if data == nil then
    if self._a2a_well_known == nil then
      self._a2a_well_known = EntityMod.new(self, nil)
    end
    return self._a2a_well_known
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AdminOrg():list() / client:AdminOrg():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AdminOrg(data)
  local EntityMod = require("entity.admin_org_entity")
  if data == nil then
    if self._admin_org == nil then
      self._admin_org = EntityMod.new(self, nil)
    end
    return self._admin_org
  end
  return EntityMod.new(self, data)
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


-- Idiomatic facade: client:AgentApp():list() / client:AgentApp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentApp(data)
  local EntityMod = require("entity.agent_app_entity")
  if data == nil then
    if self._agent_app == nil then
      self._agent_app = EntityMod.new(self, nil)
    end
    return self._agent_app
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentAppInstall():list() / client:AgentAppInstall():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentAppInstall(data)
  local EntityMod = require("entity.agent_app_install_entity")
  if data == nil then
    if self._agent_app_install == nil then
      self._agent_app_install = EntityMod.new(self, nil)
    end
    return self._agent_app_install
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


-- Idiomatic facade: client:AgentConnectionDelegation():list() / client:AgentConnectionDelegation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnectionDelegation(data)
  local EntityMod = require("entity.agent_connection_delegation_entity")
  if data == nil then
    if self._agent_connection_delegation == nil then
      self._agent_connection_delegation = EntityMod.new(self, nil)
    end
    return self._agent_connection_delegation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentConnectionGrant():list() / client:AgentConnectionGrant():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnectionGrant(data)
  local EntityMod = require("entity.agent_connection_grant_entity")
  if data == nil then
    if self._agent_connection_grant == nil then
      self._agent_connection_grant = EntityMod.new(self, nil)
    end
    return self._agent_connection_grant
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentConnectionResource():list() / client:AgentConnectionResource():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnectionResource(data)
  local EntityMod = require("entity.agent_connection_resource_entity")
  if data == nil then
    if self._agent_connection_resource == nil then
      self._agent_connection_resource = EntityMod.new(self, nil)
    end
    return self._agent_connection_resource
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentConnectionSafetyControl():list() / client:AgentConnectionSafetyControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnectionSafetyControl(data)
  local EntityMod = require("entity.agent_connection_safety_control_entity")
  if data == nil then
    if self._agent_connection_safety_control == nil then
      self._agent_connection_safety_control = EntityMod.new(self, nil)
    end
    return self._agent_connection_safety_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentConnectionTriggerSubscription():list() / client:AgentConnectionTriggerSubscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentConnectionTriggerSubscription(data)
  local EntityMod = require("entity.agent_connection_trigger_subscription_entity")
  if data == nil then
    if self._agent_connection_trigger_subscription == nil then
      self._agent_connection_trigger_subscription = EntityMod.new(self, nil)
    end
    return self._agent_connection_trigger_subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentContextCheckpoint():list() / client:AgentContextCheckpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentContextCheckpoint(data)
  local EntityMod = require("entity.agent_context_checkpoint_entity")
  if data == nil then
    if self._agent_context_checkpoint == nil then
      self._agent_context_checkpoint = EntityMod.new(self, nil)
    end
    return self._agent_context_checkpoint
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


-- Idiomatic facade: client:AgentEvent():list() / client:AgentEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentEvent(data)
  local EntityMod = require("entity.agent_event_entity")
  if data == nil then
    if self._agent_event == nil then
      self._agent_event = EntityMod.new(self, nil)
    end
    return self._agent_event
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


-- Idiomatic facade: client:AgentIntegrationAccount():list() / client:AgentIntegrationAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentIntegrationAccount(data)
  local EntityMod = require("entity.agent_integration_account_entity")
  if data == nil then
    if self._agent_integration_account == nil then
      self._agent_integration_account = EntityMod.new(self, nil)
    end
    return self._agent_integration_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentIntegrationCallback():list() / client:AgentIntegrationCallback():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentIntegrationCallback(data)
  local EntityMod = require("entity.agent_integration_callback_entity")
  if data == nil then
    if self._agent_integration_callback == nil then
      self._agent_integration_callback = EntityMod.new(self, nil)
    end
    return self._agent_integration_callback
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


-- Idiomatic facade: client:AgentRelayFileGrant():list() / client:AgentRelayFileGrant():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRelayFileGrant(data)
  local EntityMod = require("entity.agent_relay_file_grant_entity")
  if data == nil then
    if self._agent_relay_file_grant == nil then
      self._agent_relay_file_grant = EntityMod.new(self, nil)
    end
    return self._agent_relay_file_grant
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentRelayFileGrantAccount():list() / client:AgentRelayFileGrantAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRelayFileGrantAccount(data)
  local EntityMod = require("entity.agent_relay_file_grant_account_entity")
  if data == nil then
    if self._agent_relay_file_grant_account == nil then
      self._agent_relay_file_grant_account = EntityMod.new(self, nil)
    end
    return self._agent_relay_file_grant_account
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


-- Idiomatic facade: client:AgentRoder():list() / client:AgentRoder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentRoder(data)
  local EntityMod = require("entity.agent_roder_entity")
  if data == nil then
    if self._agent_roder == nil then
      self._agent_roder = EntityMod.new(self, nil)
    end
    return self._agent_roder
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


-- Idiomatic facade: client:AgentSession():list() / client:AgentSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSession(data)
  local EntityMod = require("entity.agent_session_entity")
  if data == nil then
    if self._agent_session == nil then
      self._agent_session = EntityMod.new(self, nil)
    end
    return self._agent_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSessionCheckpoint():list() / client:AgentSessionCheckpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSessionCheckpoint(data)
  local EntityMod = require("entity.agent_session_checkpoint_entity")
  if data == nil then
    if self._agent_session_checkpoint == nil then
      self._agent_session_checkpoint = EntityMod.new(self, nil)
    end
    return self._agent_session_checkpoint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgentSessionRoderHandoff():list() / client:AgentSessionRoderHandoff():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSessionRoderHandoff(data)
  local EntityMod = require("entity.agent_session_roder_handoff_entity")
  if data == nil then
    if self._agent_session_roder_handoff == nil then
      self._agent_session_roder_handoff = EntityMod.new(self, nil)
    end
    return self._agent_session_roder_handoff
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


-- Idiomatic facade: client:AgentSwarm():list() / client:AgentSwarm():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentSwarm(data)
  local EntityMod = require("entity.agent_swarm_entity")
  if data == nil then
    if self._agent_swarm == nil then
      self._agent_swarm = EntityMod.new(self, nil)
    end
    return self._agent_swarm
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


-- Idiomatic facade: client:AgentUsage():list() / client:AgentUsage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentUsage(data)
  local EntityMod = require("entity.agent_usage_entity")
  if data == nil then
    if self._agent_usage == nil then
      self._agent_usage = EntityMod.new(self, nil)
    end
    return self._agent_usage
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


-- Idiomatic facade: client:AgentWebPreview():list() / client:AgentWebPreview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgentWebPreview(data)
  local EntityMod = require("entity.agent_web_preview_entity")
  if data == nil then
    if self._agent_web_preview == nil then
      self._agent_web_preview = EntityMod.new(self, nil)
    end
    return self._agent_web_preview
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


-- Idiomatic facade: client:Agreement():list() / client:Agreement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Agreement(data)
  local EntityMod = require("entity.agreement_entity")
  if data == nil then
    if self._agreement == nil then
      self._agreement = EntityMod.new(self, nil)
    end
    return self._agreement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AgreementAccessRequest():list() / client:AgreementAccessRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AgreementAccessRequest(data)
  local EntityMod = require("entity.agreement_access_request_entity")
  if data == nil then
    if self._agreement_access_request == nil then
      self._agreement_access_request = EntityMod.new(self, nil)
    end
    return self._agreement_access_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AlertRuleEvent():list() / client:AlertRuleEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AlertRuleEvent(data)
  local EntityMod = require("entity.alert_rule_event_entity")
  if data == nil then
    if self._alert_rule_event == nil then
      self._alert_rule_event = EntityMod.new(self, nil)
    end
    return self._alert_rule_event
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


-- Idiomatic facade: client:AppAccess():list() / client:AppAccess():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppAccess(data)
  local EntityMod = require("entity.app_access_entity")
  if data == nil then
    if self._app_access == nil then
      self._app_access = EntityMod.new(self, nil)
    end
    return self._app_access
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AppAccessJwk():list() / client:AppAccessJwk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AppAccessJwk(data)
  local EntityMod = require("entity.app_access_jwk_entity")
  if data == nil then
    if self._app_access_jwk == nil then
      self._app_access_jwk = EntityMod.new(self, nil)
    end
    return self._app_access_jwk
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


-- Idiomatic facade: client:Artefact():list() / client:Artefact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Artefact(data)
  local EntityMod = require("entity.artefact_entity")
  if data == nil then
    if self._artefact == nil then
      self._artefact = EntityMod.new(self, nil)
    end
    return self._artefact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtefactCommentThread():list() / client:ArtefactCommentThread():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtefactCommentThread(data)
  local EntityMod = require("entity.artefact_comment_thread_entity")
  if data == nil then
    if self._artefact_comment_thread == nil then
      self._artefact_comment_thread = EntityMod.new(self, nil)
    end
    return self._artefact_comment_thread
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtefactRevision():list() / client:ArtefactRevision():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtefactRevision(data)
  local EntityMod = require("entity.artefact_revision_entity")
  if data == nil then
    if self._artefact_revision == nil then
      self._artefact_revision = EntityMod.new(self, nil)
    end
    return self._artefact_revision
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtefactViewToken():list() / client:ArtefactViewToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtefactViewToken(data)
  local EntityMod = require("entity.artefact_view_token_entity")
  if data == nil then
    if self._artefact_view_token == nil then
      self._artefact_view_token = EntityMod.new(self, nil)
    end
    return self._artefact_view_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Artifact():list() / client:Artifact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Artifact(data)
  local EntityMod = require("entity.artifact_entity")
  if data == nil then
    if self._artifact == nil then
      self._artifact = EntityMod.new(self, nil)
    end
    return self._artifact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactCacheNamespace():list() / client:ArtifactCacheNamespace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtifactCacheNamespace(data)
  local EntityMod = require("entity.artifact_cache_namespace_entity")
  if data == nil then
    if self._artifact_cache_namespace == nil then
      self._artifact_cache_namespace = EntityMod.new(self, nil)
    end
    return self._artifact_cache_namespace
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactImageRepository():list() / client:ArtifactImageRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtifactImageRepository(data)
  local EntityMod = require("entity.artifact_image_repository_entity")
  if data == nil then
    if self._artifact_image_repository == nil then
      self._artifact_image_repository = EntityMod.new(self, nil)
    end
    return self._artifact_image_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactPackageMirror():list() / client:ArtifactPackageMirror():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtifactPackageMirror(data)
  local EntityMod = require("entity.artifact_package_mirror_entity")
  if data == nil then
    if self._artifact_package_mirror == nil then
      self._artifact_package_mirror = EntityMod.new(self, nil)
    end
    return self._artifact_package_mirror
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ArtifactRetentionPolicy():list() / client:ArtifactRetentionPolicy():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ArtifactRetentionPolicy(data)
  local EntityMod = require("entity.artifact_retention_policy_entity")
  if data == nil then
    if self._artifact_retention_policy == nil then
      self._artifact_retention_policy = EntityMod.new(self, nil)
    end
    return self._artifact_retention_policy
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


-- Idiomatic facade: client:AuditEvent():list() / client:AuditEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuditEvent(data)
  local EntityMod = require("entity.audit_event_entity")
  if data == nil then
    if self._audit_event == nil then
      self._audit_event = EntityMod.new(self, nil)
    end
    return self._audit_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Auth():list() / client:Auth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Auth(data)
  local EntityMod = require("entity.auth_entity")
  if data == nil then
    if self._auth == nil then
      self._auth = EntityMod.new(self, nil)
    end
    return self._auth
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthCli():list() / client:AuthCli():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthCli(data)
  local EntityMod = require("entity.auth_cli_entity")
  if data == nil then
    if self._auth_cli == nil then
      self._auth_cli = EntityMod.new(self, nil)
    end
    return self._auth_cli
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthGithub():list() / client:AuthGithub():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthGithub(data)
  local EntityMod = require("entity.auth_github_entity")
  if data == nil then
    if self._auth_github == nil then
      self._auth_github = EntityMod.new(self, nil)
    end
    return self._auth_github
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthGoogle():list() / client:AuthGoogle():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthGoogle(data)
  local EntityMod = require("entity.auth_google_entity")
  if data == nil then
    if self._auth_google == nil then
      self._auth_google = EntityMod.new(self, nil)
    end
    return self._auth_google
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthOpenai():list() / client:AuthOpenai():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthOpenai(data)
  local EntityMod = require("entity.auth_openai_entity")
  if data == nil then
    if self._auth_openai == nil then
      self._auth_openai = EntityMod.new(self, nil)
    end
    return self._auth_openai
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthPasswordReset():list() / client:AuthPasswordReset():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthPasswordReset(data)
  local EntityMod = require("entity.auth_password_reset_entity")
  if data == nil then
    if self._auth_password_reset == nil then
      self._auth_password_reset = EntityMod.new(self, nil)
    end
    return self._auth_password_reset
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AuthRegistrationOption():list() / client:AuthRegistrationOption():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:AuthRegistrationOption(data)
  local EntityMod = require("entity.auth_registration_option_entity")
  if data == nil then
    if self._auth_registration_option == nil then
      self._auth_registration_option = EntityMod.new(self, nil)
    end
    return self._auth_registration_option
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


-- Idiomatic facade: client:BackendRunnerPool():list() / client:BackendRunnerPool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BackendRunnerPool(data)
  local EntityMod = require("entity.backend_runner_pool_entity")
  if data == nil then
    if self._backend_runner_pool == nil then
      self._backend_runner_pool = EntityMod.new(self, nil)
    end
    return self._backend_runner_pool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Bazel():list() / client:Bazel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Bazel(data)
  local EntityMod = require("entity.bazel_entity")
  if data == nil then
    if self._bazel == nil then
      self._bazel = EntityMod.new(self, nil)
    end
    return self._bazel
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BazelActionResult():list() / client:BazelActionResult():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BazelActionResult(data)
  local EntityMod = require("entity.bazel_action_result_entity")
  if data == nil then
    if self._bazel_action_result == nil then
      self._bazel_action_result = EntityMod.new(self, nil)
    end
    return self._bazel_action_result
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BazelBackend():list() / client:BazelBackend():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BazelBackend(data)
  local EntityMod = require("entity.bazel_backend_entity")
  if data == nil then
    if self._bazel_backend == nil then
      self._bazel_backend = EntityMod.new(self, nil)
    end
    return self._bazel_backend
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BazelBlob():list() / client:BazelBlob():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BazelBlob(data)
  local EntityMod = require("entity.bazel_blob_entity")
  if data == nil then
    if self._bazel_blob == nil then
      self._bazel_blob = EntityMod.new(self, nil)
    end
    return self._bazel_blob
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BazelExecution():list() / client:BazelExecution():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BazelExecution(data)
  local EntityMod = require("entity.bazel_execution_entity")
  if data == nil then
    if self._bazel_execution == nil then
      self._bazel_execution = EntityMod.new(self, nil)
    end
    return self._bazel_execution
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BazelFindMissingBlob():list() / client:BazelFindMissingBlob():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BazelFindMissingBlob(data)
  local EntityMod = require("entity.bazel_find_missing_blob_entity")
  if data == nil then
    if self._bazel_find_missing_blob == nil then
      self._bazel_find_missing_blob = EntityMod.new(self, nil)
    end
    return self._bazel_find_missing_blob
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Billing():list() / client:Billing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Billing(data)
  local EntityMod = require("entity.billing_entity")
  if data == nil then
    if self._billing == nil then
      self._billing = EntityMod.new(self, nil)
    end
    return self._billing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingAddon():list() / client:BillingAddon():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingAddon(data)
  local EntityMod = require("entity.billing_addon_entity")
  if data == nil then
    if self._billing_addon == nil then
      self._billing_addon = EntityMod.new(self, nil)
    end
    return self._billing_addon
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingCheckoutSession():list() / client:BillingCheckoutSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingCheckoutSession(data)
  local EntityMod = require("entity.billing_checkout_session_entity")
  if data == nil then
    if self._billing_checkout_session == nil then
      self._billing_checkout_session = EntityMod.new(self, nil)
    end
    return self._billing_checkout_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingInvoice():list() / client:BillingInvoice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingInvoice(data)
  local EntityMod = require("entity.billing_invoice_entity")
  if data == nil then
    if self._billing_invoice == nil then
      self._billing_invoice = EntityMod.new(self, nil)
    end
    return self._billing_invoice
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingPackage():list() / client:BillingPackage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingPackage(data)
  local EntityMod = require("entity.billing_package_entity")
  if data == nil then
    if self._billing_package == nil then
      self._billing_package = EntityMod.new(self, nil)
    end
    return self._billing_package
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingPortalSession():list() / client:BillingPortalSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingPortalSession(data)
  local EntityMod = require("entity.billing_portal_session_entity")
  if data == nil then
    if self._billing_portal_session == nil then
      self._billing_portal_session = EntityMod.new(self, nil)
    end
    return self._billing_portal_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingPrepaidPeriod():list() / client:BillingPrepaidPeriod():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingPrepaidPeriod(data)
  local EntityMod = require("entity.billing_prepaid_period_entity")
  if data == nil then
    if self._billing_prepaid_period == nil then
      self._billing_prepaid_period = EntityMod.new(self, nil)
    end
    return self._billing_prepaid_period
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingPrepaidPurchase():list() / client:BillingPrepaidPurchase():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingPrepaidPurchase(data)
  local EntityMod = require("entity.billing_prepaid_purchase_entity")
  if data == nil then
    if self._billing_prepaid_purchase == nil then
      self._billing_prepaid_purchase = EntityMod.new(self, nil)
    end
    return self._billing_prepaid_purchase
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingTokenTopUp():list() / client:BillingTokenTopUp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingTokenTopUp(data)
  local EntityMod = require("entity.billing_token_top_up_entity")
  if data == nil then
    if self._billing_token_top_up == nil then
      self._billing_token_top_up = EntityMod.new(self, nil)
    end
    return self._billing_token_top_up
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingUsage():list() / client:BillingUsage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BillingUsage(data)
  local EntityMod = require("entity.billing_usage_entity")
  if data == nil then
    if self._billing_usage == nil then
      self._billing_usage = EntityMod.new(self, nil)
    end
    return self._billing_usage
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


-- Idiomatic facade: client:BookmarkProtectionRefreshGithubRequiredCheck():list() / client:BookmarkProtectionRefreshGithubRequiredCheck():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:BookmarkProtectionRefreshGithubRequiredCheck(data)
  local EntityMod = require("entity.bookmark_protection_refresh_github_required_check_entity")
  if data == nil then
    if self._bookmark_protection_refresh_github_required_check == nil then
      self._bookmark_protection_refresh_github_required_check = EntityMod.new(self, nil)
    end
    return self._bookmark_protection_refresh_github_required_check
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


-- Idiomatic facade: client:CacheNamespaceEntry():list() / client:CacheNamespaceEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CacheNamespaceEntry(data)
  local EntityMod = require("entity.cache_namespace_entry_entity")
  if data == nil then
    if self._cache_namespace_entry == nil then
      self._cache_namespace_entry = EntityMod.new(self, nil)
    end
    return self._cache_namespace_entry
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


-- Idiomatic facade: client:Change():list() / client:Change():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Change(data)
  local EntityMod = require("entity.change_entity")
  if data == nil then
    if self._change == nil then
      self._change = EntityMod.new(self, nil)
    end
    return self._change
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeAsset():list() / client:ChangeAsset():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeAsset(data)
  local EntityMod = require("entity.change_asset_entity")
  if data == nil then
    if self._change_asset == nil then
      self._change_asset = EntityMod.new(self, nil)
    end
    return self._change_asset
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeComment():list() / client:ChangeComment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeComment(data)
  local EntityMod = require("entity.change_comment_entity")
  if data == nil then
    if self._change_comment == nil then
      self._change_comment = EntityMod.new(self, nil)
    end
    return self._change_comment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeFileReviewCheckpoint():list() / client:ChangeFileReviewCheckpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeFileReviewCheckpoint(data)
  local EntityMod = require("entity.change_file_review_checkpoint_entity")
  if data == nil then
    if self._change_file_review_checkpoint == nil then
      self._change_file_review_checkpoint = EntityMod.new(self, nil)
    end
    return self._change_file_review_checkpoint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeGitBranchSubmission():list() / client:ChangeGitBranchSubmission():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeGitBranchSubmission(data)
  local EntityMod = require("entity.change_git_branch_submission_entity")
  if data == nil then
    if self._change_git_branch_submission == nil then
      self._change_git_branch_submission = EntityMod.new(self, nil)
    end
    return self._change_git_branch_submission
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeGitCommitIdentity():list() / client:ChangeGitCommitIdentity():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeGitCommitIdentity(data)
  local EntityMod = require("entity.change_git_commit_identity_entity")
  if data == nil then
    if self._change_git_commit_identity == nil then
      self._change_git_commit_identity = EntityMod.new(self, nil)
    end
    return self._change_git_commit_identity
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeGitPublication():list() / client:ChangeGitPublication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeGitPublication(data)
  local EntityMod = require("entity.change_git_publication_entity")
  if data == nil then
    if self._change_git_publication == nil then
      self._change_git_publication = EntityMod.new(self, nil)
    end
    return self._change_git_publication
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeGroupMember():list() / client:ChangeGroupMember():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeGroupMember(data)
  local EntityMod = require("entity.change_group_member_entity")
  if data == nil then
    if self._change_group_member == nil then
      self._change_group_member = EntityMod.new(self, nil)
    end
    return self._change_group_member
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeLabel():list() / client:ChangeLabel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeLabel(data)
  local EntityMod = require("entity.change_label_entity")
  if data == nil then
    if self._change_label == nil then
      self._change_label = EntityMod.new(self, nil)
    end
    return self._change_label
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeLandingHold():list() / client:ChangeLandingHold():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeLandingHold(data)
  local EntityMod = require("entity.change_landing_hold_entity")
  if data == nil then
    if self._change_landing_hold == nil then
      self._change_landing_hold = EntityMod.new(self, nil)
    end
    return self._change_landing_hold
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeLandingRequest():list() / client:ChangeLandingRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeLandingRequest(data)
  local EntityMod = require("entity.change_landing_request_entity")
  if data == nil then
    if self._change_landing_request == nil then
      self._change_landing_request = EntityMod.new(self, nil)
    end
    return self._change_landing_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeRequestChange():list() / client:ChangeRequestChange():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeRequestChange(data)
  local EntityMod = require("entity.change_request_change_entity")
  if data == nil then
    if self._change_request_change == nil then
      self._change_request_change = EntityMod.new(self, nil)
    end
    return self._change_request_change
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeReviewer():list() / client:ChangeReviewer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeReviewer(data)
  local EntityMod = require("entity.change_reviewer_entity")
  if data == nil then
    if self._change_reviewer == nil then
      self._change_reviewer = EntityMod.new(self, nil)
    end
    return self._change_reviewer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeTranscript():list() / client:ChangeTranscript():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeTranscript(data)
  local EntityMod = require("entity.change_transcript_entity")
  if data == nil then
    if self._change_transcript == nil then
      self._change_transcript = EntityMod.new(self, nil)
    end
    return self._change_transcript
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ChangeTranscriptSummary():list() / client:ChangeTranscriptSummary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ChangeTranscriptSummary(data)
  local EntityMod = require("entity.change_transcript_summary_entity")
  if data == nil then
    if self._change_transcript_summary == nil then
      self._change_transcript_summary = EntityMod.new(self, nil)
    end
    return self._change_transcript_summary
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CheckpointPrepareChunk():list() / client:CheckpointPrepareChunk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CheckpointPrepareChunk(data)
  local EntityMod = require("entity.checkpoint_prepare_chunk_entity")
  if data == nil then
    if self._checkpoint_prepare_chunk == nil then
      self._checkpoint_prepare_chunk = EntityMod.new(self, nil)
    end
    return self._checkpoint_prepare_chunk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CiNode():list() / client:CiNode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CiNode(data)
  local EntityMod = require("entity.ci_node_entity")
  if data == nil then
    if self._ci_node == nil then
      self._ci_node = EntityMod.new(self, nil)
    end
    return self._ci_node
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CiPipeline():list() / client:CiPipeline():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CiPipeline(data)
  local EntityMod = require("entity.ci_pipeline_entity")
  if data == nil then
    if self._ci_pipeline == nil then
      self._ci_pipeline = EntityMod.new(self, nil)
    end
    return self._ci_pipeline
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CiPipelineRun():list() / client:CiPipelineRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CiPipelineRun(data)
  local EntityMod = require("entity.ci_pipeline_run_entity")
  if data == nil then
    if self._ci_pipeline_run == nil then
      self._ci_pipeline_run = EntityMod.new(self, nil)
    end
    return self._ci_pipeline_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CiRunnerPool():list() / client:CiRunnerPool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CiRunnerPool(data)
  local EntityMod = require("entity.ci_runner_pool_entity")
  if data == nil then
    if self._ci_runner_pool == nil then
      self._ci_runner_pool = EntityMod.new(self, nil)
    end
    return self._ci_runner_pool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CiStatus():list() / client:CiStatus():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CiStatus(data)
  local EntityMod = require("entity.ci_status_entity")
  if data == nil then
    if self._ci_status == nil then
      self._ci_status = EntityMod.new(self, nil)
    end
    return self._ci_status
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CliEvent():list() / client:CliEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CliEvent(data)
  local EntityMod = require("entity.cli_event_entity")
  if data == nil then
    if self._cli_event == nil then
      self._cli_event = EntityMod.new(self, nil)
    end
    return self._cli_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CliRelease():list() / client:CliRelease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CliRelease(data)
  local EntityMod = require("entity.cli_release_entity")
  if data == nil then
    if self._cli_release == nil then
      self._cli_release = EntityMod.new(self, nil)
    end
    return self._cli_release
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CloudWorkspaceBackupObject():list() / client:CloudWorkspaceBackupObject():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CloudWorkspaceBackupObject(data)
  local EntityMod = require("entity.cloud_workspace_backup_object_entity")
  if data == nil then
    if self._cloud_workspace_backup_object == nil then
      self._cloud_workspace_backup_object = EntityMod.new(self, nil)
    end
    return self._cloud_workspace_backup_object
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CodeRuleEvaluation():list() / client:CodeRuleEvaluation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CodeRuleEvaluation(data)
  local EntityMod = require("entity.code_rule_evaluation_entity")
  if data == nil then
    if self._code_rule_evaluation == nil then
      self._code_rule_evaluation = EntityMod.new(self, nil)
    end
    return self._code_rule_evaluation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ComSiteAccess():list() / client:ComSiteAccess():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ComSiteAccess(data)
  local EntityMod = require("entity.com_site_access_entity")
  if data == nil then
    if self._com_site_access == nil then
      self._com_site_access = EntityMod.new(self, nil)
    end
    return self._com_site_access
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ComSiteAccessSession():list() / client:ComSiteAccessSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ComSiteAccessSession(data)
  local EntityMod = require("entity.com_site_access_session_entity")
  if data == nil then
    if self._com_site_access_session == nil then
      self._com_site_access_session = EntityMod.new(self, nil)
    end
    return self._com_site_access_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CommentThreadComment():list() / client:CommentThreadComment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CommentThreadComment(data)
  local EntityMod = require("entity.comment_thread_comment_entity")
  if data == nil then
    if self._comment_thread_comment == nil then
      self._comment_thread_comment = EntityMod.new(self, nil)
    end
    return self._comment_thread_comment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CommitDiff():list() / client:CommitDiff():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:CommitDiff(data)
  local EntityMod = require("entity.commit_diff_entity")
  if data == nil then
    if self._commit_diff == nil then
      self._commit_diff = EntityMod.new(self, nil)
    end
    return self._commit_diff
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


-- Idiomatic facade: client:ContactSubmission():list() / client:ContactSubmission():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ContactSubmission(data)
  local EntityMod = require("entity.contact_submission_entity")
  if data == nil then
    if self._contact_submission == nil then
      self._contact_submission = EntityMod.new(self, nil)
    end
    return self._contact_submission
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ControlComputer():list() / client:ControlComputer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ControlComputer(data)
  local EntityMod = require("entity.control_computer_entity")
  if data == nil then
    if self._control_computer == nil then
      self._control_computer = EntityMod.new(self, nil)
    end
    return self._control_computer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ControlComputerControlOperation():list() / client:ControlComputerControlOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ControlComputerControlOperation(data)
  local EntityMod = require("entity.control_computer_control_operation_entity")
  if data == nil then
    if self._control_computer_control_operation == nil then
      self._control_computer_control_operation = EntityMod.new(self, nil)
    end
    return self._control_computer_control_operation
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


-- Idiomatic facade: client:Deployment():list() / client:Deployment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Deployment(data)
  local EntityMod = require("entity.deployment_entity")
  if data == nil then
    if self._deployment == nil then
      self._deployment = EntityMod.new(self, nil)
    end
    return self._deployment
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


-- Idiomatic facade: client:DeploymentDetail():list() / client:DeploymentDetail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentDetail(data)
  local EntityMod = require("entity.deployment_detail_entity")
  if data == nil then
    if self._deployment_detail == nil then
      self._deployment_detail = EntityMod.new(self, nil)
    end
    return self._deployment_detail
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


-- Idiomatic facade: client:DeploymentLog():list() / client:DeploymentLog():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentLog(data)
  local EntityMod = require("entity.deployment_log_entity")
  if data == nil then
    if self._deployment_log == nil then
      self._deployment_log = EntityMod.new(self, nil)
    end
    return self._deployment_log
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeploymentMetric():list() / client:DeploymentMetric():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentMetric(data)
  local EntityMod = require("entity.deployment_metric_entity")
  if data == nil then
    if self._deployment_metric == nil then
      self._deployment_metric = EntityMod.new(self, nil)
    end
    return self._deployment_metric
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeploymentPreview():list() / client:DeploymentPreview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentPreview(data)
  local EntityMod = require("entity.deployment_preview_entity")
  if data == nil then
    if self._deployment_preview == nil then
      self._deployment_preview = EntityMod.new(self, nil)
    end
    return self._deployment_preview
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeploymentSetting():list() / client:DeploymentSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeploymentSetting(data)
  local EntityMod = require("entity.deployment_setting_entity")
  if data == nil then
    if self._deployment_setting == nil then
      self._deployment_setting = EntityMod.new(self, nil)
    end
    return self._deployment_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DesktopLocalAgentModel():list() / client:DesktopLocalAgentModel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DesktopLocalAgentModel(data)
  local EntityMod = require("entity.desktop_local_agent_model_entity")
  if data == nil then
    if self._desktop_local_agent_model == nil then
      self._desktop_local_agent_model = EntityMod.new(self, nil)
    end
    return self._desktop_local_agent_model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DesktopLocalAgentResponse():list() / client:DesktopLocalAgentResponse():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DesktopLocalAgentResponse(data)
  local EntityMod = require("entity.desktop_local_agent_response_entity")
  if data == nil then
    if self._desktop_local_agent_response == nil then
      self._desktop_local_agent_response = EntityMod.new(self, nil)
    end
    return self._desktop_local_agent_response
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Device():list() / client:Device():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Device(data)
  local EntityMod = require("entity.device_entity")
  if data == nil then
    if self._device == nil then
      self._device = EntityMod.new(self, nil)
    end
    return self._device
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceBrowserOperation():list() / client:DeviceBrowserOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceBrowserOperation(data)
  local EntityMod = require("entity.device_browser_operation_entity")
  if data == nil then
    if self._device_browser_operation == nil then
      self._device_browser_operation = EntityMod.new(self, nil)
    end
    return self._device_browser_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceControlMessage():list() / client:DeviceControlMessage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceControlMessage(data)
  local EntityMod = require("entity.device_control_message_entity")
  if data == nil then
    if self._device_control_message == nil then
      self._device_control_message = EntityMod.new(self, nil)
    end
    return self._device_control_message
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceControlOperation():list() / client:DeviceControlOperation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceControlOperation(data)
  local EntityMod = require("entity.device_control_operation_entity")
  if data == nil then
    if self._device_control_operation == nil then
      self._device_control_operation = EntityMod.new(self, nil)
    end
    return self._device_control_operation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceEnterpriseRelay():list() / client:DeviceEnterpriseRelay():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceEnterpriseRelay(data)
  local EntityMod = require("entity.device_enterprise_relay_entity")
  if data == nil then
    if self._device_enterprise_relay == nil then
      self._device_enterprise_relay = EntityMod.new(self, nil)
    end
    return self._device_enterprise_relay
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceFolderListing():list() / client:DeviceFolderListing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceFolderListing(data)
  local EntityMod = require("entity.device_folder_listing_entity")
  if data == nil then
    if self._device_folder_listing == nil then
      self._device_folder_listing = EntityMod.new(self, nil)
    end
    return self._device_folder_listing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceGrant():list() / client:DeviceGrant():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceGrant(data)
  local EntityMod = require("entity.device_grant_entity")
  if data == nil then
    if self._device_grant == nil then
      self._device_grant = EntityMod.new(self, nil)
    end
    return self._device_grant
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceInvocation():list() / client:DeviceInvocation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceInvocation(data)
  local EntityMod = require("entity.device_invocation_entity")
  if data == nil then
    if self._device_invocation == nil then
      self._device_invocation = EntityMod.new(self, nil)
    end
    return self._device_invocation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceLocalEvent():list() / client:DeviceLocalEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceLocalEvent(data)
  local EntityMod = require("entity.device_local_event_entity")
  if data == nil then
    if self._device_local_event == nil then
      self._device_local_event = EntityMod.new(self, nil)
    end
    return self._device_local_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DevicePairing():list() / client:DevicePairing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DevicePairing(data)
  local EntityMod = require("entity.device_pairing_entity")
  if data == nil then
    if self._device_pairing == nil then
      self._device_pairing = EntityMod.new(self, nil)
    end
    return self._device_pairing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceProject():list() / client:DeviceProject():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceProject(data)
  local EntityMod = require("entity.device_project_entity")
  if data == nil then
    if self._device_project == nil then
      self._device_project = EntityMod.new(self, nil)
    end
    return self._device_project
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeviceScheduledCheckIn():list() / client:DeviceScheduledCheckIn():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DeviceScheduledCheckIn(data)
  local EntityMod = require("entity.device_scheduled_check_in_entity")
  if data == nil then
    if self._device_scheduled_check_in == nil then
      self._device_scheduled_check_in = EntityMod.new(self, nil)
    end
    return self._device_scheduled_check_in
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DockerBuilder():list() / client:DockerBuilder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DockerBuilder(data)
  local EntityMod = require("entity.docker_builder_entity")
  if data == nil then
    if self._docker_builder == nil then
      self._docker_builder = EntityMod.new(self, nil)
    end
    return self._docker_builder
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DockerBuilderSession():list() / client:DockerBuilderSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DockerBuilderSession(data)
  local EntityMod = require("entity.docker_builder_session_entity")
  if data == nil then
    if self._docker_builder_session == nil then
      self._docker_builder_session = EntityMod.new(self, nil)
    end
    return self._docker_builder_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DockerBuilderSetting():list() / client:DockerBuilderSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DockerBuilderSetting(data)
  local EntityMod = require("entity.docker_builder_setting_entity")
  if data == nil then
    if self._docker_builder_setting == nil then
      self._docker_builder_setting = EntityMod.new(self, nil)
    end
    return self._docker_builder_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainDnsIntegration():list() / client:DomainDnsIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:DomainDnsIntegration(data)
  local EntityMod = require("entity.domain_dns_integration_entity")
  if data == nil then
    if self._domain_dns_integration == nil then
      self._domain_dns_integration = EntityMod.new(self, nil)
    end
    return self._domain_dns_integration
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


-- Idiomatic facade: client:Edge():list() / client:Edge():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Edge(data)
  local EntityMod = require("entity.edge_entity")
  if data == nil then
    if self._edge == nil then
      self._edge = EntityMod.new(self, nil)
    end
    return self._edge
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EmailVerification():list() / client:EmailVerification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:EmailVerification(data)
  local EntityMod = require("entity.email_verification_entity")
  if data == nil then
    if self._email_verification == nil then
      self._email_verification = EntityMod.new(self, nil)
    end
    return self._email_verification
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


-- Idiomatic facade: client:ExecutionDesiredState():list() / client:ExecutionDesiredState():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExecutionDesiredState(data)
  local EntityMod = require("entity.execution_desired_state_entity")
  if data == nil then
    if self._execution_desired_state == nil then
      self._execution_desired_state = EntityMod.new(self, nil)
    end
    return self._execution_desired_state
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExecutionReconcilerTick():list() / client:ExecutionReconcilerTick():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExecutionReconcilerTick(data)
  local EntityMod = require("entity.execution_reconciler_tick_entity")
  if data == nil then
    if self._execution_reconciler_tick == nil then
      self._execution_reconciler_tick = EntityMod.new(self, nil)
    end
    return self._execution_reconciler_tick
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExecutionRelease():list() / client:ExecutionRelease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExecutionRelease(data)
  local EntityMod = require("entity.execution_release_entity")
  if data == nil then
    if self._execution_release == nil then
      self._execution_release = EntityMod.new(self, nil)
    end
    return self._execution_release
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ExecutionRuntimeInstance():list() / client:ExecutionRuntimeInstance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ExecutionRuntimeInstance(data)
  local EntityMod = require("entity.execution_runtime_instance_entity")
  if data == nil then
    if self._execution_runtime_instance == nil then
      self._execution_runtime_instance = EntityMod.new(self, nil)
    end
    return self._execution_runtime_instance
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


-- Idiomatic facade: client:Gh():list() / client:Gh():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Gh(data)
  local EntityMod = require("entity.gh_entity")
  if data == nil then
    if self._gh == nil then
      self._gh = EntityMod.new(self, nil)
    end
    return self._gh
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitImport():list() / client:GitImport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GitImport(data)
  local EntityMod = require("entity.git_import_entity")
  if data == nil then
    if self._git_import == nil then
      self._git_import = EntityMod.new(self, nil)
    end
    return self._git_import
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Github():list() / client:Github():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Github(data)
  local EntityMod = require("entity.github_entity")
  if data == nil then
    if self._github == nil then
      self._github = EntityMod.new(self, nil)
    end
    return self._github
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubApp():list() / client:GithubApp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubApp(data)
  local EntityMod = require("entity.github_app_entity")
  if data == nil then
    if self._github_app == nil then
      self._github_app = EntityMod.new(self, nil)
    end
    return self._github_app
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubAppImportableRepository():list() / client:GithubAppImportableRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubAppImportableRepository(data)
  local EntityMod = require("entity.github_app_importable_repository_entity")
  if data == nil then
    if self._github_app_importable_repository == nil then
      self._github_app_importable_repository = EntityMod.new(self, nil)
    end
    return self._github_app_importable_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubAppInstallation():list() / client:GithubAppInstallation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubAppInstallation(data)
  local EntityMod = require("entity.github_app_installation_entity")
  if data == nil then
    if self._github_app_installation == nil then
      self._github_app_installation = EntityMod.new(self, nil)
    end
    return self._github_app_installation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubAppInstallationAuthorization():list() / client:GithubAppInstallationAuthorization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubAppInstallationAuthorization(data)
  local EntityMod = require("entity.github_app_installation_authorization_entity")
  if data == nil then
    if self._github_app_installation_authorization == nil then
      self._github_app_installation_authorization = EntityMod.new(self, nil)
    end
    return self._github_app_installation_authorization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubAppUserAuthorization():list() / client:GithubAppUserAuthorization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubAppUserAuthorization(data)
  local EntityMod = require("entity.github_app_user_authorization_entity")
  if data == nil then
    if self._github_app_user_authorization == nil then
      self._github_app_user_authorization = EntityMod.new(self, nil)
    end
    return self._github_app_user_authorization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubCiRepository():list() / client:GithubCiRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubCiRepository(data)
  local EntityMod = require("entity.github_ci_repository_entity")
  if data == nil then
    if self._github_ci_repository == nil then
      self._github_ci_repository = EntityMod.new(self, nil)
    end
    return self._github_ci_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubCiRepositoryCompatibilityReport():list() / client:GithubCiRepositoryCompatibilityReport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubCiRepositoryCompatibilityReport(data)
  local EntityMod = require("entity.github_ci_repository_compatibility_report_entity")
  if data == nil then
    if self._github_ci_repository_compatibility_report == nil then
      self._github_ci_repository_compatibility_report = EntityMod.new(self, nil)
    end
    return self._github_ci_repository_compatibility_report
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


-- Idiomatic facade: client:GithubIntegration():list() / client:GithubIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubIntegration(data)
  local EntityMod = require("entity.github_integration_entity")
  if data == nil then
    if self._github_integration == nil then
      self._github_integration = EntityMod.new(self, nil)
    end
    return self._github_integration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubOnboarding():list() / client:GithubOnboarding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubOnboarding(data)
  local EntityMod = require("entity.github_onboarding_entity")
  if data == nil then
    if self._github_onboarding == nil then
      self._github_onboarding = EntityMod.new(self, nil)
    end
    return self._github_onboarding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubOnboardingBranch():list() / client:GithubOnboardingBranch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubOnboardingBranch(data)
  local EntityMod = require("entity.github_onboarding_branch_entity")
  if data == nil then
    if self._github_onboarding_branch == nil then
      self._github_onboarding_branch = EntityMod.new(self, nil)
    end
    return self._github_onboarding_branch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubOnboardingImport():list() / client:GithubOnboardingImport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubOnboardingImport(data)
  local EntityMod = require("entity.github_onboarding_import_entity")
  if data == nil then
    if self._github_onboarding_import == nil then
      self._github_onboarding_import = EntityMod.new(self, nil)
    end
    return self._github_onboarding_import
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubOnboardingImportBatch():list() / client:GithubOnboardingImportBatch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubOnboardingImportBatch(data)
  local EntityMod = require("entity.github_onboarding_import_batch_entity")
  if data == nil then
    if self._github_onboarding_import_batch == nil then
      self._github_onboarding_import_batch = EntityMod.new(self, nil)
    end
    return self._github_onboarding_import_batch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubOnboardingImportItem():list() / client:GithubOnboardingImportItem():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubOnboardingImportItem(data)
  local EntityMod = require("entity.github_onboarding_import_item_entity")
  if data == nil then
    if self._github_onboarding_import_item == nil then
      self._github_onboarding_import_item = EntityMod.new(self, nil)
    end
    return self._github_onboarding_import_item
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubPullRequest():list() / client:GithubPullRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubPullRequest(data)
  local EntityMod = require("entity.github_pull_request_entity")
  if data == nil then
    if self._github_pull_request == nil then
      self._github_pull_request = EntityMod.new(self, nil)
    end
    return self._github_pull_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerAdmission():list() / client:GithubRunnerAdmission():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerAdmission(data)
  local EntityMod = require("entity.github_runner_admission_entity")
  if data == nil then
    if self._github_runner_admission == nil then
      self._github_runner_admission = EntityMod.new(self, nil)
    end
    return self._github_runner_admission
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerCache():list() / client:GithubRunnerCache():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerCache(data)
  local EntityMod = require("entity.github_runner_cache_entity")
  if data == nil then
    if self._github_runner_cache == nil then
      self._github_runner_cache = EntityMod.new(self, nil)
    end
    return self._github_runner_cache
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerEgress():list() / client:GithubRunnerEgress():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerEgress(data)
  local EntityMod = require("entity.github_runner_egress_entity")
  if data == nil then
    if self._github_runner_egress == nil then
      self._github_runner_egress = EntityMod.new(self, nil)
    end
    return self._github_runner_egress
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerHistory():list() / client:GithubRunnerHistory():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerHistory(data)
  local EntityMod = require("entity.github_runner_history_entity")
  if data == nil then
    if self._github_runner_history == nil then
      self._github_runner_history = EntityMod.new(self, nil)
    end
    return self._github_runner_history
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerImage():list() / client:GithubRunnerImage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerImage(data)
  local EntityMod = require("entity.github_runner_image_entity")
  if data == nil then
    if self._github_runner_image == nil then
      self._github_runner_image = EntityMod.new(self, nil)
    end
    return self._github_runner_image
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerPool():list() / client:GithubRunnerPool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerPool(data)
  local EntityMod = require("entity.github_runner_pool_entity")
  if data == nil then
    if self._github_runner_pool == nil then
      self._github_runner_pool = EntityMod.new(self, nil)
    end
    return self._github_runner_pool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GithubRunnerSetup():list() / client:GithubRunnerSetup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GithubRunnerSetup(data)
  local EntityMod = require("entity.github_runner_setup_entity")
  if data == nil then
    if self._github_runner_setup == nil then
      self._github_runner_setup = EntityMod.new(self, nil)
    end
    return self._github_runner_setup
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Gitlab():list() / client:Gitlab():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Gitlab(data)
  local EntityMod = require("entity.gitlab_entity")
  if data == nil then
    if self._gitlab == nil then
      self._gitlab = EntityMod.new(self, nil)
    end
    return self._gitlab
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitlabConnection():list() / client:GitlabConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GitlabConnection(data)
  local EntityMod = require("entity.gitlab_connection_entity")
  if data == nil then
    if self._gitlab_connection == nil then
      self._gitlab_connection = EntityMod.new(self, nil)
    end
    return self._gitlab_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitlabImport():list() / client:GitlabImport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GitlabImport(data)
  local EntityMod = require("entity.gitlab_import_entity")
  if data == nil then
    if self._gitlab_import == nil then
      self._gitlab_import = EntityMod.new(self, nil)
    end
    return self._gitlab_import
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GitlabOauth():list() / client:GitlabOauth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GitlabOauth(data)
  local EntityMod = require("entity.gitlab_oauth_entity")
  if data == nil then
    if self._gitlab_oauth == nil then
      self._gitlab_oauth = EntityMod.new(self, nil)
    end
    return self._gitlab_oauth
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GrantAllAgent():list() / client:GrantAllAgent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:GrantAllAgent(data)
  local EntityMod = require("entity.grant_all_agent_entity")
  if data == nil then
    if self._grant_all_agent == nil then
      self._grant_all_agent = EntityMod.new(self, nil)
    end
    return self._grant_all_agent
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


-- Idiomatic facade: client:IdentityOrganization():list() / client:IdentityOrganization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:IdentityOrganization(data)
  local EntityMod = require("entity.identity_organization_entity")
  if data == nil then
    if self._identity_organization == nil then
      self._identity_organization = EntityMod.new(self, nil)
    end
    return self._identity_organization
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


-- Idiomatic facade: client:ImageRepositoryTag():list() / client:ImageRepositoryTag():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ImageRepositoryTag(data)
  local EntityMod = require("entity.image_repository_tag_entity")
  if data == nil then
    if self._image_repository_tag == nil then
      self._image_repository_tag = EntityMod.new(self, nil)
    end
    return self._image_repository_tag
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ImportBranchPolicy():list() / client:ImportBranchPolicy():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ImportBranchPolicy(data)
  local EntityMod = require("entity.import_branch_policy_entity")
  if data == nil then
    if self._import_branch_policy == nil then
      self._import_branch_policy = EntityMod.new(self, nil)
    end
    return self._import_branch_policy
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


-- Idiomatic facade: client:InvocationControl():list() / client:InvocationControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:InvocationControl(data)
  local EntityMod = require("entity.invocation_control_entity")
  if data == nil then
    if self._invocation_control == nil then
      self._invocation_control = EntityMod.new(self, nil)
    end
    return self._invocation_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:JobLogChunk():list() / client:JobLogChunk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:JobLogChunk(data)
  local EntityMod = require("entity.job_log_chunk_entity")
  if data == nil then
    if self._job_log_chunk == nil then
      self._job_log_chunk = EntityMod.new(self, nil)
    end
    return self._job_log_chunk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:JobStep():list() / client:JobStep():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:JobStep(data)
  local EntityMod = require("entity.job_step_entity")
  if data == nil then
    if self._job_step == nil then
      self._job_step = EntityMod.new(self, nil)
    end
    return self._job_step
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:JobWorkspace():list() / client:JobWorkspace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:JobWorkspace(data)
  local EntityMod = require("entity.job_workspace_entity")
  if data == nil then
    if self._job_workspace == nil then
      self._job_workspace = EntityMod.new(self, nil)
    end
    return self._job_workspace
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


-- Idiomatic facade: client:Known():list() / client:Known():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Known(data)
  local EntityMod = require("entity.known_entity")
  if data == nil then
    if self._known == nil then
      self._known = EntityMod.new(self, nil)
    end
    return self._known
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Label():list() / client:Label():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Label(data)
  local EntityMod = require("entity.label_entity")
  if data == nil then
    if self._label == nil then
      self._label = EntityMod.new(self, nil)
    end
    return self._label
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseArtifact():list() / client:LeaseArtifact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseArtifact(data)
  local EntityMod = require("entity.lease_artifact_entity")
  if data == nil then
    if self._lease_artifact == nil then
      self._lease_artifact = EntityMod.new(self, nil)
    end
    return self._lease_artifact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseCache():list() / client:LeaseCache():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseCache(data)
  local EntityMod = require("entity.lease_cache_entity")
  if data == nil then
    if self._lease_cache == nil then
      self._lease_cache = EntityMod.new(self, nil)
    end
    return self._lease_cache
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseLogChunk():list() / client:LeaseLogChunk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseLogChunk(data)
  local EntityMod = require("entity.lease_log_chunk_entity")
  if data == nil then
    if self._lease_log_chunk == nil then
      self._lease_log_chunk = EntityMod.new(self, nil)
    end
    return self._lease_log_chunk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseReconciliation():list() / client:LeaseReconciliation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseReconciliation(data)
  local EntityMod = require("entity.lease_reconciliation_entity")
  if data == nil then
    if self._lease_reconciliation == nil then
      self._lease_reconciliation = EntityMod.new(self, nil)
    end
    return self._lease_reconciliation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseStep():list() / client:LeaseStep():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseStep(data)
  local EntityMod = require("entity.lease_step_entity")
  if data == nil then
    if self._lease_step == nil then
      self._lease_step = EntityMod.new(self, nil)
    end
    return self._lease_step
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseVerifyDiagnostic():list() / client:LeaseVerifyDiagnostic():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseVerifyDiagnostic(data)
  local EntityMod = require("entity.lease_verify_diagnostic_entity")
  if data == nil then
    if self._lease_verify_diagnostic == nil then
      self._lease_verify_diagnostic = EntityMod.new(self, nil)
    end
    return self._lease_verify_diagnostic
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseVerifySecret():list() / client:LeaseVerifySecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseVerifySecret(data)
  local EntityMod = require("entity.lease_verify_secret_entity")
  if data == nil then
    if self._lease_verify_secret == nil then
      self._lease_verify_secret = EntityMod.new(self, nil)
    end
    return self._lease_verify_secret
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LeaseWorkspace():list() / client:LeaseWorkspace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LeaseWorkspace(data)
  local EntityMod = require("entity.lease_workspace_entity")
  if data == nil then
    if self._lease_workspace == nil then
      self._lease_workspace = EntityMod.new(self, nil)
    end
    return self._lease_workspace
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LocalAgentDecision():list() / client:LocalAgentDecision():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LocalAgentDecision(data)
  local EntityMod = require("entity.local_agent_decision_entity")
  if data == nil then
    if self._local_agent_decision == nil then
      self._local_agent_decision = EntityMod.new(self, nil)
    end
    return self._local_agent_decision
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LocalAgentResponse():list() / client:LocalAgentResponse():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LocalAgentResponse(data)
  local EntityMod = require("entity.local_agent_response_entity")
  if data == nil then
    if self._local_agent_response == nil then
      self._local_agent_response = EntityMod.new(self, nil)
    end
    return self._local_agent_response
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


-- Idiomatic facade: client:LogStreamChunk():list() / client:LogStreamChunk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LogStreamChunk(data)
  local EntityMod = require("entity.log_stream_chunk_entity")
  if data == nil then
    if self._log_stream_chunk == nil then
      self._log_stream_chunk = EntityMod.new(self, nil)
    end
    return self._log_stream_chunk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LogoImage():list() / client:LogoImage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:LogoImage(data)
  local EntityMod = require("entity.logo_image_entity")
  if data == nil then
    if self._logo_image == nil then
      self._logo_image = EntityMod.new(self, nil)
    end
    return self._logo_image
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MarketingSetting():list() / client:MarketingSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MarketingSetting(data)
  local EntityMod = require("entity.marketing_setting_entity")
  if data == nil then
    if self._marketing_setting == nil then
      self._marketing_setting = EntityMod.new(self, nil)
    end
    return self._marketing_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:McpOauth():list() / client:McpOauth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:McpOauth(data)
  local EntityMod = require("entity.mcp_oauth_entity")
  if data == nil then
    if self._mcp_oauth == nil then
      self._mcp_oauth = EntityMod.new(self, nil)
    end
    return self._mcp_oauth
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


-- Idiomatic facade: client:MergeQueueEntry():list() / client:MergeQueueEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MergeQueueEntry(data)
  local EntityMod = require("entity.merge_queue_entry_entity")
  if data == nil then
    if self._merge_queue_entry == nil then
      self._merge_queue_entry = EntityMod.new(self, nil)
    end
    return self._merge_queue_entry
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


-- Idiomatic facade: client:MergeResolution():list() / client:MergeResolution():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MergeResolution(data)
  local EntityMod = require("entity.merge_resolution_entity")
  if data == nil then
    if self._merge_resolution == nil then
      self._merge_resolution = EntityMod.new(self, nil)
    end
    return self._merge_resolution
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


-- Idiomatic facade: client:MetronomeWebhook():list() / client:MetronomeWebhook():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:MetronomeWebhook(data)
  local EntityMod = require("entity.metronome_webhook_entity")
  if data == nil then
    if self._metronome_webhook == nil then
      self._metronome_webhook = EntityMod.new(self, nil)
    end
    return self._metronome_webhook
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ModelSubscriptionAccount():list() / client:ModelSubscriptionAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ModelSubscriptionAccount(data)
  local EntityMod = require("entity.model_subscription_account_entity")
  if data == nil then
    if self._model_subscription_account == nil then
      self._model_subscription_account = EntityMod.new(self, nil)
    end
    return self._model_subscription_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ModelSubscriptionAccountConnection():list() / client:ModelSubscriptionAccountConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ModelSubscriptionAccountConnection(data)
  local EntityMod = require("entity.model_subscription_account_connection_entity")
  if data == nil then
    if self._model_subscription_account_connection == nil then
      self._model_subscription_account_connection = EntityMod.new(self, nil)
    end
    return self._model_subscription_account_connection
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


-- Idiomatic facade: client:NetworkingSpace():list() / client:NetworkingSpace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NetworkingSpace(data)
  local EntityMod = require("entity.networking_space_entity")
  if data == nil then
    if self._networking_space == nil then
      self._networking_space = EntityMod.new(self, nil)
    end
    return self._networking_space
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Node():list() / client:Node():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Node(data)
  local EntityMod = require("entity.node_entity")
  if data == nil then
    if self._node == nil then
      self._node = EntityMod.new(self, nil)
    end
    return self._node
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NodeCertificate():list() / client:NodeCertificate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NodeCertificate(data)
  local EntityMod = require("entity.node_certificate_entity")
  if data == nil then
    if self._node_certificate == nil then
      self._node_certificate = EntityMod.new(self, nil)
    end
    return self._node_certificate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NodeLease():list() / client:NodeLease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:NodeLease(data)
  local EntityMod = require("entity.node_lease_entity")
  if data == nil then
    if self._node_lease == nil then
      self._node_lease = EntityMod.new(self, nil)
    end
    return self._node_lease
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


-- Idiomatic facade: client:Now():list() / client:Now():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Now(data)
  local EntityMod = require("entity.now_entity")
  if data == nil then
    if self._now == nil then
      self._now = EntityMod.new(self, nil)
    end
    return self._now
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ObservabilityClickhouseCluster():list() / client:ObservabilityClickhouseCluster():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ObservabilityClickhouseCluster(data)
  local EntityMod = require("entity.observability_clickhouse_cluster_entity")
  if data == nil then
    if self._observability_clickhouse_cluster == nil then
      self._observability_clickhouse_cluster = EntityMod.new(self, nil)
    end
    return self._observability_clickhouse_cluster
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ObservabilityQuickwitCluster():list() / client:ObservabilityQuickwitCluster():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ObservabilityQuickwitCluster(data)
  local EntityMod = require("entity.observability_quickwit_cluster_entity")
  if data == nil then
    if self._observability_quickwit_cluster == nil then
      self._observability_quickwit_cluster = EntityMod.new(self, nil)
    end
    return self._observability_quickwit_cluster
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ObservabilitySpace():list() / client:ObservabilitySpace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ObservabilitySpace(data)
  local EntityMod = require("entity.observability_space_entity")
  if data == nil then
    if self._observability_space == nil then
      self._observability_space = EntityMod.new(self, nil)
    end
    return self._observability_space
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Openapi():list() / client:Openapi():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Openapi(data)
  local EntityMod = require("entity.openapi_entity")
  if data == nil then
    if self._openapi == nil then
      self._openapi = EntityMod.new(self, nil)
    end
    return self._openapi
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrgInvitation():list() / client:OrgInvitation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrgInvitation(data)
  local EntityMod = require("entity.org_invitation_entity")
  if data == nil then
    if self._org_invitation == nil then
      self._org_invitation = EntityMod.new(self, nil)
    end
    return self._org_invitation
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


-- Idiomatic facade: client:OrganizationApp():list() / client:OrganizationApp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationApp(data)
  local EntityMod = require("entity.organization_app_entity")
  if data == nil then
    if self._organization_app == nil then
      self._organization_app = EntityMod.new(self, nil)
    end
    return self._organization_app
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationControl():list() / client:OrganizationControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationControl(data)
  local EntityMod = require("entity.organization_control_entity")
  if data == nil then
    if self._organization_control == nil then
      self._organization_control = EntityMod.new(self, nil)
    end
    return self._organization_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationDevice():list() / client:OrganizationDevice():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationDevice(data)
  local EntityMod = require("entity.organization_device_entity")
  if data == nil then
    if self._organization_device == nil then
      self._organization_device = EntityMod.new(self, nil)
    end
    return self._organization_device
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationIdentityCertificate():list() / client:OrganizationIdentityCertificate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationIdentityCertificate(data)
  local EntityMod = require("entity.organization_identity_certificate_entity")
  if data == nil then
    if self._organization_identity_certificate == nil then
      self._organization_identity_certificate = EntityMod.new(self, nil)
    end
    return self._organization_identity_certificate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationInteraction():list() / client:OrganizationInteraction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationInteraction(data)
  local EntityMod = require("entity.organization_interaction_entity")
  if data == nil then
    if self._organization_interaction == nil then
      self._organization_interaction = EntityMod.new(self, nil)
    end
    return self._organization_interaction
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationInvitation():list() / client:OrganizationInvitation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationInvitation(data)
  local EntityMod = require("entity.organization_invitation_entity")
  if data == nil then
    if self._organization_invitation == nil then
      self._organization_invitation = EntityMod.new(self, nil)
    end
    return self._organization_invitation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationMessageFile():list() / client:OrganizationMessageFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationMessageFile(data)
  local EntityMod = require("entity.organization_message_file_entity")
  if data == nil then
    if self._organization_message_file == nil then
      self._organization_message_file = EntityMod.new(self, nil)
    end
    return self._organization_message_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationOidcTrust():list() / client:OrganizationOidcTrust():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationOidcTrust(data)
  local EntityMod = require("entity.organization_oidc_trust_entity")
  if data == nil then
    if self._organization_oidc_trust == nil then
      self._organization_oidc_trust = EntityMod.new(self, nil)
    end
    return self._organization_oidc_trust
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationRunEvent():list() / client:OrganizationRunEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationRunEvent(data)
  local EntityMod = require("entity.organization_run_event_entity")
  if data == nil then
    if self._organization_run_event == nil then
      self._organization_run_event = EntityMod.new(self, nil)
    end
    return self._organization_run_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationRunOutcome():list() / client:OrganizationRunOutcome():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationRunOutcome(data)
  local EntityMod = require("entity.organization_run_outcome_entity")
  if data == nil then
    if self._organization_run_outcome == nil then
      self._organization_run_outcome = EntityMod.new(self, nil)
    end
    return self._organization_run_outcome
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationRunUsage():list() / client:OrganizationRunUsage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationRunUsage(data)
  local EntityMod = require("entity.organization_run_usage_entity")
  if data == nil then
    if self._organization_run_usage == nil then
      self._organization_run_usage = EntityMod.new(self, nil)
    end
    return self._organization_run_usage
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationSandbox():list() / client:OrganizationSandbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationSandbox(data)
  local EntityMod = require("entity.organization_sandbox_entity")
  if data == nil then
    if self._organization_sandbox == nil then
      self._organization_sandbox = EntityMod.new(self, nil)
    end
    return self._organization_sandbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationSecret():list() / client:OrganizationSecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationSecret(data)
  local EntityMod = require("entity.organization_secret_entity")
  if data == nil then
    if self._organization_secret == nil then
      self._organization_secret = EntityMod.new(self, nil)
    end
    return self._organization_secret
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationServiceAccount():list() / client:OrganizationServiceAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationServiceAccount(data)
  local EntityMod = require("entity.organization_service_account_entity")
  if data == nil then
    if self._organization_service_account == nil then
      self._organization_service_account = EntityMod.new(self, nil)
    end
    return self._organization_service_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationSetting():list() / client:OrganizationSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationSetting(data)
  local EntityMod = require("entity.organization_setting_entity")
  if data == nil then
    if self._organization_setting == nil then
      self._organization_setting = EntityMod.new(self, nil)
    end
    return self._organization_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationSite():list() / client:OrganizationSite():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationSite(data)
  local EntityMod = require("entity.organization_site_entity")
  if data == nil then
    if self._organization_site == nil then
      self._organization_site = EntityMod.new(self, nil)
    end
    return self._organization_site
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationSubscription():list() / client:OrganizationSubscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationSubscription(data)
  local EntityMod = require("entity.organization_subscription_entity")
  if data == nil then
    if self._organization_subscription == nil then
      self._organization_subscription = EntityMod.new(self, nil)
    end
    return self._organization_subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationTool():list() / client:OrganizationTool():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationTool(data)
  local EntityMod = require("entity.organization_tool_entity")
  if data == nil then
    if self._organization_tool == nil then
      self._organization_tool = EntityMod.new(self, nil)
    end
    return self._organization_tool
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OrganizationWorkloadIdentity():list() / client:OrganizationWorkloadIdentity():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OrganizationWorkloadIdentity(data)
  local EntityMod = require("entity.organization_workload_identity_entity")
  if data == nil then
    if self._organization_workload_identity == nil then
      self._organization_workload_identity = EntityMod.new(self, nil)
    end
    return self._organization_workload_identity
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OtelIngest():list() / client:OtelIngest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:OtelIngest(data)
  local EntityMod = require("entity.otel_ingest_entity")
  if data == nil then
    if self._otel_ingest == nil then
      self._otel_ingest = EntityMod.new(self, nil)
    end
    return self._otel_ingest
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


-- Idiomatic facade: client:PageArtefact():list() / client:PageArtefact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PageArtefact(data)
  local EntityMod = require("entity.page_artefact_entity")
  if data == nil then
    if self._page_artefact == nil then
      self._page_artefact = EntityMod.new(self, nil)
    end
    return self._page_artefact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PageCiPipelineRun():list() / client:PageCiPipelineRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PageCiPipelineRun(data)
  local EntityMod = require("entity.page_ci_pipeline_run_entity")
  if data == nil then
    if self._page_ci_pipeline_run == nil then
      self._page_ci_pipeline_run = EntityMod.new(self, nil)
    end
    return self._page_ci_pipeline_run
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


-- Idiomatic facade: client:PageRepoVcCommit():list() / client:PageRepoVcCommit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PageRepoVcCommit(data)
  local EntityMod = require("entity.page_repo_vc_commit_entity")
  if data == nil then
    if self._page_repo_vc_commit == nil then
      self._page_repo_vc_commit = EntityMod.new(self, nil)
    end
    return self._page_repo_vc_commit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesBilling():list() / client:PagesBilling():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesBilling(data)
  local EntityMod = require("entity.pages_billing_entity")
  if data == nil then
    if self._pages_billing == nil then
      self._pages_billing = EntityMod.new(self, nil)
    end
    return self._pages_billing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesGithubOnboarding():list() / client:PagesGithubOnboarding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesGithubOnboarding(data)
  local EntityMod = require("entity.pages_github_onboarding_entity")
  if data == nil then
    if self._pages_github_onboarding == nil then
      self._pages_github_onboarding = EntityMod.new(self, nil)
    end
    return self._pages_github_onboarding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesMember():list() / client:PagesMember():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesMember(data)
  local EntityMod = require("entity.pages_member_entity")
  if data == nil then
    if self._pages_member == nil then
      self._pages_member = EntityMod.new(self, nil)
    end
    return self._pages_member
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


-- Idiomatic facade: client:PagesRegistry():list() / client:PagesRegistry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesRegistry(data)
  local EntityMod = require("entity.pages_registry_entity")
  if data == nil then
    if self._pages_registry == nil then
      self._pages_registry = EntityMod.new(self, nil)
    end
    return self._pages_registry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PagesSession():list() / client:PagesSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PagesSession(data)
  local EntityMod = require("entity.pages_session_entity")
  if data == nil then
    if self._pages_session == nil then
      self._pages_session = EntityMod.new(self, nil)
    end
    return self._pages_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Pairing():list() / client:Pairing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Pairing(data)
  local EntityMod = require("entity.pairing_entity")
  if data == nil then
    if self._pairing == nil then
      self._pairing = EntityMod.new(self, nil)
    end
    return self._pairing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PairingEvent():list() / client:PairingEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PairingEvent(data)
  local EntityMod = require("entity.pairing_event_entity")
  if data == nil then
    if self._pairing_event == nil then
      self._pairing_event = EntityMod.new(self, nil)
    end
    return self._pairing_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ParallelV1():list() / client:ParallelV1():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ParallelV1(data)
  local EntityMod = require("entity.parallel_v1_entity")
  if data == nil then
    if self._parallel_v1 == nil then
      self._parallel_v1 = EntityMod.new(self, nil)
    end
    return self._parallel_v1
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PatchsetDiff():list() / client:PatchsetDiff():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PatchsetDiff(data)
  local EntityMod = require("entity.patchset_diff_entity")
  if data == nil then
    if self._patchset_diff == nil then
      self._patchset_diff = EntityMod.new(self, nil)
    end
    return self._patchset_diff
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


-- Idiomatic facade: client:ProactiveAgentWaitlistEntry():list() / client:ProactiveAgentWaitlistEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ProactiveAgentWaitlistEntry(data)
  local EntityMod = require("entity.proactive_agent_waitlist_entry_entity")
  if data == nil then
    if self._proactive_agent_waitlist_entry == nil then
      self._proactive_agent_waitlist_entry = EntityMod.new(self, nil)
    end
    return self._proactive_agent_waitlist_entry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Product():list() / client:Product():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Product(data)
  local EntityMod = require("entity.product_entity")
  if data == nil then
    if self._product == nil then
      self._product = EntityMod.new(self, nil)
    end
    return self._product
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


-- Idiomatic facade: client:PullRequestAction():list() / client:PullRequestAction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestAction(data)
  local EntityMod = require("entity.pull_request_action_entity")
  if data == nil then
    if self._pull_request_action == nil then
      self._pull_request_action = EntityMod.new(self, nil)
    end
    return self._pull_request_action
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullRequestMagicMerge():list() / client:PullRequestMagicMerge():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestMagicMerge(data)
  local EntityMod = require("entity.pull_request_magic_merge_entity")
  if data == nil then
    if self._pull_request_magic_merge == nil then
      self._pull_request_magic_merge = EntityMod.new(self, nil)
    end
    return self._pull_request_magic_merge
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


-- Idiomatic facade: client:PullRequestTranscript():list() / client:PullRequestTranscript():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullRequestTranscript(data)
  local EntityMod = require("entity.pull_request_transcript_entity")
  if data == nil then
    if self._pull_request_transcript == nil then
      self._pull_request_transcript = EntityMod.new(self, nil)
    end
    return self._pull_request_transcript
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PullZone():list() / client:PullZone():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:PullZone(data)
  local EntityMod = require("entity.pull_zone_entity")
  if data == nil then
    if self._pull_zone == nil then
      self._pull_zone = EntityMod.new(self, nil)
    end
    return self._pull_zone
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


-- Idiomatic facade: client:RelayAgentConnection():list() / client:RelayAgentConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RelayAgentConnection(data)
  local EntityMod = require("entity.relay_agent_connection_entity")
  if data == nil then
    if self._relay_agent_connection == nil then
      self._relay_agent_connection = EntityMod.new(self, nil)
    end
    return self._relay_agent_connection
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


-- Idiomatic facade: client:RelaySignal():list() / client:RelaySignal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RelaySignal(data)
  local EntityMod = require("entity.relay_signal_entity")
  if data == nil then
    if self._relay_signal == nil then
      self._relay_signal = EntityMod.new(self, nil)
    end
    return self._relay_signal
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReleaseRollout():list() / client:ReleaseRollout():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ReleaseRollout(data)
  local EntityMod = require("entity.release_rollout_entity")
  if data == nil then
    if self._release_rollout == nil then
      self._release_rollout = EntityMod.new(self, nil)
    end
    return self._release_rollout
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Repo():list() / client:Repo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Repo(data)
  local EntityMod = require("entity.repo_entity")
  if data == nil then
    if self._repo == nil then
      self._repo = EntityMod.new(self, nil)
    end
    return self._repo
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoAccessToken():list() / client:RepoAccessToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoAccessToken(data)
  local EntityMod = require("entity.repo_access_token_entity")
  if data == nil then
    if self._repo_access_token == nil then
      self._repo_access_token = EntityMod.new(self, nil)
    end
    return self._repo_access_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoAction():list() / client:RepoAction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoAction(data)
  local EntityMod = require("entity.repo_action_entity")
  if data == nil then
    if self._repo_action == nil then
      self._repo_action = EntityMod.new(self, nil)
    end
    return self._repo_action
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoAgentCheckpoint():list() / client:RepoAgentCheckpoint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoAgentCheckpoint(data)
  local EntityMod = require("entity.repo_agent_checkpoint_entity")
  if data == nil then
    if self._repo_agent_checkpoint == nil then
      self._repo_agent_checkpoint = EntityMod.new(self, nil)
    end
    return self._repo_agent_checkpoint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoAgentSession():list() / client:RepoAgentSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoAgentSession(data)
  local EntityMod = require("entity.repo_agent_session_entity")
  if data == nil then
    if self._repo_agent_session == nil then
      self._repo_agent_session = EntityMod.new(self, nil)
    end
    return self._repo_agent_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoBookmarkProtection():list() / client:RepoBookmarkProtection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoBookmarkProtection(data)
  local EntityMod = require("entity.repo_bookmark_protection_entity")
  if data == nil then
    if self._repo_bookmark_protection == nil then
      self._repo_bookmark_protection = EntityMod.new(self, nil)
    end
    return self._repo_bookmark_protection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoBookmarkProtectionEvent():list() / client:RepoBookmarkProtectionEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoBookmarkProtectionEvent(data)
  local EntityMod = require("entity.repo_bookmark_protection_event_entity")
  if data == nil then
    if self._repo_bookmark_protection_event == nil then
      self._repo_bookmark_protection_event = EntityMod.new(self, nil)
    end
    return self._repo_bookmark_protection_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoCloudWorkspaceBackup():list() / client:RepoCloudWorkspaceBackup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoCloudWorkspaceBackup(data)
  local EntityMod = require("entity.repo_cloud_workspace_backup_entity")
  if data == nil then
    if self._repo_cloud_workspace_backup == nil then
      self._repo_cloud_workspace_backup = EntityMod.new(self, nil)
    end
    return self._repo_cloud_workspace_backup
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoCodeRule():list() / client:RepoCodeRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoCodeRule(data)
  local EntityMod = require("entity.repo_code_rule_entity")
  if data == nil then
    if self._repo_code_rule == nil then
      self._repo_code_rule = EntityMod.new(self, nil)
    end
    return self._repo_code_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoSetting():list() / client:RepoSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoSetting(data)
  local EntityMod = require("entity.repo_setting_entity")
  if data == nil then
    if self._repo_setting == nil then
      self._repo_setting = EntityMod.new(self, nil)
    end
    return self._repo_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoStat():list() / client:RepoStat():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoStat(data)
  local EntityMod = require("entity.repo_stat_entity")
  if data == nil then
    if self._repo_stat == nil then
      self._repo_stat = EntityMod.new(self, nil)
    end
    return self._repo_stat
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoVc():list() / client:RepoVc():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoVc(data)
  local EntityMod = require("entity.repo_vc_entity")
  if data == nil then
    if self._repo_vc == nil then
      self._repo_vc = EntityMod.new(self, nil)
    end
    return self._repo_vc
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepoVcCommit():list() / client:RepoVcCommit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepoVcCommit(data)
  local EntityMod = require("entity.repo_vc_commit_entity")
  if data == nil then
    if self._repo_vc_commit == nil then
      self._repo_vc_commit = EntityMod.new(self, nil)
    end
    return self._repo_vc_commit
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


-- Idiomatic facade: client:RepositoryAccess():list() / client:RepositoryAccess():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryAccess(data)
  local EntityMod = require("entity.repository_access_entity")
  if data == nil then
    if self._repository_access == nil then
      self._repository_access = EntityMod.new(self, nil)
    end
    return self._repository_access
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryAccessResolve():list() / client:RepositoryAccessResolve():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryAccessResolve(data)
  local EntityMod = require("entity.repository_access_resolve_entity")
  if data == nil then
    if self._repository_access_resolve == nil then
      self._repository_access_resolve = EntityMod.new(self, nil)
    end
    return self._repository_access_resolve
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryEvent():list() / client:RepositoryEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryEvent(data)
  local EntityMod = require("entity.repository_event_entity")
  if data == nil then
    if self._repository_event == nil then
      self._repository_event = EntityMod.new(self, nil)
    end
    return self._repository_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryImport():list() / client:RepositoryImport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryImport(data)
  local EntityMod = require("entity.repository_import_entity")
  if data == nil then
    if self._repository_import == nil then
      self._repository_import = EntityMod.new(self, nil)
    end
    return self._repository_import
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryImportSession():list() / client:RepositoryImportSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryImportSession(data)
  local EntityMod = require("entity.repository_import_session_entity")
  if data == nil then
    if self._repository_import_session == nil then
      self._repository_import_session = EntityMod.new(self, nil)
    end
    return self._repository_import_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryImportSessionRepository():list() / client:RepositoryImportSessionRepository():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryImportSessionRepository(data)
  local EntityMod = require("entity.repository_import_session_repository_entity")
  if data == nil then
    if self._repository_import_session_repository == nil then
      self._repository_import_session_repository = EntityMod.new(self, nil)
    end
    return self._repository_import_session_repository
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositoryImportSessionSelection():list() / client:RepositoryImportSessionSelection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositoryImportSessionSelection(data)
  local EntityMod = require("entity.repository_import_session_selection_entity")
  if data == nil then
    if self._repository_import_session_selection == nil then
      self._repository_import_session_selection = EntityMod.new(self, nil)
    end
    return self._repository_import_session_selection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RepositorySandboxEnvironment():list() / client:RepositorySandboxEnvironment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RepositorySandboxEnvironment(data)
  local EntityMod = require("entity.repository_sandbox_environment_entity")
  if data == nil then
    if self._repository_sandbox_environment == nil then
      self._repository_sandbox_environment = EntityMod.new(self, nil)
    end
    return self._repository_sandbox_environment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoderCodeRepair():list() / client:RoderCodeRepair():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RoderCodeRepair(data)
  local EntityMod = require("entity.roder_code_repair_entity")
  if data == nil then
    if self._roder_code_repair == nil then
      self._roder_code_repair = EntityMod.new(self, nil)
    end
    return self._roder_code_repair
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoderCodeRepairSetting():list() / client:RoderCodeRepairSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RoderCodeRepairSetting(data)
  local EntityMod = require("entity.roder_code_repair_setting_entity")
  if data == nil then
    if self._roder_code_repair_setting == nil then
      self._roder_code_repair_setting = EntityMod.new(self, nil)
    end
    return self._roder_code_repair_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoderMachine():list() / client:RoderMachine():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RoderMachine(data)
  local EntityMod = require("entity.roder_machine_entity")
  if data == nil then
    if self._roder_machine == nil then
      self._roder_machine = EntityMod.new(self, nil)
    end
    return self._roder_machine
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoderRun():list() / client:RoderRun():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RoderRun(data)
  local EntityMod = require("entity.roder_run_entity")
  if data == nil then
    if self._roder_run == nil then
      self._roder_run = EntityMod.new(self, nil)
    end
    return self._roder_run
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RoderWorkspaceCredential():list() / client:RoderWorkspaceCredential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RoderWorkspaceCredential(data)
  local EntityMod = require("entity.roder_workspace_credential_entity")
  if data == nil then
    if self._roder_workspace_credential == nil then
      self._roder_workspace_credential = EntityMod.new(self, nil)
    end
    return self._roder_workspace_credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunArtifact():list() / client:RunArtifact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunArtifact(data)
  local EntityMod = require("entity.run_artifact_entity")
  if data == nil then
    if self._run_artifact == nil then
      self._run_artifact = EntityMod.new(self, nil)
    end
    return self._run_artifact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunJob():list() / client:RunJob():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunJob(data)
  local EntityMod = require("entity.run_job_entity")
  if data == nil then
    if self._run_job == nil then
      self._run_job = EntityMod.new(self, nil)
    end
    return self._run_job
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


-- Idiomatic facade: client:RunWorkspaceCredential():list() / client:RunWorkspaceCredential():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunWorkspaceCredential(data)
  local EntityMod = require("entity.run_workspace_credential_entity")
  if data == nil then
    if self._run_workspace_credential == nil then
      self._run_workspace_credential = EntityMod.new(self, nil)
    end
    return self._run_workspace_credential
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunnerLease():list() / client:RunnerLease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunnerLease(data)
  local EntityMod = require("entity.runner_lease_entity")
  if data == nil then
    if self._runner_lease == nil then
      self._runner_lease = EntityMod.new(self, nil)
    end
    return self._runner_lease
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunnerPoolNodeEnrollmentToken():list() / client:RunnerPoolNodeEnrollmentToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunnerPoolNodeEnrollmentToken(data)
  local EntityMod = require("entity.runner_pool_node_enrollment_token_entity")
  if data == nil then
    if self._runner_pool_node_enrollment_token == nil then
      self._runner_pool_node_enrollment_token = EntityMod.new(self, nil)
    end
    return self._runner_pool_node_enrollment_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RunnerPoolRunner():list() / client:RunnerPoolRunner():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RunnerPoolRunner(data)
  local EntityMod = require("entity.runner_pool_runner_entity")
  if data == nil then
    if self._runner_pool_runner == nil then
      self._runner_pool_runner = EntityMod.new(self, nil)
    end
    return self._runner_pool_runner
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RuntimeInstanceHealthSnapshot():list() / client:RuntimeInstanceHealthSnapshot():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:RuntimeInstanceHealthSnapshot(data)
  local EntityMod = require("entity.runtime_instance_health_snapshot_entity")
  if data == nil then
    if self._runtime_instance_health_snapshot == nil then
      self._runtime_instance_health_snapshot = EntityMod.new(self, nil)
    end
    return self._runtime_instance_health_snapshot
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SandboxIntegration():list() / client:SandboxIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SandboxIntegration(data)
  local EntityMod = require("entity.sandbox_integration_entity")
  if data == nil then
    if self._sandbox_integration == nil then
      self._sandbox_integration = EntityMod.new(self, nil)
    end
    return self._sandbox_integration
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


-- Idiomatic facade: client:SecretGrant():list() / client:SecretGrant():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SecretGrant(data)
  local EntityMod = require("entity.secret_grant_entity")
  if data == nil then
    if self._secret_grant == nil then
      self._secret_grant = EntityMod.new(self, nil)
    end
    return self._secret_grant
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SecretVersion():list() / client:SecretVersion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SecretVersion(data)
  local EntityMod = require("entity.secret_version_entity")
  if data == nil then
    if self._secret_version == nil then
      self._secret_version = EntityMod.new(self, nil)
    end
    return self._secret_version
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


-- Idiomatic facade: client:Setting():list() / client:Setting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Setting(data)
  local EntityMod = require("entity.setting_entity")
  if data == nil then
    if self._setting == nil then
      self._setting = EntityMod.new(self, nil)
    end
    return self._setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SettingMutationLease():list() / client:SettingMutationLease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SettingMutationLease(data)
  local EntityMod = require("entity.setting_mutation_lease_entity")
  if data == nil then
    if self._setting_mutation_lease == nil then
      self._setting_mutation_lease = EntityMod.new(self, nil)
    end
    return self._setting_mutation_lease
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Signal():list() / client:Signal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Signal(data)
  local EntityMod = require("entity.signal_entity")
  if data == nil then
    if self._signal == nil then
      self._signal = EntityMod.new(self, nil)
    end
    return self._signal
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SignalInbound():list() / client:SignalInbound():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SignalInbound(data)
  local EntityMod = require("entity.signal_inbound_entity")
  if data == nil then
    if self._signal_inbound == nil then
      self._signal_inbound = EntityMod.new(self, nil)
    end
    return self._signal_inbound
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SignalIntegration():list() / client:SignalIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SignalIntegration(data)
  local EntityMod = require("entity.signal_integration_entity")
  if data == nil then
    if self._signal_integration == nil then
      self._signal_integration = EntityMod.new(self, nil)
    end
    return self._signal_integration
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SignalIntegrationDelivery():list() / client:SignalIntegrationDelivery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SignalIntegrationDelivery(data)
  local EntityMod = require("entity.signal_integration_delivery_entity")
  if data == nil then
    if self._signal_integration_delivery == nil then
      self._signal_integration_delivery = EntityMod.new(self, nil)
    end
    return self._signal_integration_delivery
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SignalIntegrationTarget():list() / client:SignalIntegrationTarget():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SignalIntegrationTarget(data)
  local EntityMod = require("entity.signal_integration_target_entity")
  if data == nil then
    if self._signal_integration_target == nil then
      self._signal_integration_target = EntityMod.new(self, nil)
    end
    return self._signal_integration_target
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SignalSubscription():list() / client:SignalSubscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SignalSubscription(data)
  local EntityMod = require("entity.signal_subscription_entity")
  if data == nil then
    if self._signal_subscription == nil then
      self._signal_subscription = EntityMod.new(self, nil)
    end
    return self._signal_subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Site():list() / client:Site():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Site(data)
  local EntityMod = require("entity.site_entity")
  if data == nil then
    if self._site == nil then
      self._site = EntityMod.new(self, nil)
    end
    return self._site
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SiteAccessKey():list() / client:SiteAccessKey():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SiteAccessKey(data)
  local EntityMod = require("entity.site_access_key_entity")
  if data == nil then
    if self._site_access_key == nil then
      self._site_access_key = EntityMod.new(self, nil)
    end
    return self._site_access_key
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


-- Idiomatic facade: client:SiteSecret():list() / client:SiteSecret():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SiteSecret(data)
  local EntityMod = require("entity.site_secret_entity")
  if data == nil then
    if self._site_secret == nil then
      self._site_secret = EntityMod.new(self, nil)
    end
    return self._site_secret
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


-- Idiomatic facade: client:SourceConnection():list() / client:SourceConnection():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SourceConnection(data)
  local EntityMod = require("entity.source_connection_entity")
  if data == nil then
    if self._source_connection == nil then
      self._source_connection = EntityMod.new(self, nil)
    end
    return self._source_connection
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceAlertRule():list() / client:SpaceAlertRule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceAlertRule(data)
  local EntityMod = require("entity.space_alert_rule_entity")
  if data == nil then
    if self._space_alert_rule == nil then
      self._space_alert_rule = EntityMod.new(self, nil)
    end
    return self._space_alert_rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceAuditEvent():list() / client:SpaceAuditEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceAuditEvent(data)
  local EntityMod = require("entity.space_audit_event_entity")
  if data == nil then
    if self._space_audit_event == nil then
      self._space_audit_event = EntityMod.new(self, nil)
    end
    return self._space_audit_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceDnsRecord():list() / client:SpaceDnsRecord():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceDnsRecord(data)
  local EntityMod = require("entity.space_dns_record_entity")
  if data == nil then
    if self._space_dns_record == nil then
      self._space_dns_record = EntityMod.new(self, nil)
    end
    return self._space_dns_record
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceEnrollmentToken():list() / client:SpaceEnrollmentToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceEnrollmentToken(data)
  local EntityMod = require("entity.space_enrollment_token_entity")
  if data == nil then
    if self._space_enrollment_token == nil then
      self._space_enrollment_token = EntityMod.new(self, nil)
    end
    return self._space_enrollment_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceGateway():list() / client:SpaceGateway():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceGateway(data)
  local EntityMod = require("entity.space_gateway_entity")
  if data == nil then
    if self._space_gateway == nil then
      self._space_gateway = EntityMod.new(self, nil)
    end
    return self._space_gateway
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceGroup():list() / client:SpaceGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceGroup(data)
  local EntityMod = require("entity.space_group_entity")
  if data == nil then
    if self._space_group == nil then
      self._space_group = EntityMod.new(self, nil)
    end
    return self._space_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceGroupMembership():list() / client:SpaceGroupMembership():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceGroupMembership(data)
  local EntityMod = require("entity.space_group_membership_entity")
  if data == nil then
    if self._space_group_membership == nil then
      self._space_group_membership = EntityMod.new(self, nil)
    end
    return self._space_group_membership
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceLogStream():list() / client:SpaceLogStream():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceLogStream(data)
  local EntityMod = require("entity.space_log_stream_entity")
  if data == nil then
    if self._space_log_stream == nil then
      self._space_log_stream = EntityMod.new(self, nil)
    end
    return self._space_log_stream
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceMetricSery():list() / client:SpaceMetricSery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceMetricSery(data)
  local EntityMod = require("entity.space_metric_sery_entity")
  if data == nil then
    if self._space_metric_sery == nil then
      self._space_metric_sery = EntityMod.new(self, nil)
    end
    return self._space_metric_sery
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceOtelCollector():list() / client:SpaceOtelCollector():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceOtelCollector(data)
  local EntityMod = require("entity.space_otel_collector_entity")
  if data == nil then
    if self._space_otel_collector == nil then
      self._space_otel_collector = EntityMod.new(self, nil)
    end
    return self._space_otel_collector
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpacePeer():list() / client:SpacePeer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpacePeer(data)
  local EntityMod = require("entity.space_peer_entity")
  if data == nil then
    if self._space_peer == nil then
      self._space_peer = EntityMod.new(self, nil)
    end
    return self._space_peer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpacePeerAttachment():list() / client:SpacePeerAttachment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpacePeerAttachment(data)
  local EntityMod = require("entity.space_peer_attachment_entity")
  if data == nil then
    if self._space_peer_attachment == nil then
      self._space_peer_attachment = EntityMod.new(self, nil)
    end
    return self._space_peer_attachment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpacePolicy():list() / client:SpacePolicy():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpacePolicy(data)
  local EntityMod = require("entity.space_policy_entity")
  if data == nil then
    if self._space_policy == nil then
      self._space_policy = EntityMod.new(self, nil)
    end
    return self._space_policy
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceSegment():list() / client:SpaceSegment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceSegment(data)
  local EntityMod = require("entity.space_segment_entity")
  if data == nil then
    if self._space_segment == nil then
      self._space_segment = EntityMod.new(self, nil)
    end
    return self._space_segment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceTraceSpan():list() / client:SpaceTraceSpan():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SpaceTraceSpan(data)
  local EntityMod = require("entity.space_trace_span_entity")
  if data == nil then
    if self._space_trace_span == nil then
      self._space_trace_span = EntityMod.new(self, nil)
    end
    return self._space_trace_span
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Spark():list() / client:Spark():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Spark(data)
  local EntityMod = require("entity.spark_entity")
  if data == nil then
    if self._spark == nil then
      self._spark = EntityMod.new(self, nil)
    end
    return self._spark
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkAgentIntegration():list() / client:SparkAgentIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkAgentIntegration(data)
  local EntityMod = require("entity.spark_agent_integration_entity")
  if data == nil then
    if self._spark_agent_integration == nil then
      self._spark_agent_integration = EntityMod.new(self, nil)
    end
    return self._spark_agent_integration
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


-- Idiomatic facade: client:SparkAgentSite():list() / client:SparkAgentSite():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkAgentSite(data)
  local EntityMod = require("entity.spark_agent_site_entity")
  if data == nil then
    if self._spark_agent_site == nil then
      self._spark_agent_site = EntityMod.new(self, nil)
    end
    return self._spark_agent_site
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkAgentSkill():list() / client:SparkAgentSkill():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkAgentSkill(data)
  local EntityMod = require("entity.spark_agent_skill_entity")
  if data == nil then
    if self._spark_agent_skill == nil then
      self._spark_agent_skill = EntityMod.new(self, nil)
    end
    return self._spark_agent_skill
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkAgentThread():list() / client:SparkAgentThread():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkAgentThread(data)
  local EntityMod = require("entity.spark_agent_thread_entity")
  if data == nil then
    if self._spark_agent_thread == nil then
      self._spark_agent_thread = EntityMod.new(self, nil)
    end
    return self._spark_agent_thread
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkCredit():list() / client:SparkCredit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkCredit(data)
  local EntityMod = require("entity.spark_credit_entity")
  if data == nil then
    if self._spark_credit == nil then
      self._spark_credit = EntityMod.new(self, nil)
    end
    return self._spark_credit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkCreditAgentUsage():list() / client:SparkCreditAgentUsage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkCreditAgentUsage(data)
  local EntityMod = require("entity.spark_credit_agent_usage_entity")
  if data == nil then
    if self._spark_credit_agent_usage == nil then
      self._spark_credit_agent_usage = EntityMod.new(self, nil)
    end
    return self._spark_credit_agent_usage
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SparkCreditUsageTotal():list() / client:SparkCreditUsageTotal():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SparkCreditUsageTotal(data)
  local EntityMod = require("entity.spark_credit_usage_total_entity")
  if data == nil then
    if self._spark_credit_usage_total == nil then
      self._spark_credit_usage_total = EntityMod.new(self, nil)
    end
    return self._spark_credit_usage_total
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


-- Idiomatic facade: client:StatusChange():list() / client:StatusChange():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StatusChange(data)
  local EntityMod = require("entity.status_change_entity")
  if data == nil then
    if self._status_change == nil then
      self._status_change = EntityMod.new(self, nil)
    end
    return self._status_change
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StatusCommit():list() / client:StatusCommit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StatusCommit(data)
  local EntityMod = require("entity.status_commit_entity")
  if data == nil then
    if self._status_commit == nil then
      self._status_commit = EntityMod.new(self, nil)
    end
    return self._status_commit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StatusPatchset():list() / client:StatusPatchset():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StatusPatchset(data)
  local EntityMod = require("entity.status_patchset_entity")
  if data == nil then
    if self._status_patchset == nil then
      self._status_patchset = EntityMod.new(self, nil)
    end
    return self._status_patchset
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:StripeWebhook():list() / client:StripeWebhook():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:StripeWebhook(data)
  local EntityMod = require("entity.stripe_webhook_entity")
  if data == nil then
    if self._stripe_webhook == nil then
      self._stripe_webhook = EntityMod.new(self, nil)
    end
    return self._stripe_webhook
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SubmitTelemetry():list() / client:SubmitTelemetry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SubmitTelemetry(data)
  local EntityMod = require("entity.submit_telemetry_entity")
  if data == nil then
    if self._submit_telemetry == nil then
      self._submit_telemetry = EntityMod.new(self, nil)
    end
    return self._submit_telemetry
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


-- Idiomatic facade: client:SwarmEvent():list() / client:SwarmEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SwarmEvent(data)
  local EntityMod = require("entity.swarm_event_entity")
  if data == nil then
    if self._swarm_event == nil then
      self._swarm_event = EntityMod.new(self, nil)
    end
    return self._swarm_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SwarmLive():list() / client:SwarmLive():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SwarmLive(data)
  local EntityMod = require("entity.swarm_live_entity")
  if data == nil then
    if self._swarm_live == nil then
      self._swarm_live = EntityMod.new(self, nil)
    end
    return self._swarm_live
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SwarmNote():list() / client:SwarmNote():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SwarmNote(data)
  local EntityMod = require("entity.swarm_note_entity")
  if data == nil then
    if self._swarm_note == nil then
      self._swarm_note = EntityMod.new(self, nil)
    end
    return self._swarm_note
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SwarmTask():list() / client:SwarmTask():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:SwarmTask(data)
  local EntityMod = require("entity.swarm_task_entity")
  if data == nil then
    if self._swarm_task == nil then
      self._swarm_task = EntityMod.new(self, nil)
    end
    return self._swarm_task
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TaskLease():list() / client:TaskLease():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:TaskLease(data)
  local EntityMod = require("entity.task_lease_entity")
  if data == nil then
    if self._task_lease == nil then
      self._task_lease = EntityMod.new(self, nil)
    end
    return self._task_lease
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


-- Idiomatic facade: client:ThreadPreviewAccess():list() / client:ThreadPreviewAccess():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ThreadPreviewAccess(data)
  local EntityMod = require("entity.thread_preview_access_entity")
  if data == nil then
    if self._thread_preview_access == nil then
      self._thread_preview_access = EntityMod.new(self, nil)
    end
    return self._thread_preview_access
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ToolFeedback():list() / client:ToolFeedback():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:ToolFeedback(data)
  local EntityMod = require("entity.tool_feedback_entity")
  if data == nil then
    if self._tool_feedback == nil then
      self._tool_feedback = EntityMod.new(self, nil)
    end
    return self._tool_feedback
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Transcript():list() / client:Transcript():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:Transcript(data)
  local EntityMod = require("entity.transcript_entity")
  if data == nil then
    if self._transcript == nil then
      self._transcript = EntityMod.new(self, nil)
    end
    return self._transcript
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:V1Message():list() / client:V1Message():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:V1Message(data)
  local EntityMod = require("entity.v1_message_entity")
  if data == nil then
    if self._v1_message == nil then
      self._v1_message = EntityMod.new(self, nil)
    end
    return self._v1_message
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcBranch():list() / client:VcBranch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcBranch(data)
  local EntityMod = require("entity.vc_branch_entity")
  if data == nil then
    if self._vc_branch == nil then
      self._vc_branch = EntityMod.new(self, nil)
    end
    return self._vc_branch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcBrowser():list() / client:VcBrowser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcBrowser(data)
  local EntityMod = require("entity.vc_browser_entity")
  if data == nil then
    if self._vc_browser == nil then
      self._vc_browser = EntityMod.new(self, nil)
    end
    return self._vc_browser
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcChange():list() / client:VcChange():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcChange(data)
  local EntityMod = require("entity.vc_change_entity")
  if data == nil then
    if self._vc_change == nil then
      self._vc_change = EntityMod.new(self, nil)
    end
    return self._vc_change
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcChangeGroup():list() / client:VcChangeGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcChangeGroup(data)
  local EntityMod = require("entity.vc_change_group_entity")
  if data == nil then
    if self._vc_change_group == nil then
      self._vc_change_group = EntityMod.new(self, nil)
    end
    return self._vc_change_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcFile():list() / client:VcFile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcFile(data)
  local EntityMod = require("entity.vc_file_entity")
  if data == nil then
    if self._vc_file == nil then
      self._vc_file = EntityMod.new(self, nil)
    end
    return self._vc_file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcMergeQueue():list() / client:VcMergeQueue():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcMergeQueue(data)
  local EntityMod = require("entity.vc_merge_queue_entity")
  if data == nil then
    if self._vc_merge_queue == nil then
      self._vc_merge_queue = EntityMod.new(self, nil)
    end
    return self._vc_merge_queue
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcStack():list() / client:VcStack():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcStack(data)
  local EntityMod = require("entity.vc_stack_entity")
  if data == nil then
    if self._vc_stack == nil then
      self._vc_stack = EntityMod.new(self, nil)
    end
    return self._vc_stack
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcsNode():list() / client:VcsNode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcsNode(data)
  local EntityMod = require("entity.vcs_node_entity")
  if data == nil then
    if self._vcs_node == nil then
      self._vcs_node = EntityMod.new(self, nil)
    end
    return self._vcs_node
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VcsSetting():list() / client:VcsSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VcsSetting(data)
  local EntityMod = require("entity.vcs_setting_entity")
  if data == nil then
    if self._vcs_setting == nil then
      self._vcs_setting = EntityMod.new(self, nil)
    end
    return self._vcs_setting
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


-- Idiomatic facade: client:VerifyEmailVerification():list() / client:VerifyEmailVerification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerifyEmailVerification(data)
  local EntityMod = require("entity.verify_email_verification_entity")
  if data == nil then
    if self._verify_email_verification == nil then
      self._verify_email_verification = EntityMod.new(self, nil)
    end
    return self._verify_email_verification
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:VerifySignalIntegration():list() / client:VerifySignalIntegration():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:VerifySignalIntegration(data)
  local EntityMod = require("entity.verify_signal_integration_entity")
  if data == nil then
    if self._verify_signal_integration == nil then
      self._verify_signal_integration = EntityMod.new(self, nil)
    end
    return self._verify_signal_integration
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


-- Idiomatic facade: client:WaitlistApplication():list() / client:WaitlistApplication():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WaitlistApplication(data)
  local EntityMod = require("entity.waitlist_application_entity")
  if data == nil then
    if self._waitlist_application == nil then
      self._waitlist_application = EntityMod.new(self, nil)
    end
    return self._waitlist_application
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


-- Idiomatic facade: client:WebhookGitlab():list() / client:WebhookGitlab():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WebhookGitlab(data)
  local EntityMod = require("entity.webhook_gitlab_entity")
  if data == nil then
    if self._webhook_gitlab == nil then
      self._webhook_gitlab = EntityMod.new(self, nil)
    end
    return self._webhook_gitlab
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


-- Idiomatic facade: client:WorkspaceActivity():list() / client:WorkspaceActivity():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkspaceActivity(data)
  local EntityMod = require("entity.workspace_activity_entity")
  if data == nil then
    if self._workspace_activity == nil then
      self._workspace_activity = EntityMod.new(self, nil)
    end
    return self._workspace_activity
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkspaceActivityNotification():list() / client:WorkspaceActivityNotification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkspaceActivityNotification(data)
  local EntityMod = require("entity.workspace_activity_notification_entity")
  if data == nil then
    if self._workspace_activity_notification == nil then
      self._workspace_activity_notification = EntityMod.new(self, nil)
    end
    return self._workspace_activity_notification
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkspaceSpace():list() / client:WorkspaceSpace():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkspaceSpace(data)
  local EntityMod = require("entity.workspace_space_entity")
  if data == nil then
    if self._workspace_space == nil then
      self._workspace_space = EntityMod.new(self, nil)
    end
    return self._workspace_space
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WorkspaceSpacePreference():list() / client:WorkspaceSpacePreference():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ComposalSDK:WorkspaceSpacePreference(data)
  local EntityMod = require("entity.workspace_space_preference_entity")
  if data == nil then
    if self._workspace_space_preference == nil then
      self._workspace_space_preference = EntityMod.new(self, nil)
    end
    return self._workspace_space_preference
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
