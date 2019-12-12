const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      title: 'Vue',
      template: './src/index.html'
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
    }
  },
}
