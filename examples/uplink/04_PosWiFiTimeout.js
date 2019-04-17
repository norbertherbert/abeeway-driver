const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let posWiFiTimeout;

posWiFiTimeout = new AD.UlMsg_PosWiFiTimeout ({
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
        optData:      AD.E_PositionInformation.WIFI_TIMEOUT,
    }),
    v_bat:   [4.17, 4.17, 4.17, 4.17, 4.17, 4.17,],
});
console.log(posWiFiTimeout.toJSON());

b = posWiFiTimeout.toBuffer();
console.log(b.toString('hex'));

posWiFiTimeout = new AD.UlMsg_PosWiFiTimeout(b);
console.log(posWiFiTimeout.toJSON());

