const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../webpack.config').default;

import {getMembersOfOrg, getDeveloper} from './api/githubApi';
import {processOrder, getOrder} from './api/processOrder';

const isDeveloping = process.env.NODE_ENV !== 'production';

const app = express();

app.use(bodyParser.json());

app.get('/api/getmembers', getMembersOfOrg);
app.get('/api/getdev', getDeveloper);
app.post('/api/postorder', processOrder);
app.get('/api/getorder', getOrder);

if (isDeveloping) {
  /* eslint-disable global-require */
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
