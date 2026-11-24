
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ComposalSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ComposalSDK.test()
    equal(testsdk instanceof ComposalSDK, true,
      'ComposalSDK.test() must return a client synchronously')
  })

})
