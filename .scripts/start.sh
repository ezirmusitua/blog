#!/bin/bash

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
  nerdctl build . -t ezirmusitua_blog
  nerdctl stop blog && nerdctl rm blog
  nerdctl run -p 3000:3000 -d --name blog ezirmusitua_blog
  sleep 3
  nerdctl logs blog
  nginx -t && nginx -s reload
popd

