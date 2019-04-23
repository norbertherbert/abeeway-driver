const {
    UPDU_ConfigReport, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    CPDU_Parameter, E_ParameterId,
    E_Tag, E_Param_TransmitStrat
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let configReport = new UPDU_ConfigReport ({
    header: new CPDU_Header({
        type:         E_UPDUType.ACTIVITY_OR_CONFIG,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.ACTIVITY_TRACKING,
            sosState:                false,
            trackingState:           false,
            movingState:             false,
            periodicPositionMessage: false,
            positionOnDemandMessage: true,
        }),
        battery:      4.175,
        temperature:  22.5,
        ackToken:     0x5,
        optData:      0,
    }),
    tag:    E_Tag.CONFIG,
    params: [
        new CPDU_Parameter({
            id: E_ParameterId.TRANSMIT_STRAT,
            value: E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
    ],
});
console.log(configReport.toJSON());
console.log(configReport.toHexString());

let buffer = configReport.toBuffer();
let configReport1 = new UPDU_ConfigReport(buffer);
console.log(configReport1.toJSON());
