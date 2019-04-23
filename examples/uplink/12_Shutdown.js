const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let shutdown = new AD.UPDU_Shutdown ({
    header: new AD.CPDU_UlHeaderShort({
        type:         AD.E_UPDUType.SHUTDOWN,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(shutdown.toJSON());
console.log(shutdown.toHexString());

let buffer = shutdown.toBuffer();
let shutdown1 = new AD.UPDU_Shutdown(buffer);
console.log(shutdown1.toJSON());
