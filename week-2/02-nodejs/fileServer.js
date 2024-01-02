/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const path = require("path");
const { readFileDir, readFile } = require("./utils/methods");
const app = express();
const PORT = 3000;

app.get("/files", async (req, res) => {
  try {
    const _path = path.join(__dirname,'./files');
    const files = await readFileDir(_path);
    res.status(200).json({ files: files });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/files/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const _path = path.join(__dirname,'./files',filename);
    const data = await readFile(_path);
    res.status(200).json({ data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = app;
