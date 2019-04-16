const AD = require('../dist/abeeway-driver');

// Decode an uplink message
let b = Buffer.from('0781f98350020e000000030f00000001', 'hex');
console.log(AD.decodeUlMsg(b));

console.log();

// Decode an encoded downlink message
b = Buffer.from('0b50110000000a12000000001300000000', 'hex');
console.log(AD.decodeDlMsg(b));
