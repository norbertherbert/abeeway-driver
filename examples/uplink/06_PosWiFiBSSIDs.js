const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let posWiFiBSSIDs = new AD.UPDU_PosWiFiBSSIDs ({
    header: new AD.CPDU_Header({
        type:         AD.E_UPDUType.POSITION,
        status:       new AD.CPDU_Status({
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
        new AD.CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb01',
            rssi: -11,
        }),
        new AD.CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb02',
            rssi: 111,
        }),
        new AD.CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb03',
            rssi: -33,
        }),
        new AD.CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb04',
            rssi: -12,
        }),
    ],
});
console.log(posWiFiBSSIDs.toJSON());
console.log(posWiFiBSSIDs.toHexString());

let buffer = posWiFiBSSIDs.toBuffer();
let posWiFiBSSIDs1 = new AD.UPDU_PosWiFiBSSIDs(buffer);
console.log(posWiFiBSSIDs1.toJSON());
