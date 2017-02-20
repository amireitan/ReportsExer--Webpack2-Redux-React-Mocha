var nodeExternals = require('webpack-node-externals');
var dom           = require('./tools/dom.js');
 
module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  devtool: "cheap-module-source-map", // faster than 'source-map'
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
};