const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

// Create a new "Request Device Configuration" message object from its components
let msg = new AD.DPDU_ReqConf ({
    header: new AD.CPDU_DlHeaderShort({
        type:     AD.E_DPDUType.REQUEST_CONFIGURATION,
        ackToken: 0x5,
        optData:  0x0,
    }),
    paramIDs: [ 
        // up to 20 requested parameters can be listed here
        AD.E_ParameterId.GPS_CONVERGENCE, 
        AD.E_ParameterId.GPS_TIMEOUT
    ], 
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new AD.DPDU_ReqConf(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
