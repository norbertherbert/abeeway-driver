# abeeway-driver
This is an open driver software for Abeeway Micro Tracker and Industrial Tracker devices (with firmware v1.7). The driver can be used to decode LoRaWAN uplink message payload and to encode device configuration commands so that they can be sent as LoRaWAN downlink payload. An online application demonstrating all features of this driver is aveilable here: [>>](https://nano-things.net/abeeway-demo/home) 

For more details on Abeeway tracker devices please visit the 
[Abeeway](https://www.abeeway.com/products/) 
website. 

The code was written based on the reference guides that are available in the 
[/docs](https://github.com/norbertherbert/abeeway-driver/tree/master/docs) 
directory of this repository.

### Abeeway Application Protocol Data Unit (PDU) Objects
This driver is introdicing the concept of Protocol Data Unit (PDU) objects that you can create from 
* number, 
* buffer, 
* hex string representation of the buffer, 
* object, 
* JSON representation of the object

by using the PDU's constructor method.

If you have an already created PDU object, you can convert it to
* number (with the .toValue() method of the object), 
* buffer (with the .toBuffer() method of the object), 
* hex string representation of the buffer (with the .toHesString() method of the object), 
* object (with the .toComponents() method of the object), 
* JSON representation of the object (with the .toJSON() method of the object)

There are 3 types of PDUs
* [UPDU](https://github.com/norbertherbert/abeeway-driver/tree/master/src/UPDU.ts)
, represents an uplink message
* [DPDU](https://github.com/norbertherbert/abeeway-driver/tree/master/src/DPDU.ts)
, represents a downlink message
* [CPDU](https://github.com/norbertherbert/abeeway-driver/tree/master/src/CPDU.ts)
, Component PDU that represents a component of an UPDU or DPDU 

In order to allow programmers to easily recognize the type of PDUs the class names of PDUs always have one of the following prefixes: UPDU_, DPDU_ or CPDU_ 

Beyond PDUs, the driver defines a long list of
[constants](https://github.com/norbertherbert/abeeway-driver/tree/master/src/constants.ts).
Please note that all enum constants are referred with prefix E_.

### Install abeeway-driver
    npm install abeeway-driver --save

### Use abeeway-driver to decode an uplink message
```javascript
const createUPDU = require('abeeway-driver');

const uplinkPayloadHex = '0781f98350020e000000030f00000001';
let pdu = createUPDU(uplinkPayloadHex);
console.log( 'The type of this PDU is: ' + pdu.header.type );
console.log( pdu.toJSON() );
```
### Use abeeway-driver to encode a device command to send in a downlink message
```javascript
const {
    DPDU_SetParam, 
    CPDU_DlHeaderShort, E_DPDUType,
    CPDU_Parameter, E_ParameterId
} = require('abeeway-driver');

// Create a new "Set Parameter Value" PDU object from its components
let pdu = new DPDU_SetParam({
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
    ]
});
console.log(pdu.toHexString());
```

### More examples
More examples can be found in the 
[/examples](https://github.com/norbertherbert/abeeway-driver/tree/master/examples)
folder.
