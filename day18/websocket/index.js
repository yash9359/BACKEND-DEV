const http = require("http");
const express = require("express");
const path  = require("path")
const {Server} = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
// socket = client
// user se message layega 
io.on("connection", (socket) =>{

    //front end se koi message ata hai too usse lo apne pass
    socket.on("user-message", message=>{
       // jistne bhi conection hai  =io, unko matlb ssre user ko bhej do 
       io.emit("message",message);
    })
})



app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
    console.log("ROOT ROUTE HIT");
    return res.sendFile("/public/index.html")
})


server.listen(9000,()=>{
     
    console.log("Server Started at PORT : 9000")
})


