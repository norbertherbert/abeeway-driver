const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let gpsPosFix = new AD.UPDU_PosGPSFix ({
    header: new AD.CPDU_Header({
        type:         AD.E_UPDUType.POSITION,
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
        optData:      AD.E_PositionInformation.GPS_FIX,
    }),
    age:              110,
    latitude:         -17,
    longitude:        -170,
    ehpe:             500,
    encryptedPos:     Buffer.from([0,0,0]), 
});
console.log(gpsPosFix.toJSON());
console.log(gpsPosFix.toHexString());

let buffer = gpsPosFix.toBuffer();
let gpsPosFix1 = new AD.UPDU_PosGPSFix(buffer);
console.log(gpsPosFix1.toJSON());
