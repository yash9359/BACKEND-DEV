const express = require("express");
const {connectMongoDb} = require("./connection");

// middleware fn call
const {logReqRes} = require("./middlewares");

// routes
const userRouter = require("./routes/user");



const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");

//Middleware-plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// express ko bola user ko request ayee to tum userrouter cahalna middle ware kar dega(user router)
app.use("/api/users",userRouter);

// Routes abbb routes se ayega

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT} `);
    
});
