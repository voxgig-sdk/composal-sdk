# SparkAgentThread entity test

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


class TestSparkAgentThreadEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.SparkAgentThread(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.SparkAgentThread(None).list({"agent_id": 1, "organization_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _spark_agent_thread_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "spark_agent_thread." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"spark_agent_thread.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["agent01", "organization01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        spark_agent_thread_ref01_ent = client.SparkAgentThread(None)
        spark_agent_thread_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.spark_agent_thread"), "spark_agent_thread_ref01"))
        spark_agent_thread_ref01_data["agent_id"] = setup["idmap"]["agent01"]
        spark_agent_thread_ref01_data["organization_id"] = setup["idmap"]["organization01"]

        spark_agent_thread_ref01_data = helpers.to_map(runner.entity_data(spark_agent_thread_ref01_ent.create(spark_agent_thread_ref01_data, None)))
        assert spark_agent_thread_ref01_data is not None
        assert spark_agent_thread_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        spark_agent_thread_ref01_match = {
            "agent_id": setup["idmap"]["agent01"],
            "organization_id": setup["idmap"]["organization01"],
        }

        spark_agent_thread_ref01_list_result = spark_agent_thread_ref01_ent.list(spark_agent_thread_ref01_match, None)
        assert isinstance(spark_agent_thread_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(spark_agent_thread_ref01_list_result),
            {"id": spark_agent_thread_ref01_data["id"]})
        assert not vs.isempty(found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["agent01", "organization01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        spark_agent_thread_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.spark_agent_thread")))
        spark_agent_thread_ref01_data = None
        if len(spark_agent_thread_ref01_data_raw) > 0:
            spark_agent_thread_ref01_data = helpers.to_map(spark_agent_thread_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        spark_agent_thread_ref01_ent = client.SparkAgentThread(None)
        spark_agent_thread_ref01_match = {
            "agent_id": setup["idmap"]["agent01"],
            "organization_id": setup["idmap"]["organization01"],
        }

        spark_agent_thread_ref01_list_result = spark_agent_thread_ref01_ent.list(spark_agent_thread_ref01_match, None)
        assert isinstance(spark_agent_thread_ref01_list_result, list)



def _spark_agent_thread_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/spark_agent_thread/SparkAgentThreadTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["spark_agent_thread01", "spark_agent_thread02", "spark_agent_thread03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"],
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
        "COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID"))
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
