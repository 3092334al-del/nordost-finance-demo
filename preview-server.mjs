import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png" };

http.createServer(async (req, res) => {
  const requested = req.url === "/" ? "/index.html" : req.url;
  const file = path.join(root, requested.replace(/^\//, ""));
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4174, "127.0.0.1", () => console.log("http://127.0.0.1:4174"));
