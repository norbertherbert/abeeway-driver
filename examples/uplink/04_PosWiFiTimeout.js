const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let posWiFiTimeout = new AD.UPDU_PosWiFiTimeout ({
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
        optData:      AD.E_PositionInformation.WIFI_TIMEOUT,
    }),
    v_bat:   [4.17, 4.17, 4.17, 4.17, 4.17, 4.17,],
});
console.log(posWiFiTimeout.toJSON());
console.log(posWiFiTimeout.toHexString());

let buffer = posWiFiTimeout.toBuffer();
let posWiFiTimeout1 = new AD.UPDU_PosWiFiTimeout(buffer);
console.log(posWiFiTimeout1.toJSON());
