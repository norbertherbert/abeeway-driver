# Abeeway Asset Tracker Drivers

## AT2: Asset Tracker Driver v2

Published builds are attached to GitHub Releases tagged as `at2-v<version>`.

For local development, build the package with `npm ci && npm run build` inside `AT2`. The compiled artifacts are written to `AT2/dist`:

| File | Format | Intended usage |
| --- | --- | --- |
| `abw-at2-drv.js` | UMD, minified | General-purpose build for CommonJS/Node.js and direct browser script usage |
| `abw-at2-drv-src.js` | UMD, non-minified | Same as above, but easier to inspect and debug |
| `abw-at2-drv.mjs` | ESM, minified | ES module build for `import`-based usage in browsers or modern runtimes |
| `abw-at2-drv-chirpstack.js` | UMD, minified, with ChirpStack global function shim | ChirpStack codec script |

See example usage patterns in the `AT2/examples` folder

## AT3: Asset Tracker Driver v3

Published builds are attached to GitHub Releases tagged as `at3-v<version>`.

For local development, build the package with `npm ci && npm run build` inside `AT3`. The compiled artifacts are written to `AT3/dist`:

| File | Format | Intended usage |
| --- | --- | --- |
| `abw-at3-drv.js` | UMD, minified | General-purpose build for CommonJS/Node.js and direct browser script usage |
| `abw-at3-drv-src.js` | UMD, non-minified | Same as above, but easier to inspect and debug |
| `abw-at3-drv.mjs` | ESM, minified | ES module build for `import`-based usage in browsers or modern runtimes |
| `abw-at3-drv-chirpstack.js` | UMD, minified, with ChirpStack global function shim | ChirpStack codec script |

See example usage patterns in the `AT3/examples` folder

## Release automation

The GitHub Actions workflow at `.github/workflows/release.yml` publishes release assets for either package.

- Push a tag named `at2-v<version>` to release `AT2`.
- Push a tag named `at3-v<version>` to release `AT3`.
- The tag version must match the `version` field in the corresponding `package.json`.
- Each release attaches the raw `dist` files, a versioned `.zip`, and `SHA256SUMS.txt`.

### Release flow

1. Update the version in `AT2/package.json` or `AT3/package.json`.
2. Commit and push the version change.

   ```powershell
   git add AT2/package.json AT3/package.json
   git commit -m "Release preparation"
   git push origin main
   ```

3. Create the matching tag:
   `at2-v<version>` for `AT2`
   `at3-v<version>` for `AT3`

   ```powershell
   git tag at2-v3.8.8
   ```

4. Push the tag to GitHub.

   ```powershell
   git push origin at2-v3.8.8
   ```

5. The GitHub Actions workflow builds the package and publishes the release artifacts.

