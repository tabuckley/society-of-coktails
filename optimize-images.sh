#!/bin/bash
# Optimise images for web — resize to max 1920px, compress to ~80% quality
# Overwrites originals in place

FFMPEG="/c/ffmpeg/bin/ffmpeg.exe"
IMAGES_DIR="$(dirname "$0")/images"
TEMP_FILE="/tmp/cms_img_opt_tmp.jpg"
count=0
skipped=0

echo "Starting image optimisation..."
echo ""

find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    # Get current file size
    size_before=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)

    "$FFMPEG" -hide_banner -loglevel error \
        -i "$file" \
        -vf "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease:flags=lanczos" \
        -q:v 4 \
        -y "$TEMP_FILE"

    if [ $? -eq 0 ]; then
        size_after=$(stat -c%s "$TEMP_FILE" 2>/dev/null || stat -f%z "$TEMP_FILE" 2>/dev/null)
        mv "$TEMP_FILE" "$file"
        saving=$(( (size_before - size_after) * 100 / size_before ))
        echo "✓ $(basename "$file") — ${size_before} → ${size_after} bytes (${saving}% smaller)"
    else
        echo "✗ Failed: $file"
    fi
done

echo ""
echo "Done."
