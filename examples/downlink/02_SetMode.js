const AD = require('../../dist/abeeway-driver');

let b, msg;

// Create a new "Set Operating Mode" message object from its components
msg = new AD.DlMsg_SetMode ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.SET_MODE,
        ackToken: 0x5,
        optData:  0x0,
    }),
    mode:         AD.E_OperatingMode.MOTION_TRACKING, 
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SetMode(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
