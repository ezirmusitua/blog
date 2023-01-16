#!/bin/bash

set -x
sudo ln -sf \
  /src/blog/.artifacts/configs/ezirmusitua.site_bundle.crt \
  /etc/ssl/certs/ezirmusitua.site_bundle.crt

sudo ln -sf \
  /src/blog/.artifacts/configs/ezirmusitua.site.key \
  /etc/ssl/private/ezirmusitua.site.key

sudo ln -sf \
  /src/blog/.artifacts/configs/ezirmusitua.site \
  /etc/nginx/sites-enabled/ezirmusitua.site
set +x

pushd /src/blog
  docker build . -t ezirmusitua_blog
  docker stop blog
  docker rm blog
  docker run -p 3000:3000 -d --name blog ezirmusitua_blog
  sleep 3
  docker logs blog
  nginx -s reload
popd

