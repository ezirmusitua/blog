#!/usr/bin/bash

while read line; do export $line; done < .env

echo $DEPLOY_TARGET

mkdir app

rsync -r --exclude=.vscode --exclude=node_modules --exclude=app --exclude=.git --exclude=.next . app

zip app.zip app -r

scp app.zip $DEPLOY_TARGET:/src

ssh -t $DEPLOY_TARGET < .scripts/update_app.sh

rm app.zip
rm -rf app