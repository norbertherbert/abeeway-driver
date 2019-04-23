const {
    UPDU_FramePending, 
    CPDU_UlHeaderShort, E_UPDUType
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let framePending = new UPDU_FramePending ({
    header: new CPDU_UlHeaderShort({
        type:         E_UPDUType.FRAME_PENDING,
        ackToken:     0x5,
        optData:      0x0,
    }),
});
console.log(framePending.toJSON());
console.log(framePending.toHexString());

let buffer = framePending.toBuffer();
let framePending1 = new UPDU_FramePending(buffer);
console.log(framePending1.toJSON());
