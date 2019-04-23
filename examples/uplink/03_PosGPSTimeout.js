const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let posGPSTimeout = new AD.UPDU_PosGPSTimeout ({
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
        optData:      AD.E_PositionInformation.GPS_TIMEOUT,
    }),
    cause:              AD.E_GPSTimeoutCause.USER_TIMEOUT,
    carrierOverNoise:   [900, 1200, 600, 1999],
});
console.log(posGPSTimeout.toJSON());
console.log(posGPSTimeout.toHexString());

let buffer = posGPSTimeout.toBuffer();
let posGPSTimeout1 = new AD.UPDU_PosGPSTimeout(buffer);
console.log(posGPSTimeout1.toJSON());
