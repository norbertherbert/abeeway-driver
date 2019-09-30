const {
    UPDU_PosGPSFix, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode, 
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let gpsPosFix = new UPDU_PosGPSFix ({
    header: new CPDU_Header({
        type:         E_UPDUType.POSITION,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.MOTION_TRACKING,
            sosState:                false,
            trackingState:           false,
            movingState:             false,
            periodicPositionMessage: false,
            positionOnDemandMessage: true,
        }),
        battery:      4.175,
        // battery:      "MAINS_POWER",
        // battery:      "NOT_AVAILABLE",
        temperature:  22.5,
        ackToken:     0x5,
        optData:      E_PositionInformation.GPS_FIX,
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
let gpsPosFix1 = new UPDU_PosGPSFix(buffer);
console.log(gpsPosFix1.toJSON());
