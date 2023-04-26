#!/usr/bin/bash

REMOTE=${1:-"qcloud.apple"}

rsync -av --delete \
  --exclude=.vscode \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.next \
  --exclude=.vscode \
  --exclude=.env.local \
  . \
  $REMOTE:/src/blog

ssh -t $REMOTE < .scripts/start.sh

