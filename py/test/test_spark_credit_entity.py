# SparkCredit entity test

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


class TestSparkCreditEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.SparkCredit(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.SparkCredit(None).load({"organization_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _spark_credit_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "spark_credit." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"spark_credit.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/spark_credits\"}")
            print("LIVE STEP {\"id\":\"spark_credit.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/spark_credits\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["organization01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_SPARK_CREDIT_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        spark_credit_ref01_ent = client.SparkCredit(None)
        spark_credit_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.spark_credit"), "spark_credit_ref01"))
        spark_credit_ref01_data["organization_id"] = setup["idmap"]["organization01"]

        spark_credit_ref01_data = helpers.to_map(runner.entity_data(spark_credit_ref01_ent.create(spark_credit_ref01_data, None)))
        assert spark_credit_ref01_data is not None

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        spark_credit_ref01_data_up0_up = {
        }

        spark_credit_ref01_markdef_up0_name = "available_usd"
        spark_credit_ref01_markdef_up0_value = "Mark01-spark_credit_ref01_" + str(setup["now"])
        spark_credit_ref01_data_up0_up[spark_credit_ref01_markdef_up0_name] = spark_credit_ref01_markdef_up0_value

        spark_credit_ref01_resdata_up0 = helpers.to_map(runner.entity_data(spark_credit_ref01_ent.update(spark_credit_ref01_data_up0_up, None)))
        assert spark_credit_ref01_resdata_up0 is not None
        assert spark_credit_ref01_resdata_up0[spark_credit_ref01_markdef_up0_name] == spark_credit_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        spark_credit_ref01_match_dt0 = {}
        spark_credit_ref01_data_dt0_loaded = spark_credit_ref01_ent.load(spark_credit_ref01_match_dt0, None)
        assert spark_credit_ref01_data_dt0_loaded is not None


    def _run_get_only_flow(self, setup):
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        spark_credit_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.spark_credit")))
        spark_credit_ref01_data = None
        if len(spark_credit_ref01_data_raw) > 0:
            spark_credit_ref01_data = helpers.to_map(spark_credit_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        spark_credit_ref01_ent = client.SparkCredit(None)
        spark_credit_ref01_match_dt0 = {}
        spark_credit_ref01_data_dt0_loaded = spark_credit_ref01_ent.load(spark_credit_ref01_match_dt0, None)
        assert spark_credit_ref01_data_dt0_loaded is not None



def _spark_credit_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/spark_credit/SparkCreditTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["spark_credit01", "spark_credit02", "spark_credit03", "organization01", "organization02", "organization03"],
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
        "COMPOSAL_TEST_SPARK_CREDIT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_SPARK_CREDIT_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_SPARK_CREDIT_ENTID"))
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
