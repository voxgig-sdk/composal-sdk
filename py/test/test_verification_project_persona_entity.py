# VerificationProjectPersona entity test

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


class TestVerificationProjectPersonaEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.VerificationProjectPersona(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.VerificationProjectPersona(None).list({"organization_id": 1, "project_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _verification_project_persona_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "verification_project_persona." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"verification_project_persona.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive\"}")
            print("LIVE STEP {\"id\":\"verification_project_persona.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}\"}")
            print("LIVE STEP {\"id\":\"verification_project_persona.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}\"}")
            print("LIVE STEP {\"id\":\"verification_project_persona.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["organization01", "project01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        verification_project_persona_ref01_ent = client.VerificationProjectPersona(None)
        verification_project_persona_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.verification_project_persona"), "verification_project_persona_ref01"))
        verification_project_persona_ref01_data["organization_id"] = setup["idmap"]["organization01"]
        verification_project_persona_ref01_data["project_id"] = setup["idmap"]["project01"]

        verification_project_persona_ref01_data = helpers.to_map(runner.entity_data(verification_project_persona_ref01_ent.create(verification_project_persona_ref01_data, None)))
        assert verification_project_persona_ref01_data is not None
        assert verification_project_persona_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        verification_project_persona_ref01_match = {
            "organization_id": setup["idmap"]["organization01"],
            "project_id": setup["idmap"]["project01"],
        }

        verification_project_persona_ref01_list_result = verification_project_persona_ref01_ent.list(verification_project_persona_ref01_match, None)
        assert isinstance(verification_project_persona_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(verification_project_persona_ref01_list_result),
            {"id": verification_project_persona_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        verification_project_persona_ref01_data_up0_up = {
            "id": verification_project_persona_ref01_data["id"],
            "organization_id": setup["idmap"]["organization_id"],
            "project_id": setup["idmap"]["project_id"],
        }

        verification_project_persona_ref01_markdef_up0_name = "access_mode"
        verification_project_persona_ref01_markdef_up0_value = "Mark01-verification_project_persona_ref01_" + str(setup["now"])
        verification_project_persona_ref01_data_up0_up[verification_project_persona_ref01_markdef_up0_name] = verification_project_persona_ref01_markdef_up0_value

        verification_project_persona_ref01_resdata_up0 = helpers.to_map(runner.entity_data(verification_project_persona_ref01_ent.update(verification_project_persona_ref01_data_up0_up, None)))
        assert verification_project_persona_ref01_resdata_up0 is not None
        assert runner.live_same_id(verification_project_persona_ref01_resdata_up0.get("id"), verification_project_persona_ref01_data_up0_up["id"])
        assert verification_project_persona_ref01_resdata_up0[verification_project_persona_ref01_markdef_up0_name] == verification_project_persona_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        verification_project_persona_ref01_match_dt0 = {
            "id": verification_project_persona_ref01_data["id"],
        }
        verification_project_persona_ref01_match_dt0["organization_id"] = setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        verification_project_persona_ref01_match_dt0["project_id"] = verification_project_persona_ref01_data.get("project_id") if isinstance(verification_project_persona_ref01_data.get("project_id"), (str, int, float)) else setup["idmap"].get("project_id") or setup["idmap"].get("project01")
        verification_project_persona_ref01_data_dt0_loaded = verification_project_persona_ref01_ent.load(verification_project_persona_ref01_match_dt0, None)
        verification_project_persona_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(verification_project_persona_ref01_data_dt0_loaded))
        assert verification_project_persona_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(verification_project_persona_ref01_data_dt0_load_result.get("id"), verification_project_persona_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        verification_project_persona_ref01_match_rm0 = {
            "id": verification_project_persona_ref01_data["id"],
        }
        verification_project_persona_ref01_match_rm0["organization_id"] = setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        verification_project_persona_ref01_match_rm0["project_id"] = setup["idmap"].get("project_id") or setup["idmap"].get("project01")
        verification_project_persona_ref01_ent.remove(verification_project_persona_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        verification_project_persona_ref01_match_rt0 = {
            "organization_id": setup["idmap"]["organization01"],
            "project_id": setup["idmap"]["project01"],
        }

        verification_project_persona_ref01_list_rt0_result = verification_project_persona_ref01_ent.list(verification_project_persona_ref01_match_rt0, None)
        assert isinstance(verification_project_persona_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(verification_project_persona_ref01_list_rt0_result),
            {"id": verification_project_persona_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["organization01", "project01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("verification_project_persona01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "verification_project_persona",
                                 lambda: client.VerificationProjectPersona(None).list({"organization_id": setup["idmap"].get("organization01"), "project_id": setup["idmap"].get("project01")}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        verification_project_persona_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.verification_project_persona")))
        verification_project_persona_ref01_data = None
        if len(verification_project_persona_ref01_data_raw) > 0:
            verification_project_persona_ref01_data = helpers.to_map(verification_project_persona_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        verification_project_persona_ref01_ent = client.VerificationProjectPersona(None)
        verification_project_persona_ref01_match = {
            "organization_id": setup["idmap"]["organization01"],
            "project_id": setup["idmap"]["project01"],
        }

        verification_project_persona_ref01_list_result = verification_project_persona_ref01_ent.list(verification_project_persona_ref01_match, None)
        assert isinstance(verification_project_persona_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        verification_project_persona_ref01_match_dt0 = {
            "id": verification_project_persona_ref01_data["id"],
        }
        verification_project_persona_ref01_match_dt0["organization_id"] = setup["idmap"].get("organization_id") or setup["idmap"].get("organization01")
        verification_project_persona_ref01_match_dt0["project_id"] = verification_project_persona_ref01_data.get("project_id") if isinstance(verification_project_persona_ref01_data.get("project_id"), (str, int, float)) else setup["idmap"].get("project_id") or setup["idmap"].get("project01")
        verification_project_persona_ref01_data_dt0_loaded = verification_project_persona_ref01_ent.load(verification_project_persona_ref01_match_dt0, None)
        verification_project_persona_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(verification_project_persona_ref01_data_dt0_loaded))
        assert verification_project_persona_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(verification_project_persona_ref01_data_dt0_load_result.get("id"), verification_project_persona_ref01_data["id"])



def _verification_project_persona_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/verification_project_persona/VerificationProjectPersonaTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["verification_project_persona01", "verification_project_persona02", "verification_project_persona03", "organization01", "organization02", "organization03", "project01", "project02", "project03"],
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
        "COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("organization_id") is None:
        idmap_resolved["organization_id"] = idmap_resolved.get("organization01")
    if idmap_resolved.get("project_id") is None:
        idmap_resolved["project_id"] = idmap_resolved.get("project01")

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
