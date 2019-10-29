const {
    UPDU_PosWiFiBSSIDs, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
    CPDU_WiFiBSSIDs,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posWiFiBSSIDs = new UPDU_PosWiFiBSSIDs ({
    header: new CPDU_Header({
        type:         E_UPDUType.POSITION,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.ACTIVITY_MONITORING,
            sosState:                false,
            trackingState:           false,
            movingState:             false,
            periodicPositionMessage: false,
            positionOnDemandMessage: true,
        }),
        battery:      4.175,
        temperature:  22.5,
        ackToken:     0x5,
        optData:      E_PositionInformation.WIFI_BSSIDS,
    }),
    age: 950,
    wifiHotspots: [
        new CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb01',
            rssi: -11,
        }),
        new CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb02',
            rssi: 111,
        }),
        new CPDU_WiFiBSSIDs({
            bssid: 'aabbccaabb03',
            rssi: -33,
        }),
        // new CPDU_WiFiBSSIDs({
        //     bssid: 'aabbccaabb04',
        //     rssi: -12,
        // }),
    ],
});
console.log(posWiFiBSSIDs.toJSON());
console.log(posWiFiBSSIDs.toHexString());

let buffer = posWiFiBSSIDs.toBuffer();
let posWiFiBSSIDs1 = new UPDU_PosWiFiBSSIDs(buffer);
console.log(posWiFiBSSIDs1.toJSON());
