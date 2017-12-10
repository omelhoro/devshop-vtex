import {mailgun as mailgunCreds} from '../../vault/secret/credentials';
import urlJoin from 'url-join';

const mailgun = require('mailgun-js')({apiKey: mailgunCreds.apiKey, domain: mailgunCreds.domain});

export function sendToken({to, token, host}, cb) {
  const url = urlJoin(host, 'shoppingcard', `?token=${token}`)
  console.log('using this url=', url);

  const text = `You can view your complete order by using this token:
    ${url}`;

  const data = {
    from: 'Your VTEX codechallenge <me@samples.mailgun.org>',
    to,
    subject: 'Token for shopping order',
    text,
  };

  mailgun.messages().send(data, cb);
}
