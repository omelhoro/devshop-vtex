const BP = require('bluebird');
import {errorHandler} from './utils';
import {github as githubCreds} from '../../vault/credentials';
const GitHubApi = require('github');
const github = new GitHubApi({
  // required
  version: '3.0.0',
  // optional
  debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  // pathPrefix: '/api/v3', // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    'user-agent': 'My-Cool-GitHub-App', // GitHub is happy with a unique user agent
  },
});

github.authenticate({
  type: 'basic',
  username: githubCreds.username,
  password: githubCreds.password,
});

function calculateHours(e) {
  const years = (new Date().getUTCFullYear() - new Date(e.created_at).getUTCFullYear()) * 2;
  const publicRepos = (e.public_repos / 5);
  const publicGists = (e.public_gists / 4);
  const followers = (e.followers / 4);
  return Math.floor(years + publicRepos + publicGists + followers);
}

async function getSingleUser(user) {
  const out = await BP.promisify(github.user.getFrom)({user: user.login});
  return {...out, appAdded: {price: calculateHours(out), orderedHours: 0}};
}

async function getMembersOfOrgAsync(req, res) {
  if (!req.query.org) {
    errorHandler.call(res, 'Empty organisation requested');
    return;
  }

  const out = await BP.promisify(github.orgs.getMembers)({org: req.query.org});
  const enrichedData = await Promise.all(out.map(getSingleUser));
  res.send(enrichedData);
}

async function getDeveloperAsync(req, res) {
  const out = await getSingleUser({login: req.query.dev});
  res.send(out);
}

export const getMembersOfOrg = (req, res) => getMembersOfOrgAsync(req, res).catch(errorHandler.bind(res));
export const getDeveloper = (req, res) => getDeveloperAsync(req, res).catch(errorHandler.bind(res));
