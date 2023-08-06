const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  stats: 'errors-warnings',
  mode: "development",
  entry: "/src/index.js", // main js
  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: [/\.css$/i, /\.scss$/i],
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve("browserify-zlib"),
      https: require.resolve("https-browserify"),

      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url")
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // base html
    }),
    new NodePolyfillPlugin(),
  ],
};
