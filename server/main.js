/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const config = require('../build/webpack.config').default;
const bodyParser = require('body-parser');

import {getMembersOfOrg, getDeveloper} from './lib/githubApi';
import {processOrder, getOrder} from './lib/processOrder';

const isDeveloping = process.env.NODE_ENV !== 'production';

const app = express();

app.use(bodyParser.json())

app.get('/getmembers', getMembersOfOrg);
app.get('/getdev', getDeveloper);
app.post('/postorder', processOrder);
app.get('/getorder', getOrder);

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

export default app;
