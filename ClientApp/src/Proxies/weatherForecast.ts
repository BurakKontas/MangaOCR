import { RequestHandler } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:22994";

const weatherForecastProxy: RequestHandler = createProxyMiddleware(
  "/weatherforecast",
  {
    target,
    changeOrigin: true,
  }
);

const weatherForecastUploadProxy: RequestHandler = createProxyMiddleware(
  "/weatherforecast/upload",
  {
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log(proxyReq, req, res);
      // if (req.method === "POST" && req.body) {
      //   const bodyData = JSON.stringify(req.body);
      //   // proxyReq.setHeader("Content-Type", "application/json");
      //   proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      //   proxyReq.write(bodyData);
      // }
    },
  }
);

export { weatherForecastProxy, weatherForecastUploadProxy };
