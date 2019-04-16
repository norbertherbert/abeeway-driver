const AD = require('../../dist/abeeway-driver');

let b;
let sosMode;

sosMode = new AD.DlMsg_SOSMode ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.START_SOS_MODE,
        ackToken: 0x5,
        optData:  0x0,
    }),
});
console.log(sosMode.toJSON());

b = sosMode.toBuffer();
console.log(b.toString('hex'));

sosMode = new AD.DlMsg_SOSMode(b);
console.log(sosMode.toJSON());




