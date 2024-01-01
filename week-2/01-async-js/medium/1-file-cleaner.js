const fs = require("fs");

async function cleanFile(filepath) {
    try {
        const data = await _readFile(filepath);
        const cleanData = data.replace(/ +/g, ' ');
        await _writeFile('file.txt', cleanData);
    } catch (error) {
        console.error(error);
    }
}

function _readFile(filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, "utf8", (err, data) => {
        if (err) reject(err.message);
        resolve(data);
        });
    });
}

function _writeFile(filepath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filepath, data, (error) => {
        if (error) reject(error.message);
        resolve("File cleaned successfully...");
        });
    });
}

cleanFile("file.txt");
