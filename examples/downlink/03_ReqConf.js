const {
    DPDU_ReqConf, 
    CPDU_DlHeaderShort, E_DPDUType, 
    E_ParameterId
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

// Create a new "Request Device Configuration" message object from its components
let msg = new DPDU_ReqConf ({
    header: new CPDU_DlHeaderShort({
        type:     E_DPDUType.REQUEST_CONFIGURATION,
        ackToken: 0x5,
        optData:  0x0,
    }),
    paramIDs: [ 
        // up to 20 requested parameters can be listed here
        E_ParameterId.GPS_CONVERGENCE, 
        E_ParameterId.GPS_TIMEOUT,
        E_ParameterId.BLE_VERSION,
        E_ParameterId.FIRMWARE_VERSION
    ], 
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new DPDU_ReqConf(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
