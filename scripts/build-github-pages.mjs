import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "_site");
const repository = process.env.GITHUB_REPOSITORY ?? process.argv[2];

if (!repository || !/^[^/]+\/[^/]+$/.test(repository)) {
  throw new Error("Set GITHUB_REPOSITORY to the GitHub owner/repository name.");
}

const [owner, name] = repository.split("/");
const isUserSite = name.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = isUserSite ? "" : `/${name}`;
const siteUrl = `https://${owner.toLowerCase()}.github.io${basePath}`;

function copySite(source, destination) {
  mkdirSync(destination, { recursive: true });

  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (
      entry.name === ".git" ||
      entry.name === ".github" ||
      entry.name === "_site" ||
      entry.name === "_redirects" ||
      entry.name === "scripts" ||
      entry.name === "README.md" ||
      entry.name.startsWith(".")
    ) {
      continue;
    }

    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copySite(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      cpSync(sourcePath, destinationPath);
    }
  }
}

function rewriteHostedUrls(text) {
  return text.replace(/https:\/\/cingles\.cl(\/[A-Za-z0-9._/-]*)?/g, (url) => {
    const pathname = url.slice("https://cingles.cl".length);
    if (!pathname || pathname === "/") return `${siteUrl}/`;

    const localPath = pathname.replace(/^\//, "");
    if (existsSync(path.join(root, `${localPath}.html`))) {
      return `${siteUrl}/${localPath}.html`;
    }

    return `${siteUrl}${pathname}`;
  });
}

rmSync(output, { recursive: true, force: true });
copySite(root, output);

const errorPage = path.join(output, "404.html");
const errorHtml = readFileSync(errorPage, "utf8").replace(
  /(href|src)="\/(?!\/)/g,
  `$1="${basePath}/`,
);
writeFileSync(errorPage, errorHtml);

for (const entry of readdirSync(output, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(html|xml|txt)$/i.test(entry.name)) continue;

  const file = path.join(output, entry.name);
  const contents = readFileSync(file, "utf8");
  writeFileSync(file, rewriteHostedUrls(contents));
}

writeFileSync(path.join(output, ".nojekyll"), "");
