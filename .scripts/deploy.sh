#!/usr/bin/bash

REMOTE=${1:-"qcloud.apple"}
APP=${2:-"blog"}

rsync -avL --delete \
  --exclude={.git,.next,.vscode,.yarn,node_modules} \
  --exclude=.env.local \
  . \
  $REMOTE:/src/blog

ssh -t $REMOTE "cd /src/blog && bash .scripts/start.sh ${APP}"

