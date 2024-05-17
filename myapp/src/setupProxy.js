const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://my-application-1rau.onrender.com', // Replace with the URL of your backend server
      changeOrigin: true,
    })
  );
};
