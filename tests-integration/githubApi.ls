require! '../server/api/githubApi'
assert = require('chai').assert

its = it
describe 'Servers ', ->

  its 'should get a user from gihub', (done) ->
    this.timeout(5000);
    req =
      query:
        dev: 'omelhoro'
    githubApi.getDeveloper req,
      send: (data) ->
        assert req.query.dev, data.login
        done!
    return

  its 'should get memebers of org', (done) ->
    this.timeout(5000);
    req =
      query:
        org: 'Homebrew'

    githubApi.getMembersOfOrg req,
      send: (data) ->
        assert true, !data.length
        done!
    return
