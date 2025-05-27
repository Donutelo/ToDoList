
// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: "./dist",
    port: 8080,
    host: "0.0.0.0",
    hot: true,
    allowedHosts: "all",
    watchFiles: ["./src/template.html"],
    client: {
      webSocketURL: "wss://ominous-acorn-xqwrj4v5vrgcv59p-8080.app.github.dev/ws"
    }
  },
});
