const AD = require('../../dist/abeeway-driver');

let b;
let setParam;

setParam = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
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
console.log(setParam.toJSON());

b = setParam.toBuffer();
console.log(b.toString('hex'));

setParam = new AD.DlMsg_SetParam(b);
console.log(setParam.toJSON());

console.log();




setParam = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
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
console.log(setParam.toJSON());

b = setParam.toBuffer();
console.log(b.toString('hex'));

setParam = new AD.DlMsg_SetParam(b);
console.log(setParam.toJSON());

console.log();




setParam = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [

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
console.log(setParam.toJSON());

b = setParam.toBuffer();
console.log(b.toString('hex'));

setParam = new AD.DlMsg_SetParam(b);
console.log(setParam.toJSON());

console.log();




setParam = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
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
console.log(setParam.toJSON());

b = setParam.toBuffer();
console.log(b.toString('hex'));

setParam = new AD.DlMsg_SetParam(b);
console.log(setParam.toJSON());

