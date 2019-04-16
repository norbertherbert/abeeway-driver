const AD = require('../../dist/abeeway-driver');

let b;
let framePending;

framePending = new AD.UlMsg_FramePending ({
    header: new AD.UlHeaderShort({
        type:         AD.E_UlMsgType.FRAME_PENDING,
        ackToken:     0x5,
        optData:      0x0,
    }),
});
console.log(framePending.toJSON());

b = framePending.toBuffer();
console.log(b.toString('hex'));

framePending = new AD.UlMsg_FramePending(b);
console.log(framePending.toJSON());
