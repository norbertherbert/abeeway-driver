const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b, msg;

// Create a new "Position On Demand" message object from its components
msg = new AD.DlMsg_PosOnDem ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.POSITION_ON_DEMAND,
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
msg = new AD.DlMsg_PosOnDem(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
