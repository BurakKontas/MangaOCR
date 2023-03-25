"use strict";
exports.__esModule = true;
exports.weatherForecastUploadProxy = exports.weatherForecastProxy = void 0;
var http_proxy_middleware_1 = require("http-proxy-middleware");
var env = require("process").env;
var target = env.ASPNETCORE_HTTPS_PORT
    ? "https://localhost:".concat(env.ASPNETCORE_HTTPS_PORT)
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(";")[0]
        : "http://localhost:22994";
var weatherForecastProxy = (0, http_proxy_middleware_1.createProxyMiddleware)("/weatherforecast", {
    target: target,
    changeOrigin: true
});
exports.weatherForecastProxy = weatherForecastProxy;
var weatherForecastUploadProxy = (0, http_proxy_middleware_1.createProxyMiddleware)("/weatherforecast/upload", {
    target: target,
    changeOrigin: true,
    onProxyReq: function (proxyReq, req, res) {
        console.log(proxyReq, req, res);
        // if (req.method === "POST" && req.body) {
        //   const bodyData = JSON.stringify(req.body);
        //   // proxyReq.setHeader("Content-Type", "application/json");
        //   proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        //   proxyReq.write(bodyData);
        // }
    }
});
exports.weatherForecastUploadProxy = weatherForecastUploadProxy;
