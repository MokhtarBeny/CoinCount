const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/fr/actualites/feed',
    createProxyMiddleware({
      target: 'https://coinjournal.net',
      changeOrigin: true,
    })
  );
};
