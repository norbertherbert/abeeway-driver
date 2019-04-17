const AD = require('../../dist/abeeway-driver');

let b, msg;

// Create a new "Set Debug Command" message object from its components
msg = new AD.DlMsg_DebugCmd ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.DEBUG_COMMAND,
        ackToken: 0x5,
        optData:  0x0,
    }),
    debugCmd:     AD.E_DebugCmd.RESET_DEVICE
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_DebugCmd(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
