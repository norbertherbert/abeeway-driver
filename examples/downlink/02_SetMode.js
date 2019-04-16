const AD = require('../../dist/abeeway-driver');

let b;
let setMode;

setMode = new AD.DlMsg_SetMode ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.SET_MODE,
        ackToken: 0x5,
        optData:  0x0,
    }),
    mode:         AD.E_OperatingMode.MOTION_TRACKING, 
});
console.log(setMode.toJSON());

b = setMode.toBuffer();
console.log(b.toString('hex'));

setMode = new AD.DlMsg_SetMode(b);
console.log(setMode.toJSON());

