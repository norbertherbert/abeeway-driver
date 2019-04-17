const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b, msg;

// Create a new "Set Parameter Value" message object from its components
// Example #1/4 for the following parameters:
//     UL_PERIOD, LORA_PERIOD, PW_STAT_PERIOD, PERIODIC_POS_PERIOD, GEOLOC_SENSOR
msg = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.Parameter({
            id: AD.E_ParameterId.UL_PERIOD,
            value: 60,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.LORA_PERIOD,
            value: 300,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.PW_STAT_PERIOD,
            value: 300,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.PERIODIC_POS_PERIOD,
            value: 900,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.GEOLOC_SENSOR,
            value: AD.E_Param_GeolocSensor.WiFiLPGPS,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SetParam(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());




// Create a new "Set Parameter Value" message object from its components
// Example #2/4 for the following parameters:
//     GEOLOC_METHOD, MOTION_NB_POS, GPS_TIMEOUT, AGPS_TIMEOUT, GPS_EHPE
msg = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.Parameter({
            id: AD.E_ParameterId.GEOLOC_METHOD,
            value: AD.E_Param_GeolocMethod.WiFiGPS,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.MOTION_NB_POS,
            value: 1,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.GPS_TIMEOUT,
            value: 3,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.AGPS_TIMEOUT,
            value: 30,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.GPS_EHPE,
            value: 50,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SetParam(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());




// Create a new "Set Parameter Value" message object from its components
// Example #3/4 for the following parameters:
//     GPS_CONVERGENCE, CONFIG_FLAGS, TRANSMIT_STRAT, BLE_BEACON_COUNT, BLE_BEACON_TIMEOUT
msg = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.Parameter({
            id: AD.E_ParameterId.GPS_CONVERGENCE,
            value: 60,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.CONFIG_FLAGS,
            value: new AD.Param_ConfigFlags({
                 BLEAdvertisingActive:         false,
                 WiFiPayloadCyphered:          true,
                 ConfigReqsAcknoledged:        false,
                 DoubleShortButtonPressForSOS: true,
                 LongButtonPressToSwitchOff:   false,
                 FramePendingMechanismActive:  true,
            })
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.TRANSMIT_STRAT,
            value: AD.E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.BLE_BEACON_TIMEOUT,
            value: 1,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SetParam(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());




// Create a new "Set Parameter Value" message object from its components
// Example #4/4 for the following parameters:
//     GPS_STANDBY_TIMEOUT, CONFIRMED_UL_BITMAP, CONFIRMED_UL_RETRY
msg = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.Parameter({
            id: AD.E_ParameterId.GPS_STANDBY_TIMEOUT,
            value: 10,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.CONFIRMED_UL_BITMAP,
            value: 0,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.CONFIRMED_UL_RETRY,
            value: 0,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Buffer
b = msg.toBuffer();
console.log(b.toString('hex'));

// Create a new message object from a Buffer
msg = new AD.DlMsg_SetParam(b);

// Convert the message object to a JSON string again
console.log(msg.toJSON());
