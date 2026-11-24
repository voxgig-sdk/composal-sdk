# RunJob entity test

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


class TestRunJobEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.RunJob(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.RunJob(None).list({"pipeline_id": 1, "run_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _run_job_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "run_job." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"run_job.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["pipeline01", "run01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_RUN_JOB_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        run_job_ref01_ent = client.RunJob(None)
        run_job_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.run_job"), "run_job_ref01"))
        run_job_ref01_data["pipeline_id"] = setup["idmap"]["pipeline01"]
        run_job_ref01_data["run_id"] = setup["idmap"]["run01"]

        run_job_ref01_data = helpers.to_map(runner.entity_data(run_job_ref01_ent.create(run_job_ref01_data, None)))
        assert run_job_ref01_data is not None
        assert run_job_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        run_job_ref01_match = {
            "pipeline_id": setup["idmap"]["pipeline01"],
            "run_id": setup["idmap"]["run01"],
        }

        run_job_ref01_list_result = run_job_ref01_ent.list(run_job_ref01_match, None)
        assert isinstance(run_job_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(run_job_ref01_list_result),
            {"id": run_job_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        run_job_ref01_match_dt0 = {
            "id": run_job_ref01_data["id"],
        }
        run_job_ref01_match_dt0["pipeline_id"] = setup["idmap"].get("pipeline_id") or setup["idmap"].get("pipeline01")
        run_job_ref01_match_dt0["run_id"] = setup["idmap"].get("run_id") or setup["idmap"].get("run01")
        run_job_ref01_data_dt0_loaded = run_job_ref01_ent.load(run_job_ref01_match_dt0, None)
        run_job_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(run_job_ref01_data_dt0_loaded))
        assert run_job_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(run_job_ref01_data_dt0_load_result.get("id"), run_job_ref01_data["id"])


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["pipeline01", "run01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_RUN_JOB_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("run_job01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "run_job",
                                 lambda: client.RunJob(None).list({"pipeline_id": setup["idmap"].get("pipeline01"), "run_id": setup["idmap"].get("run01")}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        run_job_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.run_job")))
        run_job_ref01_data = None
        if len(run_job_ref01_data_raw) > 0:
            run_job_ref01_data = helpers.to_map(run_job_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        run_job_ref01_ent = client.RunJob(None)
        run_job_ref01_match = {
            "pipeline_id": setup["idmap"]["pipeline01"],
            "run_id": setup["idmap"]["run01"],
        }

        run_job_ref01_list_result = run_job_ref01_ent.list(run_job_ref01_match, None)
        assert isinstance(run_job_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        run_job_ref01_match_dt0 = {
            "id": run_job_ref01_data["id"],
        }
        run_job_ref01_match_dt0["pipeline_id"] = setup["idmap"].get("pipeline_id") or setup["idmap"].get("pipeline01")
        run_job_ref01_match_dt0["run_id"] = setup["idmap"].get("run_id") or setup["idmap"].get("run01")
        run_job_ref01_data_dt0_loaded = run_job_ref01_ent.load(run_job_ref01_match_dt0, None)
        run_job_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(run_job_ref01_data_dt0_loaded))
        assert run_job_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(run_job_ref01_data_dt0_load_result.get("id"), run_job_ref01_data["id"])



def _run_job_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/run_job/RunJobTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["run_job01", "run_job02", "run_job03", "pipeline01", "run01"],
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
        "COMPOSAL_TEST_RUN_JOB_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_RUN_JOB_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_RUN_JOB_ENTID"))
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
