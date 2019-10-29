const {
    DPDU_SetParam, 
    CPDU_DlHeaderShort, E_DPDUType, 
    CPDU_Parameter, E_ParameterId, 
    E_Param_GeolocMethod,
} = require('../../dist/abeeway-driver');
// if you use the module from the public npm repository use require('abeeway-driver') instead.

let msg, msg1, buffer;

// Create a new "Set Parameter Value" message object from its components
// Example #2/4 for the following parameters:
//     GEOLOC_METHOD, MOTION_NB_POS, GPS_TIMEOUT, AGPS_TIMEOUT, GPS_EHPE
msg = new DPDU_SetParam({
    header: new CPDU_DlHeaderShort({
        type: E_DPDUType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new CPDU_Parameter({
            id: E_ParameterId.GEOLOC_METHOD,
            value: E_Param_GeolocMethod.WiFiGPS,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.MOTION_NB_POS,
            value: 1,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.GPS_TIMEOUT,
            value: 30,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.AGPS_TIMEOUT,
            value: 30,
        }),
        new CPDU_Parameter({
            id: E_ParameterId.GPS_EHPE,
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
msg1 = new DPDU_SetParam(buffer);

// Convert the message object to a JSON string again
console.log(msg1.toJSON());
