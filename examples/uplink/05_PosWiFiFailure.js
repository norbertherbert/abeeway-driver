const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let posWiFiFailure = new AD.UPDU_PosWiFiFailure ({
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
        optData:      AD.E_PositionInformation.WIFI_FAILURE,
    }),
    v_bat:   [4.17, 4.17, 4.17, 4.17, 4.17, 4.17,],
    error: AD.E_WiFiFailure.SCAN_FAILURE,
});
console.log(posWiFiFailure.toJSON());
console.log(posWiFiFailure.toHexString());

let buffer = posWiFiFailure.toBuffer();
let posWiFiFailure1 = new AD.UPDU_PosWiFiFailure(buffer);
console.log(posWiFiFailure1.toJSON());
