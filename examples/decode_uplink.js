const {createUPDU, E_UPDUType} = require('../dist/abeeway-driver');
// Replace the above line with the following one if you use the module from the public npm repository
// const abeewayDriver = require('abeeway-driver');

// DECODING AN UPLINK MESSAGE

// This is an example uplink message
const uplinkPayloadHex = '0781f98350020e000000030f00000001';

// The argumet must be either a hex string or a Buffer object.
let pdu = createUPDU(uplinkPayloadHex);
console.log( 'The type of this PDU is: ' + E_UPDUType[pdu.header.type] );
console.log( pdu.toJSON() );
