const {
    DPDU_SetMode, 
    CPDU_DlHeaderShort, E_DPDUType, 
    E_OperatingMode
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

// Create a new "Set Operating Mode" message object from its components
let msg = new DPDU_SetMode ({
    header: new CPDU_DlHeaderShort({
        type:     E_DPDUType.SET_MODE,
        ackToken: 0x5,
        optData:  0x0,
    }),
    mode:         E_OperatingMode.MOTION_TRACKING, 
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new DPDU_SetMode(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
