#!/usr/bin/bash

mkdir app

rsync -r --exclude=node_modules --exclude=app --exclude=.git --exclude=.next . app

zip app.zip app -r

scp app.zip qcloud.apple:/src

ssh -t qcloud.apple < .scripts/update_app.sh

rm app.zip
rm -rf app