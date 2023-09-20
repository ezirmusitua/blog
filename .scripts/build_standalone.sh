#!/bin/sh
next build
cp -r public .next/standalone/public
cp -r posts .next/standalone/posts
cp -r cards .next/standalone/cards
cp -r .next/static .next/standalone/.next/static
cp -r .artifacts .next/standalone/.artifacts
cp .env.local .next/standalone/.env.local
