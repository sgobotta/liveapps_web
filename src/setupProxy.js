const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    "/maps-proxy",
    createProxyMiddleware({
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: { "^/maps-proxy": "" },
    }),
  );
};
