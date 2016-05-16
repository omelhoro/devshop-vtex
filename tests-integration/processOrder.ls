require! '../server/api/processOrder'
assert = require('chai').assert

its = it

describe 'Order api', ->
  token = null
  appState =
    shoppinglist: [1, 2]
    shoppingcard: [4, 6, 6]

  its 'should receive an order and send a token back and retrieve the data', (done) ->
    req =
      body:
        email: 'fischerig@outlook.com'
        appState: appState
    processOrder.processOrder req,
      send: (data) ->
        assert data.token.length, 36
        token := data.token

        req =
          query:
            token: data.token

        processOrder.getOrder req,
        send: (data) ->
          assert data, appState
          done!
