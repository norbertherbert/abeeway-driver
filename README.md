# abeeway-driver
This is an open driver software for Abeeway Micro Tracker and Industrial Tracker devices. The driver can be used to decode LoRaWAN uplink message payload and to encode device configuration commands so that they can be sent as LoRaWAN downlink payload.
For more details on Abeeway tracker devices please visit the Abeeway website https://www.abeeway.com/products/

### Install abeeway-driver
    npm install abeeway-driver --save

### Use abeeway-driver to decode an uplink message
```
const abeewayDriver = require('abeeway-driver');

const uplinkPayloadHex = '0781f98350020e000000030f00000001';
let buffer = Buffer.from(uplinkPayloadHex, 'hex');
let decoded = abeewayDriver.decodeUlMsg(buffer);
console.log( JSON.stringify(decoded, null, 4) );
```
### Use abeeway-driver to encode a device command to send in a downlink message
```
const AD = require('abeeway-driver');

// Create a new "Set Parameter Value" message object from its components
let msg = new AD.DlMsg_SetParam({
    header: new AD.DlHeaderShort({
        type: AD.E_DlMsgType.SET_PARAM,
        ackToken: 0x5,
        optData: 0x0,
    }),
    params: [
        // Up to 5 parameters can be listed here
        new AD.Parameter({
            id: AD.E_ParameterId.UL_PERIOD,
            value: 60,
        }),
        new AD.Parameter({
            id: AD.E_ParameterId.LORA_PERIOD,
            value: 300,
        }),
    ]
});
let buffer = msg.toBuffer();
console.log(buffer.toString('hex'));
```

### More examples
More examples can be found in the 'examples' folder of the master branch.
https://github.com/norbertherbert/abeeway-driver/tree/master/examples
