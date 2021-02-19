const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: "./client/index.jsx",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },

  output: {
    filename: "[name].[contenthash:5].js",
    path: path.resolve(__dirname, "build"),
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 0,
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]",
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash:5].[ext]",
        },
      },

      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "test",
      template: "./client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:5].css",
    }),
  ],
};
