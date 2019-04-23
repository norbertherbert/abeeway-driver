const {
    UPDU_Shutdown, 
    CPDU_UlHeaderShort, E_UPDUType,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let shutdown = new UPDU_Shutdown ({
    header: new CPDU_UlHeaderShort({
        type:         E_UPDUType.SHUTDOWN,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(shutdown.toJSON());
console.log(shutdown.toHexString());

let buffer = shutdown.toBuffer();
let shutdown1 = new UPDU_Shutdown(buffer);
console.log(shutdown1.toJSON());
