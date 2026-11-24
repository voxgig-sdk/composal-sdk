

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


describe('MergeResolutionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.MergeResolution()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MergeResolution().create({"base":1,"ours":"x","theirs":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'merge_resolution.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","r":true,"t":"`$STRING`","key$":"action","index$":0},"base":{"a":true,"h":"Base","n":"base","r":true,"sh":"Common ancestor file contents","t":"`$STRING`","key$":"base","index$":1},"content":{"a":true,"h":"Content","n":"content","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"content","index$":2},"context":{"a":true,"h":"Context","n":"context","r":false,"sh":"Optional surrounding files keyed by path","t":"`$OBJECT`","key$":"context","index$":3},"duration_ms":{"a":true,"h":"Duration Ms","n":"duration_ms","r":true,"t":"`$INTEGER`","key$":"duration_ms","index$":4},"fallback":{"a":true,"h":"Fallback","n":"fallback","r":true,"t":"`$BOOLEAN`","key$":"fallback","index$":5},"model":{"a":true,"h":"Model","n":"model","r":false,"t":"`$STRING`","key$":"model","index$":6},"ours":{"a":true,"h":"Ours","n":"ours","r":true,"sh":"Current / left file contents","t":"`$STRING`","key$":"ours","index$":7},"path":{"a":true,"h":"Path","n":"path","r":false,"sh":"Repository-relative path of the conflicted file","t":"`$STRING`","key$":"path","index$":8},"resolved":{"a":true,"h":"Resolved","n":"resolved","r":true,"t":"`$BOOLEAN`","key$":"resolved","index$":9},"theirs":{"a":true,"h":"Theirs","n":"theirs","r":true,"sh":"Incoming / right file contents","t":"`$STRING`","key$":"theirs","index$":10}},"name":"merge_resolution","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["base","context","ours","path","theirs"],"co":{"id":"POST /api/v1/merge_resolutions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/merge_resolutions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"merge_resolutions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"merge_resolution","name__orig":"merge_resolution","Name":"MergeResolution","name_":"merge_resolution","name-":"merge-resolution","NAME":"MERGE_RESOLUTION","index$":314}, {"active":true,"entity":"merge_resolution","key$":"BasicMergeResolutionFlow","kind":"basic","name":"BasicMergeResolutionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"merge_resolution_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'MergeResolution', {"POST /api/v1/merge_resolutions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["base","ours","theirs"],"additionalProperties":true,"properties":{"path":{"type":"string","description":"Repository-relative path of the conflicted file","key$":"path"},"base":{"type":"string","description":"Common ancestor file contents","key$":"base"},"ours":{"type":"string","description":"Current / left file contents","key$":"ours"},"theirs":{"type":"string","description":"Incoming / right file contents","key$":"theirs"},"context":{"type":"object","additionalProperties":{"type":"string"},"description":"Optional surrounding files keyed by path","key$":"context"}},"x-ref":"#/components/schemas/MergeResolutionInput"}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"merge_resolution.create.0":"GET-only live run: needs POST /api/v1/merge_resolutions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const merge_resolution_ref01_ent = client.MergeResolution()
    let merge_resolution_ref01_data = setup.data.new.merge_resolution['merge_resolution_ref01']

    merge_resolution_ref01_data = (await merge_resolution_ref01_ent.create(merge_resolution_ref01_data)).data()
    assert(null != merge_resolution_ref01_data)


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
      '../../../../.sdk/test/entity/merge_resolution/MergeResolutionTestData.json')

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
    ['merge_resolution01','merge_resolution02','merge_resolution03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MERGE_RESOLUTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MERGE_RESOLUTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MERGE_RESOLUTION_ENTID']
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
  
