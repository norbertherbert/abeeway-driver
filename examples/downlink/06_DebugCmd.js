const {
    DPDU_DebugCmd, 
    CPDU_DlHeaderShort, E_DPDUType, 
    E_DebugCmd, 
} = require('../../dist/abeeway-driver');


// Create a new "Set Debug Command" message object from its components
msg = new DPDU_DebugCmd ({
    header: new CPDU_DlHeaderShort({
        type:     E_DPDUType.DEBUG_COMMAND,
        ackToken: 0x5,
        optData:  0x0,
    }),
    debugCmd:     E_DebugCmd.RESET_DEVICE
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
let buffer = msg.toBuffer();

// Create a new message object from a Buffer
let msg1 = new DPDU_DebugCmd(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
