FROM node:16

ENV NEXT_PUBLIC_RESOURCE_BASE=https://ezirmusitua.site \
    NEXT_PUBLIC_SITE_TITLE=三水言己 \
    NEXT_PUBLIC_SITE_BEIAN=沪ICP备2022003729号-1 \
    DATABASE_LOCATION=/data/sample \
    DATABASE_USE_LOCAL_FORAGE=true \
    DATABASE_SYNCHRONIZE=false \
    DATABASE_AUTOSAVE=true \
    POSTS_DIR=/app/posts \
    RESOURCE_BASE=https://ezirmusitua.site

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/ && \
  npm config set sharp_binary_host https://npmmirror.com//mirrors/sharp && \
  npm config set sharp_libvips_binary_host https://npmmirror.com//mirrors/sharp-libvips && \
  npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


