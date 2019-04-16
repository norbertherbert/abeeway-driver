const AD = require('../../dist/abeeway-driver');

let b;
let reqConf;

reqConf = new AD.DlMsg_ReqConf ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.REQUEST_CONFIGURATION,
        ackToken: 0x5,
        optData:  0x0,
    }),
    paramIDs: [
        AD.E_ParameterId.GPS_CONVERGENCE, 
        AD.E_ParameterId.GPS_TIMEOUT
    ], 
});
console.log(reqConf.toJSON());

b = reqConf.toBuffer();
console.log(b.toString('hex'));

reqConf = new AD.DlMsg_ReqConf(b);
console.log(reqConf.toJSON());





