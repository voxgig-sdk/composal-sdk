# EnvironmentRevision entity test

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


class TestEnvironmentRevisionEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.EnvironmentRevision(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.EnvironmentRevision(None).load({"environment_id": 1, "id": "x", "organization_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _environment_revision_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "environment_revision." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"environment_revision.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision\"}")
            print("LIVE STEP {\"id\":\"environment_revision.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}\"}")
            print("LIVE STEP {\"id\":\"environment_revision.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only environment_revision.create.0 gives\"}")
            pytest.skip("Live coverage incomplete: environment_revision.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision); environment_revision.update.1 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}); environment_revision.load.2 excluded (GET-only live run: reads a record only environment_revision.create.0 gives)")

        if setup["live"]:
            for _live_key in ["environment01", "organization01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        environment_revision_ref01_ent = client.EnvironmentRevision(None)
        environment_revision_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.environment_revision"), "environment_revision_ref01"))
        environment_revision_ref01_data["environment_id"] = setup["idmap"]["environment01"]
        environment_revision_ref01_data["organization_id"] = setup["idmap"]["organization01"]

        environment_revision_ref01_data = helpers.to_map(runner.entity_data(environment_revision_ref01_ent.create(environment_revision_ref01_data, None)))
        assert environment_revision_ref01_data is not None
        assert environment_revision_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        environment_revision_ref01_data_up0_up = {
            "id": environment_revision_ref01_data["id"],
            "environment_id": setup["idmap"]["environment_id"],
            "organization_id": setup["idmap"]["organization_id"],
        }

        environment_revision_ref01_markdef_up0_name = "app_environment_id"
        environment_revision_ref01_markdef_up0_value = "Mark01-environment_revision_ref01_" + str(setup["now"])
        environment_revision_ref01_data_up0_up[environment_revision_ref01_markdef_up0_name] = environment_revision_ref01_markdef_up0_value

        environment_revision_ref01_resdata_up0 = helpers.to_map(runner.entity_data(environment_revision_ref01_ent.update(environment_revision_ref01_data_up0_up, None)))
        assert environment_revision_ref01_resdata_up0 is not None
        assert runner.live_same_id(environment_revision_ref01_resdata_up0.get("id"), environment_revision_ref01_data_up0_up["id"])
        assert environment_revision_ref01_resdata_up0[environment_revision_ref01_markdef_up0_name] == environment_revision_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        environment_revision_ref01_match_dt0 = {
            "id": environment_revision_ref01_data["id"],
        }
        environment_revision_ref01_match_dt0["environment_id"] = setup["idmap"].get("environment_id") or setup["idmap"].get("environment01")
        environment_revision_ref01_match_dt0["organization_id"] = environment_revision_ref01_data.get("organization_id") if isinstance(environment_revision_ref01_data.get("organization_id"), (str, int, float)) else setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        environment_revision_ref01_data_dt0_loaded = environment_revision_ref01_ent.load(environment_revision_ref01_match_dt0, None)
        environment_revision_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(environment_revision_ref01_data_dt0_loaded))
        assert environment_revision_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(environment_revision_ref01_data_dt0_load_result.get("id"), environment_revision_ref01_data["id"])



def _environment_revision_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/environment_revision/EnvironmentRevisionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["environment_revision01", "environment_revision02", "environment_revision03", "organization01", "organization02", "organization03", "environment01", "environment02", "environment03"],
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
        "COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("environment_id") is None:
        idmap_resolved["environment_id"] = idmap_resolved.get("environment01")
    if idmap_resolved.get("organization_id") is None:
        idmap_resolved["organization_id"] = idmap_resolved.get("organization01")

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
