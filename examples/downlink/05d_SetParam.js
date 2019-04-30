const {
    DPDU_SetParam, 
    CPDU_DlHeaderShort, E_DPDUType, 
    CPDU_Parameter, E_ParameterId,
    CPDU_ParamConfirmedUlBitmap,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #4/4 for the following parameters:
//     GPS_STANDBY_TIMEOUT, CONFIRMED_UPDU_BITMAP, CONFIRMED_UPDU_RETRY
msg = new DPDU_SetParam({
    header: new CPDU_DlHeaderShort({
        type: E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new CPDU_Parameter({
            id: E_ParameterId.GPS_STANDBY_TIMEOUT,
            value: 10,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.CONFIRMED_UL_BITMAP,
            value: new CPDU_ParamConfirmedUlBitmap({
                FramePending:     false,
                Position:         true,
                EnergyStatus:     false,
                HeartBeat:        true,
                ActivityOrConfig: false,
                Shutdown:         true,
            })
        }),
        new CPDU_Parameter({
            id: E_ParameterId.CONFIRMED_UL_RETRY,
            value: 0,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
buffer = msg.toBuffer();
//buffer = Buffer.from('0b50110000000a120000ffff1300000000', 'hex');

// Create a new message object from a Buffer
msg1 = new DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
