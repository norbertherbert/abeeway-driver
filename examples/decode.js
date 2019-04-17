const abeewayDriver = require('../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const abeewayDriver = require('abeeway-driver');

let buffer, decoded;

// Decode an uplink message
const uplinkPayloadHex = '0781f98350020e000000030f00000001';

buffer = Buffer.from(uplinkPayloadHex, 'hex');
decoded = abeewayDriver.decodeUlMsg(buffer);
console.log( JSON.stringify(decoded, null, 4) );

console.log();

// Decode an encoded downlink message
const downlinkPayloadHex = '0b50110000000a12000000001300000000';
buffer = Buffer.from(downlinkPayloadHex, 'hex');
decoded = abeewayDriver.decodeDlMsg(buffer);
console.log( JSON.stringify(decoded, null, 4) );
