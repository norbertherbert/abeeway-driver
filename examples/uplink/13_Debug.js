const {
    UPDU_Debug, 
    CPDU_UlHeaderShort, E_UPDUType,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let debug = new UPDU_Debug ({
    header: new CPDU_UlHeaderShort({
        type:         E_UPDUType.DEBUG,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(debug.toJSON());
console.log(debug.toHexString());

let buffer = debug.toBuffer();
let debug1 = new UPDU_Debug(buffer);
console.log(debug1.toJSON());
