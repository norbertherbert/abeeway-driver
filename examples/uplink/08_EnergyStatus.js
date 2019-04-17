const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let b;
let energyStatus;

energyStatus = new AD.UlMsg_EnergyStatus ({
    header: new AD.Header({
        type:         AD.E_UlMsgType.ENERGY_STATUS,
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
        optData:      0,
    }),
    gpsOnTime:               100,
    gpsStabdbyTime:          500,
    wifiScans:               800,
});
console.log(energyStatus.toJSON());

b = energyStatus.toBuffer();
console.log(b.toString('hex'));

energyStatus = new AD.UlMsg_EnergyStatus(b);
console.log(energyStatus.toJSON());

