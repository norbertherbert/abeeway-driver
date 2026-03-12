# Asset Tracker Driver v2

Make sure you are in the `AT2` folder:

```bash
cd AT2
```

Install dependencies:

```bash
npm install
```

## Build

Build all artifacts:

```bash
npm run build
```

The build outputs are written to the `/dist` folder:

| File | Format | Intended usage |
| --- | --- | --- |
| `abw-at2-drv.js` | UMD, minified | General-purpose build for CommonJS/Node.js and direct browser script usage |
| `abw-at2-drv-src.js` | UMD, non-minified | Same as above, but easier to inspect and debug |
| `abw-at2-drv.mjs` | ESM, minified | ES module build for `import`-based usage in browsers or modern runtimes |
| `abw-at2-drv-chirpstack.js` | UMD, minified, with ChirpStack global function shim | ChirpStack codec script |

## ChirpStack Integration

To use the driver in ChirpStack, paste the contents of `dist/abw-at2-drv-chirpstack.js` into:

```txt
Device Profiles → <your profile> → Codec → Custom JavaScript codec functions → paste → Submit
```

This bundle exposes `decodeUplink`, `decodeDownlink`, and `encodeDownlink` as global
functions, as required by ChirpStack's JavaScript codec interface.

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
