const BP = require('bluebird');

import {errorHandler, calculateHoursPrice} from '../lib/utils';
import {github as githubCreds} from '../../vault/secret/credentials';

const GitHubApi = require('github');

const github = new GitHubApi({
  // required
  version: '3.0.0',
  // optional
  // debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  // pathPrefix: '/api/v3', // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    'user-agent': 'My-Cool-GitHub-App', // GitHub is happy with a unique user agent
  },
});

github.authenticate({
  type: 'oauth',
  token: githubCreds.token,
});

async function getSingleUser({login}) {
  const out = await BP.promisify(github.users.getForUser)({username: login});
  const user = out.data;
  return {...user, appAdded: {price: calculateHoursPrice(user), orderedHours: 0}};
}

async function getMembersOfOrgAsync(req, res) {
  if (!req.query.org) {
    errorHandler.call(res, 'Empty organisation requested');
    return;
  }

  const out = await BP.promisify(github.orgs.getMembers)({org: req.query.org});
  const enrichedData = await Promise.all(out.data.map(getSingleUser));
  res.send(enrichedData);
}

async function getDeveloperAsync(req, res) {
  const out = await getSingleUser({login: req.query.dev});
  res.send(out);
}

export const getMembersOfOrg = (req, res) => getMembersOfOrgAsync(req, res).catch(errorHandler.bind(res));
export const getDeveloper = (req, res) => getDeveloperAsync(req, res).catch(errorHandler.bind(res));
