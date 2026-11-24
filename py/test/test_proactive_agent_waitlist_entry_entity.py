# ProactiveAgentWaitlistEntry entity test

import json
import os
import time

import pytest

from composal_sdk.utility.voxgig_struct import voxgig_struct as vs
from composal_sdk import ComposalSDK
from composal_sdk.core import helpers
from composal_sdk.config import shared_config
from composal_sdk.feature.base_feature import ComposalBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestProactiveAgentWaitlistEntryEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.ProactiveAgentWaitlistEntry(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ProactiveAgentWaitlistEntry(None).load({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _proactive_agent_waitlist_entry_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "proactive_agent_waitlist_entry." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries\"}")
            print("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives\"}")
            pytest.skip("Live coverage incomplete: proactive_agent_waitlist_entry.create.0 excluded (GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries); proactive_agent_waitlist_entry.load.1 excluded (GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives)")

        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        proactive_agent_waitlist_entry_ref01_ent = client.ProactiveAgentWaitlistEntry(None)
        proactive_agent_waitlist_entry_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.proactive_agent_waitlist_entry"), "proactive_agent_waitlist_entry_ref01"))

        proactive_agent_waitlist_entry_ref01_data = helpers.to_map(runner.entity_data(proactive_agent_waitlist_entry_ref01_ent.create(proactive_agent_waitlist_entry_ref01_data, None)))
        assert proactive_agent_waitlist_entry_ref01_data is not None
        assert proactive_agent_waitlist_entry_ref01_data["referral_code"] is not None

        if setup["live"]:
            runner.live_pace()
        # LOAD
        proactive_agent_waitlist_entry_ref01_match_dt0 = {
            "id": proactive_agent_waitlist_entry_ref01_data["referral_code"],
        }
        proactive_agent_waitlist_entry_ref01_data_dt0_loaded = proactive_agent_waitlist_entry_ref01_ent.load(proactive_agent_waitlist_entry_ref01_match_dt0, None)
        proactive_agent_waitlist_entry_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(proactive_agent_waitlist_entry_ref01_data_dt0_loaded))
        assert proactive_agent_waitlist_entry_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(proactive_agent_waitlist_entry_ref01_data_dt0_load_result.get("referral_code"), proactive_agent_waitlist_entry_ref01_data["referral_code"])



def _proactive_agent_waitlist_entry_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/proactive_agent_waitlist_entry/ProactiveAgentWaitlistEntryTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    for rec in ((entity_data.get("existing") or {}).get("proactive_agent_waitlist_entry") or {}).values():
        if isinstance(rec, dict) and rec.get("id") is not None:
            rec["referral_code"] = rec["id"]

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["proactive_agent_waitlist_entry01", "proactive_agent_waitlist_entry02", "proactive_agent_waitlist_entry03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("COMPOSAL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("COMPOSAL_APIKEY"),
            },
            extra or {},
        ])
        client = ComposalSDK(helpers.to_map(merged_opts))

    _live = env.get("COMPOSAL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("COMPOSAL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
