const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let debug = new AD.UPDU_Debug ({
    header: new AD.CPDU_UlHeaderShort({
        type:         AD.E_UPDUType.DEBUG,
        ackToken:     0x5,
        optData:      0,
    }),
});
console.log(debug.toJSON());
console.log(debug.toHexString());

let buffer = debug.toBuffer();
let debug1 = new AD.UPDU_Debug(buffer);
console.log(debug1.toJSON());
