

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ComposalSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CiNodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CiNode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CiNode().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ci_node.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"architecture":{"a":true,"h":"Architecture","n":"architecture","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"architecture","index$":0},"bazel_enabled":{"a":true,"h":"Bazel Enabled","n":"bazel_enabled","r":true,"t":"`$BOOLEAN`","key$":"bazel_enabled","index$":1},"bazel_properties_json":{"a":true,"h":"Bazel Properties Json","n":"bazel_properties_json","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"bazel_properties_json","index$":2},"ci_runner_pool_id":{"a":true,"h":"Ci Runner Pool Id","n":"ci_runner_pool_id","r":true,"t":"`$STRING`","key$":"ci_runner_pool_id","index$":3},"cordoned_at":{"a":true,"fo":"date-time","h":"Cordoned At","n":"cordoned_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cordoned_at","index$":4},"cordoned_at_label":{"a":true,"h":"Cordoned At Label","n":"cordoned_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cordoned_at_label","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":7},"health_state":{"a":true,"h":"Health State","n":"health_state","r":true,"t":"`$STRING`","key$":"health_state","index$":8},"heartbeat_age_seconds":{"a":true,"h":"Heartbeat Age Seconds","n":"heartbeat_age_seconds","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"heartbeat_age_seconds","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":10},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":11},"labels_csv":{"a":true,"h":"Labels Csv","n":"labels_csv","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"labels_csv","index$":12},"last_seen_at":{"a":true,"fo":"date-time","h":"Last Seen At","n":"last_seen_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_seen_at","index$":13},"last_seen_at_label":{"a":true,"h":"Last Seen At Label","n":"last_seen_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_seen_at_label","index$":14},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":15},"network_peer_id":{"a":true,"h":"Network Peer Id","n":"network_peer_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"network_peer_id","index$":16},"node_capabilities_csv":{"a":true,"h":"Node Capabilities Csv","n":"node_capabilities_csv","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_capabilities_csv","index$":17},"node_certificate_expires_at":{"a":true,"fo":"date-time","h":"Node Certificate Expires At","n":"node_certificate_expires_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_certificate_expires_at","index$":18},"node_certificate_expires_at_label":{"a":true,"h":"Node Certificate Expires At Label","n":"node_certificate_expires_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_certificate_expires_at_label","index$":19},"node_certificate_fingerprint_sha256":{"a":true,"h":"Node Certificate Fingerprint Sha256","n":"node_certificate_fingerprint_sha256","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_certificate_fingerprint_sha256","index$":20},"node_certificate_serial":{"a":true,"h":"Node Certificate Serial","n":"node_certificate_serial","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_certificate_serial","index$":21},"offline_at":{"a":true,"fo":"date-time","h":"Offline At","n":"offline_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"offline_at","index$":22},"offline_at_label":{"a":true,"h":"Offline At Label","n":"offline_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"offline_at_label","index$":23},"online_at":{"a":true,"fo":"date-time","h":"Online At","n":"online_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"online_at","index$":24},"online_at_label":{"a":true,"h":"Online At Label","n":"online_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"online_at_label","index$":25},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":26},"os":{"a":true,"h":"Os","n":"os","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"os","index$":27},"revoked_at":{"a":true,"fo":"date-time","h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":28},"revoked_at_label":{"a":true,"h":"Revoked At Label","n":"revoked_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at_label","index$":29},"schedulable":{"a":true,"h":"Schedulable","n":"schedulable","r":true,"t":"`$BOOLEAN`","key$":"schedulable","index$":30},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":31},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":32},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":33},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":34},"version":{"a":true,"h":"Version","n":"version","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"version","index$":35}},"id":{"field":"id","name":"id"},"name":"ci_node","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/cordon","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/cordon","q":{"$action":"cordon","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"id"},{"lit":"cordon"}],"t":{"req":"`reqdata`","res":"`body.runner`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/drain","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/drain","q":{"$action":"drain","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"id"},{"lit":"drain"}],"t":{"req":"`reqdata`","res":"`body.runner`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/heartbeat","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/heartbeat","q":{"$action":"heartbeat","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"id"},{"lit":"heartbeat"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/uncordon","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/uncordon","q":{"$action":"uncordon","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"id"},{"lit":"uncordon"}],"t":{"req":"`reqdata`","res":"`body.runner`"},"index$":3},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/enroll","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/ci/nodes/enroll","q":{"$action":"enroll"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"lit":"enroll"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/nodes/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/ci/nodes/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.runner`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ci_node","name__orig":"ci_node","Name":"CiNode","name_":"ci_node","name-":"ci-node","NAME":"CI_NODE","index$":168}, {"active":true,"entity":"ci_node","key$":"BasicCiNodeFlow","kind":"basic","name":"BasicCiNodeFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"ci_node_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"ci_node_ref01","srcdatavar":"ci_node_ref01_data","suffix":"_dt0"},"m":{"id":"ci_node01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ci_node_ref01"}}],"index$":0,"route":"GET /api/v1/ci/nodes/{id}","record":{}}]}, 'CiNode', {"POST /api/v1/ci/nodes/{id}/cordon":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/ci/nodes/{id}/drain":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/ci/nodes/{id}/heartbeat":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/ci/nodes/{id}/uncordon":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/ci/nodes/enroll":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/ci/nodes/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"ci_node.create.0":"GET-only live run: needs POST /api/v1/ci/nodes/{id}/cordon","ci_node.load.1":"GET-only live run: reads a record only ci_node.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ci_node_ref01_data = Object.values(setup.data.existing.ci_node)[0] as any

    // LOAD
    const ci_node_ref01_ent = client.CiNode()
    const ci_node_ref01_match_dt0: any = {}
    ci_node_ref01_match_dt0.id = ci_node_ref01_data.id
    const ci_node_ref01_data_dt0 = (await ci_node_ref01_ent.load(ci_node_ref01_match_dt0)).data()
    assert(ci_node_ref01_data_dt0.id === ci_node_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ci_node/CiNodeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ComposalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ci_node01','ci_node02','ci_node03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CI_NODE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CI_NODE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CI_NODE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ComposalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.COMPOSAL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.COMPOSAL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
