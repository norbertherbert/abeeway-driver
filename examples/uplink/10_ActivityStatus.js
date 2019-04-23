const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let activityStatus = new AD.UPDU_ActivityStatus ({
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
    tag:           AD.E_Tag.ACTIVITY,
    activityCount: 123,
});
console.log(activityStatus.toJSON());
console.log(activityStatus.toHexString());

let buffer = activityStatus.toBuffer();
let activityStatus1 = new AD.UPDU_ActivityStatus(buffer);
console.log(activityStatus1.toJSON());

