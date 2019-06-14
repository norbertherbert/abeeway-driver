const {
    UPDU_GeolocStart, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let geolocStart = new UPDU_GeolocStart ({
    header: new CPDU_Header({
        type:         E_UPDUType.GEOLOC_START,
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
    data:      0x00,
});
console.log(geolocStart.toJSON());
console.log(geolocStart.toHexString());

let buffer = geolocStart.toBuffer();
let geolocStart1 = new UPDU_GeolocStart(buffer);
console.log(geolocStart1.toJSON());
