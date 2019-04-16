const AD = require('../../dist/abeeway-driver');

let b;
let configReport;

configReport = new AD.UlMsg_ConfigReport ({
    header: new AD.Header({
        type:         AD.E_UlMsgType.ACTIVITY_OR_CONFIG,
        status:       new AD.Status({
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
        new AD.Parameter({
            id: AD.E_ParameterId.TRANSMIT_STRAT,
            value: AD.E_Param_TransmitStrat.DUAL_FIXED,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.BLE_BEACON_COUNT,
            value: 1,
        }),
    ],
});
console.log(configReport.toJSON());

b = configReport.toBuffer();
console.log(b.toString('hex'));

configReport = new AD.UlMsg_ConfigReport(b);
console.log(configReport.toJSON());


