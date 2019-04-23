const {
    UPDU_PosWiFiTimeout, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posWiFiTimeout = new UPDU_PosWiFiTimeout ({
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
        optData:      E_PositionInformation.WIFI_TIMEOUT,
    }),
    v_bat:   [4.17, 4.17, 4.17, 4.17, 4.17, 4.17,],
});
console.log(posWiFiTimeout.toJSON());
console.log(posWiFiTimeout.toHexString());

let buffer = posWiFiTimeout.toBuffer();
let posWiFiTimeout1 = new UPDU_PosWiFiTimeout(buffer);
console.log(posWiFiTimeout1.toJSON());
