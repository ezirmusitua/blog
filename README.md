# Blog

## 开发环境要求

安装 [Node.js 16](https://nodejs.org/en/download/), 推荐使用 [nvm](https://github.com/nvm-sh/nvm#git-install) 安装.

## 部署环境要求

```bash
sudo apt update -y && sudo apt install unzip docker.io nginx

echo '
server {
        listen 80;
        listen [::]:80;
        # listen 443 ssl;
        # listen [::]:443;
        server_name <your_site>;
        # ssl_certificate     /etc/ssl/certs/<your_site>_bundle.crt;
        # ssl_certificate_key /etc/ssl/private/<your_site>.key;
        # ssl_session_timeout 5m;
        # ssl_protocols TLSv1.2 TLSv1.3; 
        # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
        # ssl_prefer_server_ciphers on;
        location / {
                proxy_pass http://localhost:3000;
        }
}
'
```

## 项目结构

```plain
├── .dockerignore
├── .eslintrc
├── .gitignore
├── .env
├── .scripts
│   ├── deploy.sh
│   └── update_app.sh
├── Dockerfile
├── README.md
├── components
│   ├── Header.js
│   └── Post.js
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.js
│   ├── blog
│   └── index.js
├── posts
│   ├── **.md
├── public
│   ├── favicon.ico
│   ├── images
├── styles
│   └── globals.css
└── utils
    └── index.js
```

## HOW TO

1. 在 `.env` 文件中调整基本站点数据

2. 将 `markdown` 文件保存到 posts 文件夹中

3. 执行 `git add .`

4. 执行 `git commit -m <msg>`(需要 lint 通过)

5. 执行 `git push`(push 到远端之前会执行部署, 参见 .scripts/deploy.sh)
