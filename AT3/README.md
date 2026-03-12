# Asset Tracker Driver v3

Make sure that you are in the `AT3` folder

```bash
cd AT3
```

Install dependencies

```bash
npm install
```

## Build

Build all drivers (UMD + ESM):

```bash
npm run build
```

Build the ChirpStack codec bundle only:

```bash
npm run build:chirpstack
```

The artifacts will be created in the `/dist` folder:

| File | Format | Usage |
|---|---|---|
| `abw-at3-drv.js` | UMD | Node.js / browser |
| `abw-at3-drv-min.js` | UMD minified | Node.js / browser |
| `abw-at3-drv.mjs` | ESM | ES modules |
| `abw-at3-drv-min.mjs` | ESM minified | ES modules |
| `abw-at3-drv-chirpstack.js` | UMD + global shim | ChirpStack codec |

## ChirpStack Integration

Upload `dist/abw-at3-drv-chirpstack.js` to ChirpStack:

```
Device Profiles → <your profile> → Codec → Custom JavaScript codec functions → paste → Submit
```

The bundle exposes `decodeUplink`, `decodeDownlink` and `encodeDownlink` as global functions
required by ChirpStack's JavaScript codec interface.

### Test locally

```bash
node -e "
const driver = require('./dist/abw-at3-drv.js');
const hex = '105e0c248a00000119ff3ff20436458000a10000000a1765';
const bytes = Array.from(Buffer.from(hex, 'hex'));
const result = driver.decodeUplink({ bytes, recvTime: new Date().toISOString(), fPort: 18 });
console.log(JSON.stringify(result, null, 2));
"
```

### Test in ChirpStack runtime (goja)

```bash
node -e "
const vm = require('vm');
const fs = require('fs');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync('./dist/abw-at3-drv-chirpstack.js', 'utf8'), ctx);
const bytes = Array.from(Buffer.from('105e0c248a00000119ff3ff20436458000a10000000a1765', 'hex'));
console.log(JSON.stringify(ctx.decodeUplink({ bytes, fPort: 18 }), null, 2));
"
```
