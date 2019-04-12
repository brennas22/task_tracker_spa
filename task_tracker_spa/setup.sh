#!/bin/bash
export MIX_ENV=prod
export PORT=4794
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"
echo "Construction has begun."
mkdir -p ~/.config
mkdir -p priv/static
mix deps.get
mix compile
(cd assets && npm install)
(cd assets && npm rebuild node-sass)
(cd assets &&  webpack --mode production)
mix phx.digest
echo "Creating Release."
mix release
