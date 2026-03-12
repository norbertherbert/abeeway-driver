var path = require('path');
var webpack = require('webpack');

var devServer = {
  static: {
    directory: __dirname,
    publicPath: '/',
  },
};

var umdConfigSrc = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    library: 'driver',
    filename: 'abw-at3-drv-src.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  }
};

var umdConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    library: 'driver',
    filename: 'abw-at3-drv.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  }
};

var esmConfig = {
  mode: 'production',
  entry: './src/index.esm.js',
  devServer: devServer,
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at3-drv.mjs',
    module: true,
    library: {
      type: 'module',
    },
  },
  optimization: {
    minimize: true,
  }
};

var umdConfigChirpstack = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at3-drv-chirpstack.js',
    library: 'driver',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: ';var decodeUplink=function(i){return driver.decodeUplink({bytes:i.bytes,fPort:i.fPort,recvTime:i.recvTime||new Date().toISOString()});};var decodeDownlink=function(i){return driver.decodeDownlink(i);};var encodeDownlink=function(i){return driver.encodeDownlink(i);};',
      raw: true,
      footer: true,
    }),
  ],
  optimization: {
    minimize: true,
  }
};

module.exports = [umdConfigSrc, umdConfig, esmConfig, umdConfigChirpstack];
