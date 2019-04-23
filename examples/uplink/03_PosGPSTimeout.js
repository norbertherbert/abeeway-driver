const {
    UPDU_PosGPSTimeout, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
    E_GPSTimeoutCause,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posGPSTimeout = new UPDU_PosGPSTimeout ({
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
        temperature:  22.5,
        ackToken:     0x5,
        optData:      E_PositionInformation.GPS_TIMEOUT,
    }),
    cause:              E_GPSTimeoutCause.USER_TIMEOUT,
    carrierOverNoise:   [900, 1200, 600, 1999],
});
console.log(posGPSTimeout.toJSON());
console.log(posGPSTimeout.toHexString());

let buffer = posGPSTimeout.toBuffer();
let posGPSTimeout1 = new UPDU_PosGPSTimeout(buffer);
console.log(posGPSTimeout1.toJSON());
