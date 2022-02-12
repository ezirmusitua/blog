#!/usr/bin/bash
pushd /src
unzip -o app.zip
pushd app
docker build . -t ezirmusitua/blog
popd
docker stop blog
docker rm blog
docker run -p 3000:3000 -d --name blog ezirmusitua/blog
sleep 3
docker logs blog
popd
rm -rf app.zip

