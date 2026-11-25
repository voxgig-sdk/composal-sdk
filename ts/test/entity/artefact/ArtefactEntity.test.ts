

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


describe('ArtefactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Artefact()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Artefact().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'artefact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"automation_invocation_id":{"a":true,"h":"Automation Invocation Id","n":"automation_invocation_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"automation_invocation_id","index$":0},"byte_size":{"a":true,"h":"Byte Size","n":"byte_size","r":true,"t":"`$INTEGER`","key$":"byte_size","index$":1},"checksum_sha256":{"a":true,"h":"Checksum Sha256","n":"checksum_sha256","r":true,"t":"`$STRING`","key$":"checksum_sha256","index$":2},"content_type":{"a":true,"h":"Content Type","n":"content_type","r":true,"t":"`$STRING`","key$":"content_type","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":4},"created_by_user_id":{"a":true,"h":"Created By User Id","n":"created_by_user_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_by_user_id","index$":5},"description":{"a":true,"h":"Description","n":"description","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":6},"document_key":{"a":true,"h":"Document Key","n":"document_key","r":false,"sh":"Stable document identity shared by all revisions.","t":"`$STRING`","key$":"document_key","index$":7},"entrypoint":{"a":true,"h":"Entrypoint","n":"entrypoint","r":false,"t":"`$STRING`","key$":"entrypoint","index$":8},"expires_at":{"a":true,"h":"Expires At","n":"expires_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expires_at","index$":9},"filename":{"a":true,"h":"Filename","n":"filename","r":true,"t":"`$STRING`","key$":"filename","index$":10},"files":{"a":true,"h":"Files","n":"files","r":false,"t":"`$ARRAY`","key$":"files","index$":11},"harness":{"a":true,"h":"Harness","n":"harness","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"harness","index$":12},"harness_version":{"a":true,"h":"Harness Version","n":"harness_version","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"harness_version","index$":13},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":14},"kind":{"a":true,"h":"Kind","n":"kind","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"kind","index$":15},"model":{"a":true,"h":"Model","n":"model","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model","index$":16},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":17},"published_at":{"a":true,"h":"Published At","n":"published_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"published_at","index$":18},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":19},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":20},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":21},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":22},"title":{"a":true,"h":"Title","n":"title","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"title","index$":23},"vcs_agent_checkpoint_id":{"a":true,"h":"Vcs Agent Checkpoint Id","n":"vcs_agent_checkpoint_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"vcs_agent_checkpoint_id","index$":24},"vcs_agent_session_id":{"a":true,"h":"Vcs Agent Session Id","n":"vcs_agent_session_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"vcs_agent_session_id","index$":25},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":26},"view_url":{"a":true,"fo":"uri","h":"View Url","n":"view_url","r":true,"t":"`$STRING`","key$":"view_url","index$":27},"web_url":{"a":true,"fo":"uri","h":"Web Url","n":"web_url","r":true,"t":"`$STRING`","key$":"web_url","index$":28}},"id":{"field":"id","name":"id"},"name":"artefact","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/artefacts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/artefacts","q":{"exist":["organization_id"]},"r":{},"rb":{"alternatives":[{"fields":[{"name":"description"},{"name":"entrypoint"},{"binary":true,"name":"file"},{"binary":true,"list":true,"name":"files"},{"name":"harness"},{"name":"harness_version"},{"name":"kind"},{"name":"metadata_json"},{"name":"model"},{"name":"paths"},{"name":"repository_id"},{"name":"slug"},{"name":"source"},{"name":"title"},{"name":"vcs_agent_checkpoint_id"},{"name":"vcs_agent_session_id"}],"kind":"multipart","media":"multipart/form-data"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"author","or":"author","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"created_by_agent","or":"created_by_agent","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"editable","or":"editable","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"harness","or":"harness","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"kind","or":"kind","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"ex":100,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":6},{"a":true,"explode":true,"k":"query","n":"model","or":"model","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"repo","or":"repo","r":false,"style":"form","t":"`$STRING`","index$":9},{"a":true,"explode":true,"k":"query","n":"slug","or":"slug","r":false,"style":"form","t":"`$STRING`","index$":10},{"a":true,"explode":true,"k":"query","n":"source","or":"source","r":false,"style":"form","t":"`$STRING`","index$":11}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"}],"t":{"page":{"next":"`body.pagination.next`"},"req":"`reqdata`","res":"`body.artefacts`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","q":{"exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.artefact`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/download","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"path","or":"path","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/download","q":{"$action":"download","exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"application/octet-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"},{"lit":"download"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["description","kind","title"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","q":{"exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.artefact`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","q":{"exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","q":{"exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["content","revision"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/draft","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/draft","q":{"$action":"draft","exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"},{"lit":"draft"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"artefact","name__orig":"artefact","Name":"Artefact","name_":"artefact","name-":"artefact","NAME":"ARTEFACT","index$":97}, {"active":true,"entity":"artefact","key$":"BasicArtefactFlow","kind":"basic","name":"BasicArtefactFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"artefact_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"artefact_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"artefact_ref01","srcdatavar":"artefact_ref01_data","suffix":"_up0","textfield":"automation_invocation_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-artefact_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"artefact_ref01","srcdatavar":"artefact_ref01_data","suffix":"_dt0"},"m":{"id":"artefact01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-artefact_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","record":{"organization_id":"organization_id"}},{"a":true,"d":{},"i":{"ref":"artefact_ref01","suffix":"_rm0"},"m":{"id":"artefact01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"artefact_ref01"}}],"index$":5}]}, 'Artefact', {"POST /api/v1/organizations/{organization_id}/artefacts":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}},"multipart/form-data":{"schema":{"type":"object","oneOf":[{"required":["file"]},{"required":["files","paths","entrypoint"]}],"properties":{"files":{"type":"array","maxItems":200,"items":{"type":"string","format":"binary"}},"paths":{"type":"string","description":"JSON array of relative paths corresponding to files."},"entrypoint":{"type":"string","description":"Relative path opened by the viewer."},"title":{"type":"string"},"slug":{"type":"string"},"description":{"type":"string"},"kind":{"type":"string"},"source":{"type":"string","enum":["agent","user"]},"harness":{"type":"string"},"harness_version":{"type":"string"},"model":{"type":"string"},"repository_id":{"type":"string","description":"Repository public ID or slug within the publishing organization."},"vcs_agent_session_id":{"type":"string"},"vcs_agent_checkpoint_id":{"type":"string"},"metadata_json":{"type":"object","description":"Allowlisted VcsAgentMetadata provenance; unknown fields are discarded.","additionalProperties":true},"file":{"type":"string","format":"binary"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/artefacts":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100,"default":100},"index$":1},{"name":"cursor","in":"query","schema":{"type":"string"},"description":"Opaque next cursor from the preceding page with the same filters.","index$":2},{"name":"q","in":"query","schema":{"type":"string","maxLength":200},"description":null,"filename or slug.":null,"index$":3},{"name":"source","in":"query","schema":{"type":"string","enum":["automation","agent","user"]},"index$":4},{"name":"kind","in":"query","schema":{"type":"string","maxLength":200},"index$":5},{"name":"harness","in":"query","schema":{"type":"string","maxLength":200},"index$":6},{"name":"model","in":"query","schema":{"type":"string","maxLength":200},"index$":7},{"name":"author","in":"query","schema":{"type":"string","maxLength":200},"description":"Publisher public ID, email, or unambiguous name.","index$":8},{"name":"repo","in":"query","schema":{"type":"string","maxLength":200},"description":"Repository slug or public ID within the organization.","index$":9},{"name":"slug","in":"query","schema":{"type":"string","maxLength":200},"description":"List available versions of one artefact slug.","index$":10},{"name":"created_by_agent","in":"query","schema":{"type":"string","maxLength":200},"description":"Only documents originally created by this persistent agent public ID. Unattributed legacy documents are excluded; later edits do not change the creator.","index$":11},{"name":"editable","in":"query","schema":{"type":"string","enum":["true"]},"description":"Only the newest version of each Markdown document","for editing.":null,"index$":12}]},"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/download":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"path","in":"query","schema":{"type":"string"},"description":"Exact file path within the selected revision manifest.","index$":2}]},"PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"title":{"type":"string","key$":"title"},"description":{"type":"string","key$":"description"},"kind":{"type":"string","key$":"kind"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/draft":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["content","revision"],"properties":{"content":{"type":"string","description":"Markdown, including CriticMarkup suggestions and comment anchors."},"revision":{"type":"integer","minimum":0,"description":"The working-copy revision the editor last saw."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"artefact.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts","artefact.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","artefact.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}","artefact.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const artefact_ref01_ent = client.Artefact()
    let artefact_ref01_data = setup.data.new.artefact['artefact_ref01']
    artefact_ref01_data['organization_id'] = setup.idmap['organization01']

    artefact_ref01_data = (await artefact_ref01_ent.create(artefact_ref01_data)).data()
    assert(null != artefact_ref01_data.id)


    // LIST
    const artefact_ref01_match: any = {}
    artefact_ref01_match['organization_id'] = setup.idmap['organization01']

    const artefact_ref01_list = (await artefact_ref01_ent.list(artefact_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(artefact_ref01_list, { id: artefact_ref01_data.id })))


    // UPDATE
    const artefact_ref01_data_up0: any = {}
    artefact_ref01_data_up0.id = artefact_ref01_data.id
    artefact_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const artefact_ref01_markdef_up0 = { name: 'automation_invocation_id', value: 'Mark01-artefact_ref01_' + setup.now }
    ;(artefact_ref01_data_up0 as any)[artefact_ref01_markdef_up0.name] = artefact_ref01_markdef_up0.value

    const artefact_ref01_resdata_up0 = (await artefact_ref01_ent.update(artefact_ref01_data_up0)).data()
    assert(artefact_ref01_resdata_up0.id === artefact_ref01_data_up0.id)

    assert((artefact_ref01_resdata_up0 as any)[artefact_ref01_markdef_up0.name] === artefact_ref01_markdef_up0.value)


    // LOAD
    const artefact_ref01_match_dt0: any = {}
    artefact_ref01_match_dt0.id = artefact_ref01_data.id
    artefact_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof artefact_ref01_data['organization_id']) ?
      artefact_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const artefact_ref01_data_dt0 = (await artefact_ref01_ent.load(artefact_ref01_match_dt0)).data()
    assert(artefact_ref01_data_dt0.id === artefact_ref01_data.id)


    // REMOVE
    const artefact_ref01_match_rm0: any = { id: artefact_ref01_data.id }
    artefact_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await artefact_ref01_ent.remove(artefact_ref01_match_rm0)
  

    // LIST
    const artefact_ref01_match_rt0: any = {}
    artefact_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const artefact_ref01_list_rt0 = (await artefact_ref01_ent.list(artefact_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(artefact_ref01_list_rt0, { id: artefact_ref01_data.id })))


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
      '../../../../.sdk/test/entity/artefact/ArtefactTestData.json')

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
    ['artefact01','artefact02','artefact03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ARTEFACT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ARTEFACT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ARTEFACT_ENTID']
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
  
