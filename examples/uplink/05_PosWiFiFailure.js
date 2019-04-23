const {
    UPDU_PosWiFiFailure, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
    E_WiFiFailure,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posWiFiFailure = new UPDU_PosWiFiFailure ({
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
        optData:      E_PositionInformation.WIFI_FAILURE,
    }),
    v_bat:   [4.17, 4.17, 4.17, 4.17, 4.17, 4.17,],
    error: E_WiFiFailure.SCAN_FAILURE,
});
console.log(posWiFiFailure.toJSON());
console.log(posWiFiFailure.toHexString());

let buffer = posWiFiFailure.toBuffer();
let posWiFiFailure1 = new UPDU_PosWiFiFailure(buffer);
console.log(posWiFiFailure1.toJSON());
