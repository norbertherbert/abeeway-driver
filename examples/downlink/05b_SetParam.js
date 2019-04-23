const AD = require('../../dist/abeeway-driver');
// Replace the above line with the following line if you use the module from the public npm repository
// const AD = require('abeeway-driver');

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #2/4 for the following parameters:
//     GEOLOC_METHOD, MOTION_NB_POS, GPS_TIMEOUT, AGPS_TIMEOUT, GPS_EHPE
msg = new AD.DPDU_SetParam({
    header: new AD.CPDU_DlHeaderShort({
        type: AD.E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.GEOLOC_METHOD,
            value: AD.E_Param_GeolocMethod.WiFiGPS,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.MOTION_NB_POS,
            value: 1,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.GPS_TIMEOUT,
            value: 3,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.AGPS_TIMEOUT,
            value: 30,
        }),
        new AD.CPDU_Parameter({
            id: AD.E_ParameterId.GPS_EHPE,
            value: 50,
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
