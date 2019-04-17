const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let posBLEFailure;

posBLEFailure = new AD.UlMsg_PosBLEFailure ({
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
        optData:      AD.E_PositionInformation.BLE_BACON_FAILURE,
    }),
    error: AD.E_BLEFailure.SCAN_ALREADY_ONGOING,
});
console.log(posBLEFailure.toJSON());

b = posBLEFailure.toBuffer();
console.log(b.toString('hex'));

posBLEFailure = new AD.UlMsg_PosBLEFailure(b);
console.log(posBLEFailure.toJSON());

