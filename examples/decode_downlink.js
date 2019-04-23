const {createDPDU, E_DPDUType} = require('../dist/abeeway-driver');
// Replace the above line with the following one if you use the module from the public npm repository
// const abeewayDriver = require('abeeway-driver');

// DECODING A DOWNLINK MESSAGE

// This is an example downlink message
const downlinkPayloadHex = '0b50110000000a12000000001300000000';

// The argumet must be either a hex string or a Buffer object.
let pdu = createDPDU(downlinkPayloadHex);
console.log( 'The type of this PDU is: ' + E_DPDUType[pdu.header.type] );
console.log( pdu.toJSON() );
