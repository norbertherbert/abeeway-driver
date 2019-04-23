const {
    UPDU_EnergyStatus, 
    CPDU_Header, E_UPDUType,
    CPDU_Status, E_OperatingMode,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let energyStatus = new UPDU_EnergyStatus ({
    header: new CPDU_Header({
        type:         E_UPDUType.ENERGY_STATUS,
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
    gpsOnTime:               100,
    gpsStabdbyTime:          500,
    wifiScans:               800,
});
console.log(energyStatus.toJSON());
console.log(energyStatus.toHexString());

let buffer = energyStatus.toBuffer();
let energyStatus1 = new UPDU_EnergyStatus(buffer);
console.log(energyStatus1.toJSON());
