# DockerBuilderSession entity test

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


class TestDockerBuilderSessionEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.DockerBuilderSession(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.DockerBuilderSession(None).load({"id": 1, "organization_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _docker_builder_session_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "docker_builder_session." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"docker_builder_session.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions\"}")
            print("LIVE STEP {\"id\":\"docker_builder_session.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only docker_builder_session.create.0 gives\"}")
            print("LIVE STEP {\"id\":\"docker_builder_session.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}\"}")
            pytest.skip("Live coverage incomplete: docker_builder_session.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions); docker_builder_session.load.1 excluded (GET-only live run: reads a record only docker_builder_session.create.0 gives); docker_builder_session.remove.2 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id})")

        if setup["live"]:
            for _live_key in ["organization01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        docker_builder_session_ref01_ent = client.DockerBuilderSession(None)
        docker_builder_session_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.docker_builder_session"), "docker_builder_session_ref01"))
        docker_builder_session_ref01_data["organization_id"] = setup["idmap"]["organization01"]

        docker_builder_session_ref01_data = helpers.to_map(runner.entity_data(docker_builder_session_ref01_ent.create(docker_builder_session_ref01_data, None)))
        assert docker_builder_session_ref01_data is not None
        assert docker_builder_session_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LOAD
        docker_builder_session_ref01_match_dt0 = {
            "id": docker_builder_session_ref01_data["id"],
        }
        docker_builder_session_ref01_match_dt0["organization_id"] = docker_builder_session_ref01_data.get("organization_id") if isinstance(docker_builder_session_ref01_data.get("organization_id"), (str, int, float)) else setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        docker_builder_session_ref01_data_dt0_loaded = docker_builder_session_ref01_ent.load(docker_builder_session_ref01_match_dt0, None)
        docker_builder_session_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(docker_builder_session_ref01_data_dt0_loaded))
        assert docker_builder_session_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(docker_builder_session_ref01_data_dt0_load_result.get("id"), docker_builder_session_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        docker_builder_session_ref01_match_rm0 = {
            "id": docker_builder_session_ref01_data["id"],
        }
        docker_builder_session_ref01_match_rm0["organization_id"] = setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        docker_builder_session_ref01_ent.remove(docker_builder_session_ref01_match_rm0, None)



def _docker_builder_session_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/docker_builder_session/DockerBuilderSessionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["docker_builder_session01", "docker_builder_session02", "docker_builder_session03", "organization01", "organization02", "organization03", "docker_builder01", "docker_builder02", "docker_builder03"],
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
        "COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID"))
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
