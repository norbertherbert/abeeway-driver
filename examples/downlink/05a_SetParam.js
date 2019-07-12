const {
    DPDU_SetParam, 
    CPDU_DlHeaderShort, E_DPDUType, 
    CPDU_Parameter, E_ParameterId, 
    E_Param_GeolocSensor
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #1/4 for the following parameters:
//     UL_PERIOD, LORA_PERIOD, PW_STAT_PERIOD, PERIODIC_POS_PERIOD, GEOLOC_SENSOR
msg = new DPDU_SetParam({
    header: new CPDU_DlHeaderShort({
        type: E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new CPDU_Parameter({
            id: E_ParameterId.UL_PERIOD,
            value: 60,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.LORA_PERIOD,
            value: 300,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.PW_STAT_PERIOD,
            value: 300,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.PERIODIC_POS_PERIOD,
            value: 900,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.GEOLOC_SENSOR,
            value: E_Param_GeolocSensor.BLE,
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
msg1 = new DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
