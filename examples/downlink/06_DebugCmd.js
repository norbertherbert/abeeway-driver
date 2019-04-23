const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

// Create a new "Set Debug Command" message object from its components
msg = new AD.DPDU_DebugCmd ({
    header: new AD.CPDU_DlHeaderShort({
        type:     AD.E_DPDUType.DEBUG_COMMAND,
        ackToken: 0x5,
        optData:  0x0,
    }),
    debugCmd:     AD.E_DebugCmd.RESET_DEVICE
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new AD.DPDU_DebugCmd(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
