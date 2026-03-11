var path = require('path');

var devServer = {
  static: {
    directory: __dirname,
    publicPath: '/',
  },
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
    minimize: false,
  }
};

var umdConfigMin = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    library: 'driver',
    filename: 'abw-at3-drv-min.js',
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
    minimize: false,
  }
};

var esmConfigMin = {
  mode: 'production',
  entry: './src/index.esm.js',
  devServer: devServer,
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'abw-at3-drv-min.mjs',
    module: true,
    library: {
      type: 'module',
    },
  },
  optimization: {
    minimize: true,
  }
};

module.exports = [umdConfig, umdConfigMin, esmConfig, esmConfigMin];
