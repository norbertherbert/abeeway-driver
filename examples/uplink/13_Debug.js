const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let debug;

debug = new AD.UlMsg_Debug ({
    header: new AD.UlHeaderShort({
        type:         AD.E_UlMsgType.DEBUG,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(debug.toJSON());

b = debug.toBuffer();
console.log(b.toString('hex'));

debug = new AD.UlMsg_Debug(b);
console.log(debug.toJSON());

