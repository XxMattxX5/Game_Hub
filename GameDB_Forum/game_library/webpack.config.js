const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./static/game_library/js"),

    filename: "[name].js",
    clean: true,
  },
  devServer: {
    host: "0.0.0.0",
    hot: true,
    client: {
      webSocketURL: {
        port: 443,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
    }),
  ],
};
