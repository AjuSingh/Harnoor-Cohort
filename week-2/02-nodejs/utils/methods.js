const fs = require("fs");

function readFileDir(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, { encoding: "utf-8" }, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });
}

function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function writeFile(path, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, (err) => {
            if (err) reject(err);
            resolve();
        })
    });
}

//to fetch all todos from the file
async function getTodos(_path){
    const data = await readFile(_path);
    const todos = JSON.parse(data);
    return todos;
}


exports.readFileDir = readFileDir;
exports.readFile = readFile;
exports.getTodos = getTodos;
exports.writeFile = writeFile;
