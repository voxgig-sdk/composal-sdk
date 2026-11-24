# Me entity test

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


class TestMeEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.Me(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Me(None).load({"analytics_distinct_id": 1, "id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _me_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "me." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"me.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/me/account_deletion\"}")
            print("LIVE STEP {\"id\":\"me.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/me\"}")
            print("LIVE STEP {\"id\":\"me.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only me.create.0 gives\"}")
            print("LIVE STEP {\"id\":\"me.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/me/profile_image\"}")
            pytest.skip("Live coverage incomplete: me.create.0 excluded (GET-only live run: needs POST /api/v1/me/account_deletion); me.update.1 excluded (GET-only live run: needs PATCH /api/v1/me); me.load.2 excluded (GET-only live run: reads a record only me.create.0 gives); me.remove.3 excluded (GET-only live run: needs DELETE /api/v1/me/profile_image)")

        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a me record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        me_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.me")))
        me_ref01_data = None
        if len(me_ref01_data_raw) > 0:
            me_ref01_data = helpers.to_map(me_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        me_ref01_ent = client.Me(None)
        me_ref01_data_up0_up = {
            "id": me_ref01_data["id"],
        }

        me_ref01_markdef_up0_name = "analytics_distinct_id"
        me_ref01_markdef_up0_value = "Mark01-me_ref01_" + str(setup["now"])
        me_ref01_data_up0_up[me_ref01_markdef_up0_name] = me_ref01_markdef_up0_value

        me_ref01_resdata_up0 = helpers.to_map(runner.entity_data(me_ref01_ent.update(me_ref01_data_up0_up, None)))
        assert me_ref01_resdata_up0 is not None
        assert runner.live_same_id(me_ref01_resdata_up0.get("id"), me_ref01_data_up0_up["id"])
        assert me_ref01_resdata_up0[me_ref01_markdef_up0_name] == me_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        me_ref01_match_dt0 = {
            "id": me_ref01_data["id"],
        }
        me_ref01_data_dt0_loaded = me_ref01_ent.load(me_ref01_match_dt0, None)
        me_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(me_ref01_data_dt0_loaded))
        assert me_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(me_ref01_data_dt0_load_result.get("id"), me_ref01_data["id"])



def _me_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/me/MeTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["me01", "me02", "me03"],
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
        "COMPOSAL_TEST_ME_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_ME_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_ME_ENTID"))
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
