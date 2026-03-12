# Asset Tracker Driver v2

## Install

```bash
cd AT2
npm install
```

## Build

Build all artifacts:

```bash
cd AT2
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

Upload `dist/abw-at3-drv-chirpstack.js` to ChirpStack:

```txt
Device Profiles → <your profile> → Codec → Custom JavaScript codec functions → paste → Submit
```

This bundle exposes `decodeUplink`, `decodeDownlink`, and `encodeDownlink` as global
functions, as required by ChirpStack's JavaScript codec interface.
