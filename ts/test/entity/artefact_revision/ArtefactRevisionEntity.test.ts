

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


describe('ArtefactRevisionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ArtefactRevision()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ArtefactRevision().create({"artefact_id":1,"organization_id":"x","base_version":1,"content":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'artefact_revision.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_version":{"a":true,"h":"Base Version","n":"base_version","r":true,"sh":"The newest version the editor started from.","t":"`$INTEGER`","key$":"base_version","index$":0},"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"Markdown, including CriticMarkup suggestions and comment anchors.","t":"`$STRING`","key$":"content","index$":1}},"name":"artefact_revision","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["base_version","content"],"co":{"id":"POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"artefact_id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions","q":{"exist":["artefact_id","organization_id"]},"r":{"param":{"artefact_ref":"artefact_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"artefact_id"},{"lit":"revisions"}],"t":{"req":"`reqdata`","res":"`body.artefact`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.artefact"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"artefact_revision","name__orig":"artefact_revision","Name":"ArtefactRevision","name_":"artefact_revision","name-":"artefact-revision","NAME":"ARTEFACT_REVISION","index$":99}, {"active":true,"entity":"artefact_revision","key$":"BasicArtefactRevisionFlow","kind":"basic","name":"BasicArtefactRevisionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"artefact_revision_ref01"},"m":{"artefact_id":"artefact01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ArtefactRevision', {"POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["content","base_version"],"properties":{"content":{"type":"string","description":"Markdown, including CriticMarkup suggestions and comment anchors.","key$":"content"},"base_version":{"type":"integer","minimum":1,"description":"The newest version the editor started from.","key$":"base_version"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"artefact_revision.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/revisions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const artefact_revision_ref01_ent = client.ArtefactRevision()
    let artefact_revision_ref01_data = setup.data.new.artefact_revision['artefact_revision_ref01']
    artefact_revision_ref01_data['artefact_id'] = setup.idmap['artefact01']
    artefact_revision_ref01_data['organization_id'] = setup.idmap['organization01']

    artefact_revision_ref01_data = (await artefact_revision_ref01_ent.create(artefact_revision_ref01_data)).data()
    assert(null != artefact_revision_ref01_data)


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
      '../../../../.sdk/test/entity/artefact_revision/ArtefactRevisionTestData.json')

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
    ['artefact_revision01','artefact_revision02','artefact_revision03','organization01','organization02','organization03','artefact01','artefact02','artefact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ARTEFACT_REVISION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ARTEFACT_REVISION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ARTEFACT_REVISION_ENTID']
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
  
