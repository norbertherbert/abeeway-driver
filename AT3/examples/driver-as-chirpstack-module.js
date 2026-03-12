const vm = require('vm');
const fs = require('fs');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync('./dist/abw-at3-drv-chirpstack.js', 'utf8'), ctx);
const bytes = Array.from(Buffer.from('105e0c248a00000119ff3ff20436458000a10000000a1765', 'hex'));
console.log(JSON.stringify(ctx.decodeUplink({ bytes, fPort: 18 }), null, 2));