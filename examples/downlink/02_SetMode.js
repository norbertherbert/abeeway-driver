const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

// Create a new "Set Operating Mode" message object from its components
let msg = new AD.DPDU_SetMode ({
    header: new AD.CPDU_DlHeaderShort({
        type:     AD.E_DPDUType.SET_MODE,
        ackToken: 0x5,
        optData:  0x0,
    }),
    mode:         AD.E_OperatingMode.MOTION_TRACKING, 
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new AD.DPDU_SetMode(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
