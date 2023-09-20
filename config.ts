import * as path from "path";

class Config {
  get storage() {
    return {
      token: process.env.NEXT_PUBLIC_STORAGE_TOKEN || "token",
      user: process.env.NEXT_PUBLIC_STORAGE_USER || "user",
    };
  }

  get token() {
    return localStorage.getItem(this.storage.token);
  }

  get site_title() {
    return process.env.NEXT_PUBLIC_SITE_TITLE || "三水言己";
  }

  get site_beian() {
    return process.env.NEXT_PUBLIC_SITE_BEIAN;
  }

  resource(path: string) {
    return `${process.env.NEXT_PUBLIC_RESOURCE_BASE}${path}`;
  }
}

class ApiConfig {
  get resource_base() {
    return process.env.RESOURCE_BASE || "http://localhost:3000";
  }

  get setting() {
    return {
      api: {
        bodyParser: {
          sizeLimit: "20gb",
        },
        responseLimit: "100gb",
      },
    };
  }

  get posts_dir() {
    return process.env.POSTS_DIR || "";
  }

  get cards_dir() {
    return process.env.CARDS_DIR || "";
  }

  get database() {
    return {
      location: process.env.DATABASE_LOCATION || "db",
      useLocalForage: process.env.DATABASE_USE_LOCAL_FORAGE === "true",
      synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
      autoSave: process.env.DATABASE_AUTOSAVE === "true",
    };
  }

  get comment() {
    return {
      host: process.env.COMMENT_HOST || "http://localhost:300",
      site_id: process.env.COMMENT_SITE_ID || "ezirmusitua_blog--dev",
      theme: "light",
      components: ["embed"] as any,
      enabled: process.env.COMMENT_ENABLED == "true",
    };
  }

  resource(path: string) {
    return process.env.RESOURCE_BASE + path;
  }

  post_file(name: string) {
    return path.join(this.posts_dir, name);
  }
}

const config = new Config();

export const api_config = new ApiConfig();
export default config;
