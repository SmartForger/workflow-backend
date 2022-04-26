ENVFILE=./scripts/env.sh
if [[ -f "$ENVFILE" ]]; then
  source $ENVFILE
fi

berglas exec -- npm run migration:run