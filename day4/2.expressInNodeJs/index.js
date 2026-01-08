/// http server 




// abb express  libary managao

const express = require("express");

// ye app handler fn hai 
// query built in hai benifit routs ko handle karta hai
const app = express();
app.get("/",(req,res)=>{
    return res.send("Hello from home page"+ " hey "+ req.query.myname);
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About page"+" hey "+ req.query.myname);
})


/// express abb hme handlesr fn ki zaroorat nahi hmm express se handler ko  achaa 
// function myHandler(req,res) {

    
//     if (req.url === "/favicon.ico") return res.end();

//     // req method ka use
//     const log = `${Date.now()}:${req.method} ${req.url} New Req Received\n`;

//     const myUrl = url.parse(req.url, true);



//     console.log(myUrl);



//     fs.appendFile("log.txt", log, (err, data) => {

//         switch (myUrl.pathname) {
//             case '/':
//                 if(req.method==="GET"){
//                     res.end("Hello you are in Home page");
//                 }
//                 break;
//             case '/about':
//                 const username = myUrl.query.myname
//                 res.end(`Hi, ${username}`);
//                 break;
//             case "/search":
//                 const search = myUrl.query.search_req;
//                 res.end("Here are your result of Search " + search);
//                 break;
//             case "/signup" :
//                 if(req.method === 'GET'){
//                     res.end("THis is the sign up form")
//                 }
//                 else if(req.method==="POST"){
//                     //DB Query
//                     res.end("Success");
//                 }
//                 break;
//             default:
//                 res.end("404 Not Found")
//         }


//         // res.end("Hello From Server Again")
//     });

// }

// express js hme khud my handler fn de degi ye hamara wala bhaut mesii hai express isi ko asan banata hai

/// express se handler fn banaya abb yaha query parameter ki bhi chinta nahi hai

// experss kehti  hai mujhe http ki bhi zaroorat nahi mai khud hi bana lungi bss listen dedo

// const myServer = http.createServer(app);

/// server ko run ke liye hme port number ki zarrorat hoti hai

app.listen(8000, () => {
    console.log("Server Started!");
})