const AD = require('../../dist/abeeway-driver');

let b;
let heartBeat;

heartBeat = new AD.UlMsg_HeartBeat ({
    header: new AD.Header({
        type:         AD.E_UlMsgType.HEART_BEAT,
        status:       new AD.Status({
            operatingMode:           AD.E_OperatingMode.MOTION_TRACKING,
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
    cause:      1,
    fwVersion:  '1.2.3',
});
console.log(heartBeat.toJSON());

b = heartBeat.toBuffer();
console.log(b.toString('hex'));

heartBeat = new AD.UlMsg_HeartBeat(b);
console.log(heartBeat.toJSON());

