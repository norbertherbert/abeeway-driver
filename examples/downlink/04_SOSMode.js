const AD = require('../../dist/abeeway-driver');

let b, msg;

// Create a new "SOS Mode START/STOP" message object from its components
msg = new AD.DlMsg_SOSMode ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.START_SOS_MODE, // or STOP_SOS_MODE
        ackToken: 0x5,
        optData:  0x0,
    }),
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SOSMode(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
