const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #3/4 for the following parameters:
//     GPS_CONVERGENCE, CONFIG_FLAGS, TRANSMIT_STRAT, BLE_BEACON_COUNT, BLE_BEACON_TIMEOUT
msg = new AD.DPDU_SetParam({
    header: new AD.CPDU_DlHeaderShort({
        type: AD.E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.GPS_CONVERGENCE,
            value: 60,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.CONFIG_FLAGS,
            value: new AD.CPDU_ParamConfigFlags({
                 BLEAdvertisingActive:         false,
                 WiFiPayloadCyphered:          true,
                 ConfigReqsAcknoledged:        false,
                 DoubleShortButtonPressForSOS: true,
                 LongButtonPressToSwitchOff:   false,
                 FramePendingMechanismActive:  true,
            })
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.TRANSMIT_STRAT,
            value: AD.E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.BLE_BEACON_TIMEOUT,
            value: 1,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
buffer = msg.toBuffer();

// Create a new message object from a Buffer
msg1 = new AD.DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
