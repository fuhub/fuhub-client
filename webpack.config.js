'use strict'; // eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const component = require('./package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';
const defines = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV),
  },
});

const config = {
  devtool: 'source-map', // always build source map
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'build'),
    filename: `${component.name}.js`,
    publicPath: '/build/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    defines,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
};

if (NODE_ENV === 'production') {
  const minified = process.env.MINIFIED === '1';
  let withoutJs = component.name;
  withoutJs = withoutJs.replace('.js', '');
  const filename = minified ? `${withoutJs}.min.js` : `${withoutJs}.js`;
  const uglifyOptions = {
    sourceMap: true,
    compressor: {
      warnings: false,
      dead_code: true,
    },
    output: {
      // preamble: banner,
      comments: false,
    },
  };
  if (!minified) {
    uglifyOptions.beautify = true;
    uglifyOptions.mangle = false;
    uglifyOptions.output.comments = 'all';
  }
  config.entry = './src/index';
  config.output = {
    devtoolLineToLine: true,
    sourceMapFilename: `${filename}.map`,
    path: path.join(__dirname, 'dist'),
    filename,
    libraryTarget: 'umd',
  };
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    defines,
    new webpack.optimize.UglifyJsPlugin(uglifyOptions),
  ];
}

module.exports = config;
