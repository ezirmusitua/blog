FROM node:16

WORKDIR /src/app

COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/ && \
  npm config set sharp_binary_host https://npmmirror.com//mirrors/sharp && \
  npm config set sharp_libvips_binary_host https://npmmirror.com//mirrors/sharp-libvips && \
  npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

