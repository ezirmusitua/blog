const fs = require("fs-extra");
const path = require("path");
const AdmZip = require("adm-zip");

if (fs.existsSync("app")) {
  fs.rmdirSync("app", { recursive: true });
}

fs.mkdirSync("app");

const excluded = [
  ".next",
  ".git",
  ".vscode",
  "node_modules",
  "app"
]

fs.readdirSync(".").forEach((fn) => {
  if (!excluded.includes(fn)) {
    fs.copySync(fn, path.join("app", fn));
  }
})

const zip = new AdmZip();
zip.addLocalFolder("app", "app")
zip.writeZip("app.zip");



