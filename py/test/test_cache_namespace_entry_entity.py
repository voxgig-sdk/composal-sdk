# CacheNamespaceEntry entity test

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


class TestCacheNamespaceEntryEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.CacheNamespaceEntry(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.CacheNamespaceEntry(None).list({"cache_namespace_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _cache_namespace_entry_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "cache_namespace_entry." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"cache_namespace_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict\"}")
            print("LIVE STEP {\"id\":\"cache_namespace_entry.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
            print("LIVE STEP {\"id\":\"cache_namespace_entry.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
            print("LIVE STEP {\"id\":\"cache_namespace_entry.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["cache_namespace01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        cache_namespace_entry_ref01_ent = client.CacheNamespaceEntry(None)
        cache_namespace_entry_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.cache_namespace_entry"), "cache_namespace_entry_ref01"))
        cache_namespace_entry_ref01_data["cache_namespace_id"] = setup["idmap"]["cache_namespace01"]

        cache_namespace_entry_ref01_data = helpers.to_map(runner.entity_data(cache_namespace_entry_ref01_ent.create(cache_namespace_entry_ref01_data, None)))
        assert cache_namespace_entry_ref01_data is not None
        assert cache_namespace_entry_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        cache_namespace_entry_ref01_match = {
            "cache_namespace_id": setup["idmap"]["cache_namespace01"],
        }

        cache_namespace_entry_ref01_list_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match, None)
        assert isinstance(cache_namespace_entry_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(cache_namespace_entry_ref01_list_result),
            {"id": cache_namespace_entry_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        cache_namespace_entry_ref01_data_up0_up = {
            "id": cache_namespace_entry_ref01_data["id"],
            "cache_namespace_id": setup["idmap"]["cache_namespace_id"],
        }

        cache_namespace_entry_ref01_resdata_up0 = helpers.to_map(runner.entity_data(cache_namespace_entry_ref01_ent.update(cache_namespace_entry_ref01_data_up0_up, None)))
        assert cache_namespace_entry_ref01_resdata_up0 is not None
        if not setup["live"]:
            assert runner.live_same_id(cache_namespace_entry_ref01_resdata_up0.get("id"), cache_namespace_entry_ref01_data_up0_up["id"])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        cache_namespace_entry_ref01_match_dt0 = {
            "id": cache_namespace_entry_ref01_data["id"],
        }
        cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup["idmap"].get("cache_namespace_id") or setup["idmap"].get("cache_namespace01")
        cache_namespace_entry_ref01_data_dt0_loaded = cache_namespace_entry_ref01_ent.load(cache_namespace_entry_ref01_match_dt0, None)
        cache_namespace_entry_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(cache_namespace_entry_ref01_data_dt0_loaded))
        assert cache_namespace_entry_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result.get("id"), cache_namespace_entry_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        cache_namespace_entry_ref01_match_rm0 = {
            "id": cache_namespace_entry_ref01_data["id"],
        }
        cache_namespace_entry_ref01_match_rm0["cache_namespace_id"] = setup["idmap"].get("cache_namespace_id") or setup["idmap"].get("cache_namespace01")
        cache_namespace_entry_ref01_ent.remove(cache_namespace_entry_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        cache_namespace_entry_ref01_match_rt0 = {
            "cache_namespace_id": setup["idmap"]["cache_namespace01"],
        }

        cache_namespace_entry_ref01_list_rt0_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match_rt0, None)
        assert isinstance(cache_namespace_entry_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(cache_namespace_entry_ref01_list_rt0_result),
            {"id": cache_namespace_entry_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["cache_namespace01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("cache_namespace_entry01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "cache_namespace_entry",
                                 lambda: client.CacheNamespaceEntry(None).list({"cache_namespace_id": setup["idmap"].get("cache_namespace01")}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        cache_namespace_entry_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.cache_namespace_entry")))
        cache_namespace_entry_ref01_data = None
        if len(cache_namespace_entry_ref01_data_raw) > 0:
            cache_namespace_entry_ref01_data = helpers.to_map(cache_namespace_entry_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        cache_namespace_entry_ref01_ent = client.CacheNamespaceEntry(None)
        cache_namespace_entry_ref01_match = {
            "cache_namespace_id": setup["idmap"]["cache_namespace01"],
        }

        cache_namespace_entry_ref01_list_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match, None)
        assert isinstance(cache_namespace_entry_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        cache_namespace_entry_ref01_match_dt0 = {
            "id": cache_namespace_entry_ref01_data["id"],
        }
        cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup["idmap"].get("cache_namespace_id") or setup["idmap"].get("cache_namespace01")
        cache_namespace_entry_ref01_data_dt0_loaded = cache_namespace_entry_ref01_ent.load(cache_namespace_entry_ref01_match_dt0, None)
        cache_namespace_entry_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(cache_namespace_entry_ref01_data_dt0_loaded))
        assert cache_namespace_entry_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result.get("id"), cache_namespace_entry_ref01_data["id"])



def _cache_namespace_entry_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/cache_namespace_entry/CacheNamespaceEntryTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["cache_namespace_entry01", "cache_namespace_entry02", "cache_namespace_entry03", "cache_namespace01"],
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
        "COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("cache_namespace_id") is None:
        idmap_resolved["cache_namespace_id"] = idmap_resolved.get("cache_namespace01")

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
