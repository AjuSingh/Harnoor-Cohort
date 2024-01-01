const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data); //3
});
console.log("exepnsive task started.."); //1
for (let i = 0; i < 1000000000000; i++) {}
console.log("exepnsive task ended.."); //2
