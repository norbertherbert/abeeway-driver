const {
    UPDU_PosBLEFailure, 
    CPDU_Header, E_UPDUType, E_PositionInformation,
    CPDU_Status, E_OperatingMode,
    E_BLEFailure,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let posBLEFailure = new UPDU_PosBLEFailure ({
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
        optData:      E_PositionInformation.BLE_BACON_FAILURE,
    }),
    error: E_BLEFailure.SCAN_ALREADY_ONGOING,
});
console.log(posBLEFailure.toJSON());
console.log(posBLEFailure.toHexString());

let buffer = posBLEFailure.toBuffer();
let posBLEFailure1 = new UPDU_PosBLEFailure(buffer);
console.log(posBLEFailure1.toJSON());
