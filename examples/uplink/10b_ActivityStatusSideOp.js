const {
    UPDU_ActivityStatusSideOp, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    E_Tag,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let activityStatusSideOp = new UPDU_ActivityStatusSideOp ({
    header: new CPDU_Header({
        type:         E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.ACTIVITY_MONITORING,
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
    tag:           E_Tag.ACTIVITY_SIDEOP,
    activityCounts: [1, 2, 3, 4, 5, 6],
    globalCounter: 255,
});
console.log(activityStatusSideOp.toJSON());
console.log(activityStatusSideOp.toHexString());

let buffer = activityStatusSideOp.toBuffer();
let activityStatusSideOp1 = new UPDU_ActivityStatusSideOp(buffer);
console.log(activityStatusSideOp1.toJSON());

