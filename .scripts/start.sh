#!/bin/bash

APP=${1:-"blog"}

set -x
sudo ln -sf \
  /src/blog/.artifacts/certs/ezirmusitua.site_bundle.crt \
  /etc/ssl/certs/ezirmusitua.site_bundle.crt

sudo ln -sf \
  /src/blog/.artifacts/certs/ezirmusitua.site.key \
  /etc/ssl/private/ezirmusitua.site.key

sudo ln -sf \
  /src/blog/.artifacts/nginx/ezirmusitua.site \
  /etc/nginx/sites-enabled/ezirmusitua.site

set +x

pushd /src/blog
  nerdctl build . -t ezirmusitua/blog
  nerdctl stop $APP && nerdctl rm $APP 
  nerdctl run -p 3000:3000 -d --name $APP ezirmusitua/blog
  sleep 3
  nerdctl logs $APP
  nginx -t && nginx -s reload
popd

