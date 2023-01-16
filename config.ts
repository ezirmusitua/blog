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

  resource(path: string) {
    return `${process.env.NEXT_PUBLIC_RESOURCE_BASE}${path}`;
  }

  get site_beian() {
    return process.env.NEXT_PUBLIC_SITE_BEIAN;
  }
}

class ApiConfig {
  get resource_base() {
    return process.env.RESOURCE_BASE || "http://localhost:3000";
  }

  resource(path: string) {
    return process.env.RESOURCE_BASE + path;
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

  get post_dir() {
    return process.env.POSTS_DIR || "";
  }

  post(name: string) {
    return path.join(this.post_dir, name);
  }

  get database() {
    return {
      location: process.env.DATABASE_LOCATION || "db",
      useLocalForage: process.env.DATABASE_USE_LOCAL_FORAGE === "true",
      synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
      autoSave: process.env.DATABASE_AUTOSAVE === "true",
    };
  }
}

const config = new Config();

export default config;

export const api_config = new ApiConfig();
