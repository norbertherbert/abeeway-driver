const AD = require('../../dist/abeeway-driver');

let b;
let gpsPosFix;

gpsPosFix = new AD.UlMsg_PosGPSFix ({
    header: new AD.Header({
        type:         AD.E_UlMsgType.POSITION,
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
        optData:      AD.E_PositionInformation.GPS_FIX,
    }),
    age:              110,
    latitude:         -17,
    longitude:        -170,
    ehpe:             500,
    encryptedPos:     Buffer.from([0,0,0]), 
});
console.log(gpsPosFix.toJSON());

b = gpsPosFix.toBuffer();
console.log(b.toString('hex'));

gpsPosFix = new AD.UlMsg_PosGPSFix(b);
console.log(gpsPosFix.toJSON());

