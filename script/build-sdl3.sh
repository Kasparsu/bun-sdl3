#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
INSTALL_DIR="$PROJECT_DIR/vendor/SDL3/install"

# Build in a fast filesystem (NTFS on WSL is slow)
BUILD_BASE="/tmp/sdl3-build"
SOURCE_DIR="$BUILD_BASE/source"
BUILD_DIR="$BUILD_BASE/build"

echo "=== SDL3 Build Script ==="

# Clone if not already present
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Cloning SDL3..."
  mkdir -p "$BUILD_BASE"
  git clone --depth 1 https://github.com/libsdl-org/SDL.git "$SOURCE_DIR"
else
  echo "SDL3 source already present at $SOURCE_DIR"
fi

# Build
echo "Building SDL3..."
cmake -S "$SOURCE_DIR" -B "$BUILD_DIR" -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_INSTALL_PREFIX="$INSTALL_DIR" \
  -DSDL_SHARED=ON \
  -DSDL_STATIC=OFF \
  -DSDL_TEST_LIBRARY=OFF \
  -DSDL_TESTS=OFF

ninja -C "$BUILD_DIR" -j"$(nproc)"

# Install to project vendor directory
echo "Installing to $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"
ninja -C "$BUILD_DIR" install

echo "=== SDL3 build complete ==="
echo "Library: $(find "$INSTALL_DIR" -name 'libSDL3.so*' | head -1)"
