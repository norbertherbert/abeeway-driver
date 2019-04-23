const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let framePending = new AD.UPDU_FramePending ({
    header: new AD.CPDU_UlHeaderShort({
        type:         AD.E_UPDUType.FRAME_PENDING,
        ackToken:     0x5,
        optData:      0x0,
    }),
});
console.log(framePending.toJSON());
console.log(framePending.toHexString());

let buffer = framePending.toBuffer();
let framePending1 = new AD.UPDU_FramePending(buffer);
console.log(framePending1.toJSON());
