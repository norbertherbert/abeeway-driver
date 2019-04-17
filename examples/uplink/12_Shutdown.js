const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let shutdown;

shutdown = new AD.UlMsg_Shutdown ({
    header: new AD.UlHeaderShort({
        type:         AD.E_UlMsgType.SHUTDOWN,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(shutdown.toJSON());

b = shutdown.toBuffer();
console.log(b.toString('hex'));

shutdown = new AD.UlMsg_Shutdown(b);
console.log(shutdown.toJSON());

