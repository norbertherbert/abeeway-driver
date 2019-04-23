const {
    UPDU_ActivityStatus, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    E_Tag,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let activityStatus = new UPDU_ActivityStatus ({
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
    tag:           E_Tag.ACTIVITY,
    activityCount: 123,
});
console.log(activityStatus.toJSON());
console.log(activityStatus.toHexString());

let buffer = activityStatus.toBuffer();
let activityStatus1 = new UPDU_ActivityStatus(buffer);
console.log(activityStatus1.toJSON());

