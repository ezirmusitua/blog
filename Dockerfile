FROM node:16 AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN --mount=type=cache,target=/app/node_modules,id=app_node_modules,sharing=locked \
    --mount=type=cache,target=/root/.npm,id=npm_cache \
    yarn --registry=https://registry.npmmirror.com

COPY . .
COPY .artifacts/.env .env.local

RUN --mount=type=cache,target=/app/node_modules,id=app_node_modules,sharing=locked \
    yarn build

FROM node:16-alpine AS server

EXPOSE 3000

WORKDIR /app

RUN yarn config set sharp_binary_host https://npmmirror.com/mirrors/sharp && \
  yarn config set sharp_libvips_binary_host https://npmmirror.com/mirrors/sharp-libvips && \
  yarn add sharp

RUN --mount=type=cache,target=/tmp/dist,from=builder,source=/app/.next \
    cp -r /tmp/dist/standalone/. /app

CMD ["node", "server.js"]


