const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let posWiFiBSSIDs;

posWiFiBSSIDs = new AD.UlMsg_PosWiFiBSSIDs ({
    header: new AD.Header({
        type:         AD.E_UlMsgType.POSITION,
        status:       new AD.Status({
            operatingMode:           AD.E_OperatingMode.ACTIVITY_TRACKING,
            sosState:                false,
            trackingState:           false,
            movingState:             false,
            periodicPositionMessage: false,
            positionOnDemandMessage: true,
        }),
        battery:      4.175,
        temperature:  22.5,
        ackToken:     0x5,
        optData:      AD.E_PositionInformation.WIFI_BSSIDS,
    }),
    age: 950,
    wifiHotspots: [
        new AD.WiFiBSSIDs({
            bssid: 'aabbccaabb01',
            rssi: -11,
        }),
        new AD.WiFiBSSIDs({
            bssid: 'aabbccaabb02',
            rssi: 111,
        }),
        new AD.WiFiBSSIDs({
            bssid: 'aabbccaabb03',
            rssi: -33,
        }),
        new AD.WiFiBSSIDs({
            bssid: 'aabbccaabb04',
            rssi: -12,
        }),
    ],
});
console.log(posWiFiBSSIDs.toJSON());

b = posWiFiBSSIDs.toBuffer();
console.log(b.toString('hex'));

posWiFiBSSIDs = new AD.UlMsg_PosWiFiBSSIDs(b);
console.log(posWiFiBSSIDs.toJSON());

