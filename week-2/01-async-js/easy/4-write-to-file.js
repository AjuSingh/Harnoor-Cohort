const fs = require("fs");

fs.writeFile('file.txt','Hello world!',(err)=>{
    if(err) throw new Error(err);
    console.log('file written successfully..'); //3
})

console.log("exepnsive task started.."); //1
for(let i=0; i<10000;i++){

}
console.log("exepnsive task ended.."); //2
