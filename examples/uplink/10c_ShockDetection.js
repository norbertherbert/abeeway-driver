const { 
    UPDU_ShockDetection,
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    E_Tag,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let shockDetection = new UPDU_ShockDetection ({
    header: new CPDU_Header({
        type:         E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT,
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
    tag:           E_Tag.SHOCK_DETECTION,
    numberOfShocks: 123,
    acceleration: [-121, 6, 780],
});
console.log(shockDetection.toJSON());
console.log(shockDetection.toHexString());

let buffer = shockDetection.toBuffer();
let shockDetection1 = new UPDU_ShockDetection(buffer);
console.log(shockDetection1.toJSON());

