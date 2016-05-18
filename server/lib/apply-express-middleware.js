// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default function applyExpressMiddleware(fn, req, res) {
  const originalEnd = res.end;

  /* eslint-disable no-param-reassign */
  return new Promise((resolve) => {
    res.end = (...args) => {
      originalEnd.apply(this, args);
      resolve(false);
    };
    fn(req, res, () => {
      resolve(true);
    });
  });
}
