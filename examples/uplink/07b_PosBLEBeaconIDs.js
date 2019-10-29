const {
    UPDU_PosBLEBeaconIDs, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
    CPDU_BLEBeaconIDs,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posBLEBeaconIDs = new UPDU_PosBLEBeaconIDs ({
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
        optData:      E_PositionInformation.BLE_BEACONIDS,
    }),
    age: 950,
    bleBeacons: [
        new CPDU_BLEBeaconIDs({
            beaconid: 'aabbccaabb01',
            rssi: -11,
        }),
        new CPDU_BLEBeaconIDs({
            beaconid: 'aabbccaabb02',
            rssi: 111,
        }),
        new CPDU_BLEBeaconIDs({
            beaconid: 'aabbccaabb03',
            rssi: -33,
        }),
        // new CPDU_BLEBeaconIDs({
        //     beaconid: 'aabbccaabb04',
        //     rssi: -12,
        // }),
    ],
});
console.log(posBLEBeaconIDs.toJSON());
console.log(posBLEBeaconIDs.toHexString());

let buffer = posBLEBeaconIDs.toBuffer();
let posBLEBeaconIDs1 = new UPDU_PosBLEBeaconIDs(buffer);
console.log(posBLEBeaconIDs1.toJSON());
