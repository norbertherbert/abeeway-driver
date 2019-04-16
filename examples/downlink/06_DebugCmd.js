const AD = require('../../dist/abeeway-driver');

let b;
let debugCmd;

debugCmd = new AD.DlMsg_DebugCmd ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.DEBUG_COMMAND,
        ackToken: 0x5,
        optData:  0x0,
    }),
    debugCmd:     AD.E_DebugCmd.RESET_DEVICE
});
console.log(debugCmd.toJSON());

b = debugCmd.toBuffer();
console.log(b.toString('hex'));

debugCmd = new AD.DlMsg_DebugCmd(b);
console.log(debugCmd.toJSON());
