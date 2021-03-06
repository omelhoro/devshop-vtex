import _debug from 'debug';
import config from '../config';
import server from '../server/main';

const debug = _debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  debug(`Server is now running at http://${host}:${port}.`);
});
