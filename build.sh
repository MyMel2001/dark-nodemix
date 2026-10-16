
#!/usr/bin/env bash
set -euo pipefail

OUTPUT="dark-nodemix"

# Zip non-hidden contents, excluding build.sh and output archives.
zip -r "${OUTPUT}.zip" ./* \
    -x "./build.sh" \
       "./${OUTPUT}.zip" \
       "./${OUTPUT}.crx"

# Rename ZIP to CRX.
mv "${OUTPUT}.zip" "${OUTPUT}.crx"

echo "Created ${OUTPUT}.crx"
