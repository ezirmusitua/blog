# Blog

## 项目结构

```plain
├── .dockerignore
├── .eslintrc
├── .gitignore
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

1. 将 `markdown` 文件保存到 posts 文件夹中

2. 执行 `git add .`

3. 执行 `git commit -m <msg>`(需要 lint 通过)

3. 执行 `git push`(push 到远端之前会执行部署, 参见 .scripts/deploy.sh)
