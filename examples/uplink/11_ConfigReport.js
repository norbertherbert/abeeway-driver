const {
    UPDU_ConfigReport, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    CPDU_Parameter, E_ParameterId,
    E_Tag,
    E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let configReport = new UPDU_ConfigReport ({
    header: new CPDU_Header({
        type:         E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.ACTIVITY_MONITORING,
            sosState:                false,
            trackingState:           false,
            movingState:             true,
            periodicPositionMessage: false,
            positionOnDemandMessage: false,
        }),
        battery:      4.175,
        temperature:  22.5,
        ackToken:     0x5,
        optData:      0,
    }),
    tag:    E_Tag.CONFIG,
    params: [
        new CPDU_Parameter({
            id: E_ParameterId.GEOLOC_SENSOR,
            value: E_Param_GeolocSensor.WiFiGPS,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.GEOLOC_METHOD,
            value: E_Param_GeolocMethod.GPS,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.TRANSMIT_STRAT,
            value: E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
        // new CPDU_Parameter({
        //     id: E_ParameterId.RESERVED_04,
        //     value: 0,
        // }),
    ],
});
console.log(configReport.toJSON());
console.log(configReport.toHexString());

let buffer = configReport.toBuffer();
let configReport1 = new UPDU_ConfigReport(buffer);
console.log(configReport1.toJSON());
