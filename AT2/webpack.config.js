var path = require('path');

var devServer = {
  static: {
    directory: __dirname,
    publicPath: '/',
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
    minimize: false,
  },
};

var umdConfigMin = {
  name: 'umd',
  context: __dirname,
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at2-drv-min.js',
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
    minimize: false,
  },
};

var esmConfigMin = {
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
    filename: 'abw-at2-drv-min.mjs',
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

module.exports = [umdConfig, umdConfigMin, esmConfig, esmConfigMin];
