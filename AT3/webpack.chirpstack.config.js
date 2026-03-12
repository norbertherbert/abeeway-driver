var path = require('path');
var webpack = require('webpack');

module.exports = {
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
