# SiteSecret entity test

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


class TestSiteSecretEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.SiteSecret(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.SiteSecret(None).update({"id": 1, "organization_id": "x", "site_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _site_secret_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "site_secret." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"site_secret.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}\"}")
            pytest.skip("Live coverage incomplete: site_secret.update.0 excluded (GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name})")

        if setup["live"]:
            for _live_key in ["organization01", "site01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_SITE_SECRET_ENTID")
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a site_secret record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        site_secret_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.site_secret")))
        site_secret_ref01_data = None
        if len(site_secret_ref01_data_raw) > 0:
            site_secret_ref01_data = helpers.to_map(site_secret_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        site_secret_ref01_ent = client.SiteSecret(None)
        site_secret_ref01_data_up0_up = {
            "id": site_secret_ref01_data["id"],
            "organization_id": setup["idmap"]["organization_id"],
            "site_id": setup["idmap"]["site_id"],
        }

        site_secret_ref01_markdef_up0_name = "native_agent_id"
        site_secret_ref01_markdef_up0_value = "Mark01-site_secret_ref01_" + str(setup["now"])
        site_secret_ref01_data_up0_up[site_secret_ref01_markdef_up0_name] = site_secret_ref01_markdef_up0_value

        site_secret_ref01_resdata_up0 = helpers.to_map(runner.entity_data(site_secret_ref01_ent.update(site_secret_ref01_data_up0_up, None)))
        assert site_secret_ref01_resdata_up0 is not None
        if not setup["live"]:
            assert runner.live_same_id(site_secret_ref01_resdata_up0.get("id"), site_secret_ref01_data_up0_up["id"])
        assert site_secret_ref01_resdata_up0[site_secret_ref01_markdef_up0_name] == site_secret_ref01_markdef_up0_value



def _site_secret_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/site_secret/SiteSecretTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["site_secret01", "site_secret02", "site_secret03", "organization01", "organization02", "organization03", "site01", "site02", "site03"],
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
        "COMPOSAL_TEST_SITE_SECRET_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_SITE_SECRET_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_SITE_SECRET_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("organization_id") is None:
        idmap_resolved["organization_id"] = idmap_resolved.get("organization01")
    if idmap_resolved.get("site_id") is None:
        idmap_resolved["site_id"] = idmap_resolved.get("site01")

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
