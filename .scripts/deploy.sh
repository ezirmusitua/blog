#!/usr/bin/bash

REMOTE=${1:-"qcloud.apple"}
APP=${2:-"blog"}

rsync -av --delete \
  --exclude=.vscode \
  --exclude=node_modules \
  --exclude=posts \
  --exclude=.git \
  --exclude=.next \
  --exclude=.vscode \
  --exclude=.env.local \
  . \
  $REMOTE:/src/blog

ssh -t $REMOTE "cd /src/blog && bash .scripts/start.sh ${APP}"

