const {
    UPDU_Shutdown, 
    CPDU_Header, CPDU_Status, E_UPDUType, E_OperatingMode,
    E_ShutdownCause,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let shutdown = new UPDU_Shutdown ({
    header: new CPDU_Header({
        type:         E_UPDUType.SHUTDOWN,
        status:       new CPDU_Status({
            operatingMode:           E_OperatingMode.ACTIVITY_MONITORING,
            sosState:                false,
            trackingState:           false,
            movingState:             true,
            periodicPositionMessage: false,
            positionOnDemandMessage: false,
        }),
        battery:      4.175,
        temperature:  22.5,
        ackToken:     0x5,
        optData:      0,
    }),
    shutdownCause: E_ShutdownCause.LOW_BATTERY,
});


console.log(shutdown.toJSON());
console.log(shutdown.toHexString());

let buffer = shutdown.toBuffer();
let shutdown1 = new UPDU_Shutdown(buffer);
console.log(shutdown1.toJSON());
