import {errorHandler} from './utils';
import {mailgun as mailgunCreds} from '../../vault/credentials';


const mailgun = require('mailgun-js')({apiKey: mailgunCreds.apiKey, domain: mailgunCreds.domain});

export function sendToken({to, token}, cb) {
  const text = `You can view your complete order by using this token:
    https://devshop-vtex.igor-fischer.rocks/shoppingcard?token=${token}`;

  const data = {
    from: 'Your VTEX codechallenge <me@samples.mailgun.org>',
    to,
    subject: 'Token for shopping order',
    text,
  };

  mailgun.messages().send(data, cb);
}

// export const sendToken = (req, res) => sendTokenAsync(req, res).catch(errorHandler.bind(res));
