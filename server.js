const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

function safeResolve(urlPath) {
  const requested = urlPath === "/" ? "/index.html" : urlPath;
  const sanitized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  return path.join(publicDir, sanitized);
}

const server = http.createServer((req, res) => {
  const routePath = req.url.split("?")[0];

  if (routePath === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ status: "ok", app: "PulsePath AI" }));
    return;
  }

  const filePath = safeResolve(routePath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        const notFoundPath = path.join(publicDir, "404.html");
        fs.readFile(notFoundPath, (fallbackError, fallbackContent) => {
          if (fallbackError) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("404 Not Found");
            return;
          }
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end(fallbackContent);
        });
        return;
      }

      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal server error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`PulsePath AI running at http://localhost:${port}`);
});
