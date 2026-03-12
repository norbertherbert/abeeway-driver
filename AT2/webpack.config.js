var path = require('path');
var webpack = require('webpack');

var devServer = {
  static: {
    directory: __dirname,
    publicPath: '/',
  },
};

var umdConfigSrc = {
  name: 'umd',
  context: __dirname,
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at2-drv-src.js',
    publicPath: '/dist/',
    library: 'driver',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  },
};

var umdConfig = {
  name: 'umd',
  context: __dirname,
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at2-drv.js',
    publicPath: '/dist/',
    library: 'driver',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
};

var esmConfig = {
  name: 'esm',
  context: __dirname,
  mode: 'production',
  entry: './src/index.esm.js',
  devServer: devServer,
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at2-drv.mjs',
    publicPath: '/dist/',
    module: true,
    library: {
      type: 'module',
    },
  },
  optimization: {
    minimize: true,
  },
};

var umdConfigChirpstack = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at2-drv-chirpstack.js',
    library: 'driver',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: ';var decodeUplink=driver.decodeUplink;var decodeDownlink=driver.decodeDownlink;var encodeDownlink=driver.encodeDownlink;',
      raw: true,
      footer: true,
    }),
  ],
  optimization: {
    minimize: true,
  }
};

module.exports = [umdConfigSrc, umdConfig, umdConfigChirpstack, esmConfig];
