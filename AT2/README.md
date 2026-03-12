# Asset Tracker Driver v2

Make sure that you are in the `AT2` folder

```bash
cd AT2
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
| `abw-at2-drv.js` | UMD | Node.js / browser |
| `abw-at2-drv-min.js` | UMD minified | Node.js / browser |
| `abw-at2-drv.mjs` | ESM | ES modules |
| `abw-at2-drv-min.mjs` | ESM minified | ES modules |
| `abw-at2-drv-chirpstack.js` | UMD + global shim | ChirpStack codec |

## ChirpStack Integration

Upload `dist/abw-at2-drv-chirpstack.js` to ChirpStack:

```
Device Profiles → <your profile> → Codec → Custom JavaScript codec functions → paste → Submit
```

The bundle exposes `decodeUplink`, `decodeDownlink` and `encodeDownlink` as global functions
required by ChirpStack's JavaScript codec interface.

### Test locally

```bash
node -e "
const driver = require('./dist/abw-at2-drv.js');
const bytes = Array.from(Buffer.from('<payload_hex>', 'hex'));
const result = driver.decodeUplink({ bytes, fPort: 18 });
console.log(JSON.stringify(result, null, 2));
"
```

### Test in ChirpStack runtime (goja)

```bash
node -e "
const vm = require('vm');
const fs = require('fs');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync('./dist/abw-at2-drv-chirpstack.js', 'utf8'), ctx);
const bytes = Array.from(Buffer.from('<payload_hex>', 'hex'));
console.log(JSON.stringify(ctx.decodeUplink({ bytes, fPort: 18 }), null, 2));
"
```
