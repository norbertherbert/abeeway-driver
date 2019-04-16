const AD = require('../../dist/abeeway-driver');

let b;
let posOnDem;

posOnDem = new AD.DlMsg_PosOnDem ({
    header: new AD.DlHeaderShort({
        type:     AD.E_DlMsgType.POSITION_ON_DEMAND,
        ackToken: 0x5,
        optData:  0x0,
    }),
});

console.log(posOnDem.toJSON());

b = posOnDem.toBuffer();
console.log(b.toString('hex'));

posOnDem = new AD.DlMsg_PosOnDem(b);
console.log(posOnDem.toJSON());
console.log();
