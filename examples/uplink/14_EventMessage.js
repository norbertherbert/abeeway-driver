const {
    UPDU_EventMessage, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
    E_EventValue,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let eventMessage = new UPDU_EventMessage ({
    header: new CPDU_Header({
        type:         E_UPDUType.EVENT_MESSAGE,
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
        optData:      0,
    }),
    eventValue:       E_EventValue.BLE_CONNECTED,
    acceleration:     [-10, 123, -2220],
});
console.log(eventMessage.toJSON());
console.log(eventMessage.toHexString());

let buffer = eventMessage.toBuffer();
let eventMessage1 = new UPDU_EventMessage(buffer);
console.log(eventMessage1.toJSON());
