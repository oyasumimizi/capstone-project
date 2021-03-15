var cors = require('cors');

const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(cors());
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};