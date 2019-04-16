const AD = require('../../dist/abeeway-driver');

let b;
let activityStatus;

activityStatus = new AD.UlMsg_ActivityStatus ({
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
    tag:           AD.E_Tag.ACTIVITY,
    activityCount: 123,
});
console.log(activityStatus.toJSON());

b = activityStatus.toBuffer();
console.log(b.toString('hex'));

activityStatus = new AD.UlMsg_ActivityStatus(b);
console.log(activityStatus.toJSON());

