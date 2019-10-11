const {
    UPDU_Debug, 
    CPDU_UlHeaderShort, E_UPDUType,
    E_DebugCmd, E_DebugAction,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let debug = new UPDU_Debug ({
    header: new CPDU_UlHeaderShort({
        type:         E_UPDUType.DEBUG,
        ackToken:     0x5,
        optData:      0,
    }),
    debugCmdId: E_DebugCmd.TRIGGER_HEARTBEAT,
    action:     E_DebugAction.RESETDEVICE_INITCONFIG,
});
console.log(debug.toJSON());
console.log(debug.toHexString());

let buffer = debug.toBuffer();
let debug1 = new UPDU_Debug(buffer);
console.log(debug1.toJSON());
