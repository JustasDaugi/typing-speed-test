import http from "node:http";
import fs from "node:fs";
import dotenv from "dotenv";
import path from "node:path";

const __dirname = path.dirname(
  decodeURI(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:\/)/, "$1")
);

const configPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: configPath });
const hostname = "127.0.0.1";
const port = 8080;

const basePath = path.join(__dirname, "../../");
if (!basePath) {
  console.error("Error: Base path could not be set.");
  process.exit(1);
}

console.log(`Serving files from: ${basePath}`);

const server = http.createServer((req, res) => {
  let filePath = path.join(
    basePath,
    req.url === "/" ? "index.html" : req.url.slice(1)
  );
  filePath = path.normalize(filePath);

  console.log(`Attempting to serve: ${filePath}`);
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.error(`Error accessing file: ${filePath}`, error);
      res.writeHead(404);
      res.end("404 Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
