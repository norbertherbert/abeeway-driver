const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let posBLEFailure = new AD.UPDU_PosBLEFailure ({
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
        optData:      AD.E_PositionInformation.BLE_BACON_FAILURE,
    }),
    error: AD.E_BLEFailure.SCAN_ALREADY_ONGOING,
});
console.log(posBLEFailure.toJSON());
console.log(posBLEFailure.toHexString());

let buffer = posBLEFailure.toBuffer();
let posBLEFailure1 = new AD.UPDU_PosBLEFailure(buffer);
console.log(posBLEFailure1.toJSON());
