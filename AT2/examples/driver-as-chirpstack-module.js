const vm = require('vm');
const fs = require('fs');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync('./dist/abw-at2-drv-chirpstack.js', 'utf8'), ctx);
const bytes = Array.from(Buffer.from('0a00f9860007', 'hex'));
console.log(JSON.stringify(ctx.decodeUplink({ bytes, fPort: 18 }), null, 2));
