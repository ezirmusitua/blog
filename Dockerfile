FROM node:18 AS builder

WORKDIR /app

COPY package.json yarn.lock /app

RUN --mount=type=cache,target=/app/.yarn,id=yarn_cache,sharing=locked \
    corepack enable && \
    corepack prepare yarn@3.6.1 --activate && \
    yarn config set npmRegistryServer "https://registry.npmmirror.com" && \
    yarn config set nodeLinker node-modules && \
    npm_config_sharp_binary_host="https://registry.npmmirror.com/-/binary/sharp" \
	  npm_config_sharp_libvips_binary_host="https://registry.npmmirror.com/-/binary/sharp-libvips" \
    yarn install

COPY . /app
COPY .artifacts/.env /app/.env.local

RUN --mount=type=cache,target=/app/.yarn,id=yarn_cache,sharing=locked \
    yarn build

FROM node:18-alpine AS server

EXPOSE 3000

WORKDIR /app

RUN --mount=type=cache,target=/tmp/dist,from=builder,source=/app/.next \
    cp -r /tmp/dist/standalone/. /app

CMD ["node", "server.js"]


