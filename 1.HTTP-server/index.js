/// http server 
// made a simple log server using http module

const http = require("http");
const fs = require('fs');

// ye hamre liye web server bana dega http.createServer
/// server handel bhi too karna hogaa kon karega handler fn jo incoming request handle karega uske andr reqest atii and respone deta
const myServer = http.createServer((req, res) => {
    
    const log =`${Date.now()}:${req.url} New Req Received\n`;
    fs.appendFile("log.txt",log,(err,data)=>{

        switch(req.url){
            case '/': res.end("Hello you are in Home page");
            break;
            case '/about':res.end("I am Yash Gupta");
            break;
            default:
                res.end("404 Not Found")
        }


        // res.end("Hello From Server Again")
    });
    
});

/// server ko run ke liye hme port number ki zarrorat hoti hai
myServer.listen(8000, () => {
    console.log("Server Started!");
})