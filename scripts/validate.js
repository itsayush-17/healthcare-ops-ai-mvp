const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn, execFileSync } = require("child_process");

const rootDir = path.join(__dirname, "..");
const requiredFiles = [
  "package.json",
  "server.js",
  "README.md",
  "public/index.html",
  "public/dashboard.html",
  "public/styles.css",
  "public/dashboard.js",
  "public/sample-patients.csv",
  "docs/PRODUCT_BRIEF.md",
  "docs/PITCH_DECK.md",
  "docs/TECHNICAL_ARCHITECTURE.md",
  "docs/DATA_MODEL.md",
  "docs/TEST_PLAN.md"
];

function assertFileExists(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

function checkSyntax(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  execFileSync(process.execPath, ["--check", absolutePath], { stdio: "ignore" });
}

function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port: 3000,
        path: pathname
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on("error", reject);
  });
}

async function main() {
  requiredFiles.forEach(assertFileExists);
  ["server.js", "public/app.js", "public/dashboard.js"].forEach(checkSyntax);

  const server = spawn(process.execPath, ["server.js"], {
    cwd: rootDir,
    stdio: "ignore"
  });

  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const home = await request("/");
    const dashboard = await request("/dashboard.html");
    const health = await request("/health");

    if (home.statusCode !== 200 || !home.body.includes("PulsePath AI")) {
      throw new Error("Landing page validation failed.");
    }

    if (dashboard.statusCode !== 200 || !dashboard.body.includes("Care-gap operations dashboard")) {
      throw new Error("Dashboard validation failed.");
    }

    if (health.statusCode !== 200 || !health.body.includes('"status":"ok"')) {
      throw new Error("Health endpoint validation failed.");
    }

    console.log("Validation passed.");
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
