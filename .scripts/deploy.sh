#!/usr/bin/bash

sh .scripts/export_env.sh

mkdir app

rsync -r --exclude=.vscode --exclude=node_modules --exclude=app --exclude=.git --exclude=.next . app

zip app.zip app -r

ssh $REMOTE -t "mkdir /src"

scp app.zip $DEPLOY_TARGET:/src

# ssh -t $DEPLOY_TARGET < .scripts/update_app.sh

rm app.zip
rm -rf app