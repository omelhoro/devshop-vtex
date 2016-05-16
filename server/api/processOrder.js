import {errorHandler} from '../lib/utils';
const BP = require('bluebird');
const levelup = require('levelup');
const uuid = require('node-uuid');
const db = BP.promisifyAll(levelup(process.env.DB_PATH || './db'));
import {sendToken} from '../lib/emailService';

async function processOrderAsync(req, res) {
  const token = uuid.v1();
  await db.putAsync(token, JSON.stringify({...req.body.appState, token}));

  sendToken({to: req.body.email, token}, console.log);
  res.send({token});
}

async function getOrderAsync(req, res) {
  const value = await db.getAsync(req.query.token);
  res.send(JSON.parse(value || '{}'));
}

export const processOrder = (req, res) =>
  processOrderAsync(req, res)
  .catch(errorHandler.bind(res));

export const getOrder = (req, res) =>
  getOrderAsync(req, res)
  .catch(errorHandler.bind(res));
