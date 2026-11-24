# ObservabilitySpace entity test

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


class _FailHook(ComposalBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("observability_space hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestObservabilitySpaceEntity:

    def test_should_create_instance(self):
        testsdk = ComposalSDK.test(None, None)
        ent = testsdk.ObservabilitySpace(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "observability_space": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ComposalSDK.test(seed, None)
        seen = list(base.ObservabilitySpace(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from composal_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ComposalSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.ObservabilitySpace(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(ComposalSDK.test(offline, None).ObservabilitySpace(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(ComposalSDK.test(offline, None).ObservabilitySpace(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = ComposalSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.ObservabilitySpace(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(ComposalSDK.test(None, None).ObservabilitySpace(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = ComposalSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.ObservabilitySpace(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.ObservabilitySpace(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_validate_each_listed_record(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        opts = {"feature": {"validate": {"active": True, "request": False, "response": True}}}
        listed = ComposalSDK.test({"entity": {"observability_space": {"v1": {}}}}, opts).ObservabilitySpace(None).list(None, None)
        assert ["v1"] == [ent.data_get().get("id") for ent in listed]

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ComposalSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ObservabilitySpace(None).list({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _observability_space_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "observability_space." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"observability_space.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{id}/activate\"}")
            print("LIVE STEP {\"id\":\"observability_space.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/spaces/{id}\"}")
            print("LIVE STEP {\"id\":\"observability_space.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/spaces/{id}\"}")
            print("LIVE STEP {\"id\":\"observability_space.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        observability_space_ref01_ent = client.ObservabilitySpace(None)
        observability_space_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.observability_space"), "observability_space_ref01"))

        observability_space_ref01_data = helpers.to_map(runner.entity_data(observability_space_ref01_ent.create(observability_space_ref01_data, None)))
        assert observability_space_ref01_data is not None
        assert observability_space_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        observability_space_ref01_match = {}

        observability_space_ref01_list_result = observability_space_ref01_ent.list(observability_space_ref01_match, None)
        assert isinstance(observability_space_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(observability_space_ref01_list_result),
            {"id": observability_space_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        observability_space_ref01_data_up0_up = {
            "id": observability_space_ref01_data["id"],
        }

        observability_space_ref01_resdata_up0 = helpers.to_map(runner.entity_data(observability_space_ref01_ent.update(observability_space_ref01_data_up0_up, None)))
        assert observability_space_ref01_resdata_up0 is not None
        if not setup["live"]:
            assert runner.live_same_id(observability_space_ref01_resdata_up0.get("id"), observability_space_ref01_data_up0_up["id"])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        observability_space_ref01_match_dt0 = {
            "id": observability_space_ref01_data["id"],
        }
        observability_space_ref01_data_dt0_loaded = observability_space_ref01_ent.load(observability_space_ref01_match_dt0, None)
        observability_space_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(observability_space_ref01_data_dt0_loaded))
        assert observability_space_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(observability_space_ref01_data_dt0_load_result.get("id"), observability_space_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        observability_space_ref01_match_rm0 = {
            "id": observability_space_ref01_data["id"],
        }
        observability_space_ref01_ent.remove(observability_space_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        observability_space_ref01_match_rt0 = {}

        observability_space_ref01_list_rt0_result = observability_space_ref01_ent.list(observability_space_ref01_match_rt0, None)
        assert isinstance(observability_space_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(observability_space_ref01_list_rt0_result),
            {"id": observability_space_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("observability_space01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "observability_space",
                                 lambda: client.ObservabilitySpace(None).list({}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        observability_space_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.observability_space")))
        observability_space_ref01_data = None
        if len(observability_space_ref01_data_raw) > 0:
            observability_space_ref01_data = helpers.to_map(observability_space_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        observability_space_ref01_ent = client.ObservabilitySpace(None)
        observability_space_ref01_match = {}

        observability_space_ref01_list_result = observability_space_ref01_ent.list(observability_space_ref01_match, None)
        assert isinstance(observability_space_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        observability_space_ref01_match_dt0 = {
            "id": observability_space_ref01_data["id"],
        }
        observability_space_ref01_data_dt0_loaded = observability_space_ref01_ent.load(observability_space_ref01_match_dt0, None)
        observability_space_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(observability_space_ref01_data_dt0_loaded))
        assert observability_space_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(observability_space_ref01_data_dt0_load_result.get("id"), observability_space_ref01_data["id"])



def _observability_space_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/observability_space/ObservabilitySpaceTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ComposalSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["observability_space01", "observability_space02", "observability_space03"],
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
        "COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID": idmap,
        "COMPOSAL_TEST_LIVE": "FALSE",
        "COMPOSAL_TEST_EXPLAIN": "FALSE",
        "COMPOSAL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID"))
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
