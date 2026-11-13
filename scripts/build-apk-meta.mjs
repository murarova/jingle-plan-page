import { createHash } from "node:crypto";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apkPath = resolve(root, "public/downloads/jingle-plan.apk");
const versionPath = resolve(root, "public/downloads/version.txt");
const outPath = resolve(root, "public/config/apk.json");

function sha256(file) {
  return new Promise((resolveHash, reject) => {
    const hash = createHash("sha256");
    createReadStream(file)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolveHash(hash.digest("hex")))
      .on("error", reject);
  });
}

mkdirSync(dirname(outPath), { recursive: true });

if (!existsSync(apkPath)) {
  writeFileSync(outPath, `${JSON.stringify({ available: false, version: "", sizeBytes: 0, sha256: "" }, null, 2)}\n`);
  console.log("apk: file not found, wrote available=false");
} else {
  const version =
    process.env.APK_VERSION ?? (existsSync(versionPath) ? readFileSync(versionPath, "utf8").trim() : "");
  const meta = {
    available: true,
    version,
    sizeBytes: statSync(apkPath).size,
    sha256: await sha256(apkPath),
  };
  writeFileSync(outPath, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`apk: ${meta.version || "no version"} ${meta.sizeBytes} bytes sha256=${meta.sha256}`);
}
