#!/usr/bin/bash

REMOTE=${1:-"qcloud.apple"}

rsync -av \
  --exclude=.vscode \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.next \
  --exclude=.vscode \
  . \
  $REMOTE:/src/blog

ssh -t $REMOTE < .scripts/start.sh

