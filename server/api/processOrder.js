import {errorHandler} from '../lib/utils';
const BP = require('bluebird');
const levelup = require('levelup')
const uuid = require('node-uuid');
const db = levelup(process.env.DB_PATH || './db');
import {sendToken} from '../lib/emailService';

async function processOrderAsync(req, res) {
  const token = uuid.v1();
  // await BP.promisify(db.put)();
  db.put(token, JSON.stringify({...req.body.appState, token}), (err) => {
    console.log(err);
    if (err) {
      errorHandler.bind(res, err)();
      return;
    }

    sendToken({to: req.body.email, token}, (err, body) => console.log(err, body));
    res.send({token});
  });
}

async function getOrderAsync(req, res) {
  // const value = await BP.promisify(db.get)(req.query.token);
  db.get(req.query.token, (err, value) => {
    res.send(JSON.parse(value));
  });
}

export const processOrder = (req, res) =>
  processOrderAsync(req, res)
  .catch(errorHandler.bind(res));

export const getOrder = (req, res) =>
  getOrderAsync(req, res)
  .catch(errorHandler.bind(res));
