const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let energyStatus = new AD.UPDU_EnergyStatus ({
    header: new AD.CPDU_Header({
        type:         AD.E_UPDUType.ENERGY_STATUS,
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
        optData:      0,
    }),
    gpsOnTime:               100,
    gpsStabdbyTime:          500,
    wifiScans:               800,
});
console.log(energyStatus.toJSON());
console.log(energyStatus.toHexString());

let buffer = energyStatus.toBuffer();
let energyStatus1 = new AD.UPDU_EnergyStatus(buffer);
console.log(energyStatus1.toJSON());
