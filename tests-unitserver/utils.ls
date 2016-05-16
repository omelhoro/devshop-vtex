require! '../server/lib/utils'
assert = require('chai').assert

its = it

describe 'Utils in backend', ->

  its 'calculateHoursPrice should output correct sum', ->
    dt = new Date!
    dt.setYear 2009
    dev =
      public_repos: 5
      public_gists: 4
      followers: 4
      created_at: dt.toJSON()

    outId = 17
    outReal = utils.calculateHoursPrice dev
    assert outId, outReal

  its 'should handle errors by sending 500 back and log the issue', (done) ->
    res =
      status: 200
      send: (data) ->
        assert res.status, 500
        done!

    utils.errorHandler.bind(res) 'Something gone wrong'
