const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let heartBeat = new AD.UPDU_HeartBeat ({
    header: new AD.CPDU_Header({
        type:         AD.E_UPDUType.HEART_BEAT,
        status:       new AD.CPDU_Status({
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
console.log(heartBeat.toHexString());

let buffer = heartBeat.toBuffer();
let heartBeat1 = new AD.UPDU_HeartBeat(buffer);
console.log(heartBeat1.toJSON());
