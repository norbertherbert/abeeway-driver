const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #1/4 for the following parameters:
//     UL_PERIOD, LORA_PERIOD, PW_STAT_PERIOD, PERIODIC_POS_PERIOD, GEOLOC_SENSOR
msg = new AD.DPDU_SetParam({
    header: new AD.CPDU_DlHeaderShort({
        type: AD.E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.UL_PERIOD,
            value: 60,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.LORA_PERIOD,
            value: 300,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.PW_STAT_PERIOD,
            value: 300,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.PERIODIC_POS_PERIOD,
            value: 900,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.GEOLOC_SENSOR,
            value: AD.E_Param_GeolocSensor.WiFiLPGPS,
        }),
    ]
});

// Convert the message object to a JSON string
console.log(msg.toJSON());

// Convert the message object to a Hex string
console.log(msg.toHexString());

// Convert the message object to a Buffer
buffer = msg.toBuffer();

// Create a new message object from a Buffer
msg1 = new AD.DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
