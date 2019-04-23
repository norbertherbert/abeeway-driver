const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let configReport = new AD.UPDU_ConfigReport ({
    header: new AD.CPDU_Header({
        type:         AD.E_UPDUType.ACTIVITY_OR_CONFIG,
        status:       new AD.CPDU_Status({
            operatingMode:           AD.E_OperatingMode.ACTIVITY_TRACKING,
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
    tag:    AD.E_Tag.CONFIG,
    params: [
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.TRANSMIT_STRAT,
            value: AD.E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
    ],
});
console.log(configReport.toJSON());
console.log(configReport.toHexString());

let buffer = configReport.toBuffer();
let configReport1 = new AD.UPDU_ConfigReport(buffer);
console.log(configReport1.toJSON());
