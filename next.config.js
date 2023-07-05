/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  reactStrictMode: true,
  experimental: { appDir: true },
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ezirmusitua.site",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "blog.ezirmusitua.site",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "assets.ezirmusitua.site",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
      {
        protocol: "https",
        hostname: "cdn.v2ex.com",
        port: "",
        pathname: "/gravatar/**",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel, // optional
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            /* jsxImportSource: …, otherOptions… */
          },
        },
      ],
    });
    return config;
  },
};
