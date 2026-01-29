const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib")

const app = express();
const PORT = 8000;

app.use(status());

/// 400mb -> 400mb(xip)-> 800mb write
/// stream read -> 400mb(Zip)->

//pipe ka matlb jo data aa raha kaha send karna hai
fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")));

app.get("/",(req,res)=>{


   const stream = fs.createReadStream("./sample.txt","utf-8");

    stream.on("data",(chunk)=>{
        res.write(chunk);
    });
    stream.on("end", ()=>{
        res.end();
    })


});

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
   
});