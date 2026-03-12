var path = require('path');
var webpack = require('webpack');

module.exports = {
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
