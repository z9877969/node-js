// v-1
// import http from "http";

// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.end("Hello world!");
// });
// server.listen(port, () => {
//   console.log(`SERVER START ON PORT ${port}`);
// });
// END==v-1

// v-2
import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const contentType = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const a = url.parse(req.url);
  console.log("a :>> ", a);
  let filename = "/654/321".substring(1);
  console.log("filename :>> ", filename);
  if (pathname === "/") {
    filename = "index.html";
  }
  const type = contentType[path.extname(filename)];
  res.writeHead(200, { "Content-Type": type });
  if (type.includes("image")) {
    const img = await fs.readFile(filename);
    res.write(img, "hex");
  } else {
    const content = await fs.readFile(filename, "utf8");
    res.write(content);
  }
  res.end();
});

server.listen(3000, () => {
  console.log("===================");
  console.log("SERVER ON PORT 3000");
  console.log("===================");
});
