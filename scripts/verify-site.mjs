import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path));
const text = (path) => read(path).toString("utf8");
const html = text("dist/index.html");
const data = JSON.parse(text("src/data/portfolio.json"));
const protectedPaths = [
  "CNAME",
  "public/CNAME",
  "public/.htaccess",
  "public/_redirects",
  "public/sitemap.xml",
  ".github/workflows/deploy.yml",
  "netlify.toml",
  "vite.config.ts",
  ".env.example",
  ".npmrc",
  "package.json",
  "tsconfig.json",
  "src/main.tsx",
  "src/vite-env.d.ts",
];
const baseline = process.argv[2] || "462e396e5c5e5f93cdded645d7a6aff1c0723d5b";
for (const path of protectedPaths) {
  const previous = execFileSync("git", ["show", `${baseline}:${path}`], {
    cwd: root,
  });
  assert.ok(
    read(path).equals(previous),
    `Hosting/runtime file changed: ${path}`,
  );
}
for (const field of ["majorCapabilities", "requestFramePermissions"]) {
  const previous = JSON.parse(
    execFileSync("git", ["show", `${baseline}:metadata.json`], { cwd: root }),
  );
  assert.deepEqual(
    JSON.parse(text("metadata.json"))[field],
    previous[field],
    `${field} changed`,
  );
}
for (const path of ["CNAME", ".htaccess", "_redirects", "sitemap.xml"]) {
  assert.ok(
    read(`dist/${path}`).equals(read(`public/${path}`)),
    `Build lost ${path}`,
  );
}
assert.match(text("dist/CNAME"), /^www\.storive\.in\s*$/);
assert.match(html, /rel="canonical" href="https:\/\/www\.storive\.in\/"/);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  assert.ok(
    existsSync(resolve(root, "dist", match[1].slice(1))),
    `Missing build asset: ${match[1]}`,
  );
}
for (const project of data.projects) {
  const image = read(`dist/images/${project.id}.webp`);
  assert.equal(image.subarray(8, 12).toString(), "WEBP");
  assert.ok(
    project.blocks.length > 0 &&
      project.blocks.every((block) => block.length === 2),
  );
}
assert.equal(
  read("dist/catalogs/Ideolect-Company-Brief.pdf").subarray(0, 5).toString(),
  "%PDF-",
);
assert.equal(
  read("dist/images/ideolect-social.png").subarray(1, 4).toString(),
  "PNG",
);
assert.ok(!html.includes("35/35"), "Old benchmark claim remains in metadata");
console.log(
  `PASS: ${protectedPaths.length} preserved files, capability/permission fields, build routing files, canonical domain, product images, PDF and social card.`,
);
