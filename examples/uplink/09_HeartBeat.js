const {
    UPDU_HeartBeat, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let heartBeat = new UPDU_HeartBeat ({
    header: new CPDU_Header({
        type:         E_UPDUType.HEART_BEAT,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.MOTION_TRACKING,
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
    bleFwVersion:  '2.3.4',
});
console.log(heartBeat.toJSON());
console.log(heartBeat.toHexString());

let buffer = heartBeat.toBuffer();
let heartBeat1 = new UPDU_HeartBeat(buffer);
console.log(heartBeat1.toJSON());
