const AD = require('../../dist/abeeway-driver');

let b, msg;

// Create a new "Request Device Configuration" message object from its components
msg = new AD.DlMsg_ReqConf ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.REQUEST_CONFIGURATION,
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

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_ReqConf(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
