/// http server 
// made a simple log server using http module

const http = require("http");
const fs = require('fs');
const url = require("url");

// ye hamre liye web server bana dega http.createServer
/// server handel bhi too karna hogaa kon karega handler fn jo incoming request handle karega uske andr reqest atii and respone deta
const myServer = http.createServer((req, res) => {


    if (req.url === "/favicon.ico") return res.end();

    // req method ka use
    const log = `${Date.now()}:${req.method} ${req.url} New Req Received\n`;

    const myUrl = url.parse(req.url, true);



    console.log(myUrl);



    fs.appendFile("log.txt", log, (err, data) => {

        switch (myUrl.pathname) {
            case '/':
                if(req.method==="GET"){
                    res.end("Hello you are in Home page");
                }
                break;
            case '/about':
                const username = myUrl.query.myname
                res.end(`Hi, ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_req;
                res.end("Here are your result of Search " + search);
                break;
            case "/signup" :
                if(req.method === 'GET'){
                    res.end("THis is the sign up form")
                }
                else if(req.method==="POST"){
                    //DB Query
                    res.end("Success");
                }
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