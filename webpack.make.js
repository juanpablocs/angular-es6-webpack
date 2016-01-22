'use strict';

var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var StylusNib     = require('nib');
var StylusRupture = require('rupture');


module.exports = function makeWebpackConfig (options) {

  var config = {};

  config.entry = {
    app: './src/app.js'
  }

  config.output = {
    path: __dirname + '/public',
    publicPath: options.prod ? '/' : 'http://localhost:8080/',
    filename: options.prod ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: options.prod ? '[name].[hash].js' : '[name].bundle.js'
  }

  config.devtool = options.prod ? 'source-map' : 'eval';

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders:
    [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { presets: ['es2015'] },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.styl$/,
        loader: !options.prod ? 'style-loader!css-loader!stylus-loader' : ExtractTextPlugin.extract("css-loader!stylus-loader")
      }
    ]
  };

  // Lib Stylus
  config.stylus = {
    use: [StylusNib(), StylusRupture()],
    import: ['~nib/index.styl']
  };

  // Plugins
  config.plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ];

  if (options.prod) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin('app.[hash].css', {allChunks: true}),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        prod: true
      })
    );
  }

  // Devserver
  config.devServer = {
    contentBase: './public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };

  return config;

};
