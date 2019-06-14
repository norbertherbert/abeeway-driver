const {
    DPDU_SetParam, 
    CPDU_DlHeaderShort, E_DPDUType, 
    CPDU_Parameter, E_ParameterId, 
    E_Param_TransmitStrat, CPDU_ParamConfigFlags
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #3/4 for the following parameters:
//     GPS_CONVERGENCE, CONFIG_FLAGS, TRANSMIT_STRAT, BLE_BEACON_COUNT, BLE_BEACON_TIMEOUT
msg = new DPDU_SetParam({
    header: new CPDU_DlHeaderShort({
        type: E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new CPDU_Parameter({
            id: E_ParameterId.GPS_CONVERGENCE,
            value: 60,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.CONFIG_FLAGS,
            value: new CPDU_ParamConfigFlags({
                LedBlinksOnGPSFix:            false,
                WiFiScanWhenGeolocStarts:     true,
                BLEAdvertisingActive:         false,
                WiFiPayloadCyphered:          true,
                ConfigReqsAcknoledged:        false,
                DoubleShortButtonPressForSOS: true,
                LongButtonPressToSwitchOff:   false,
                FramePendingMechanismActive:  true,
            })
        }),
        new CPDU_Parameter({
            id: E_ParameterId.TRANSMIT_STRAT,
            value: E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.BLE_BEACON_TIMEOUT,
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
msg1 = new DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
