const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {checkForAuthentication,restrictTo}= require("./middlewares/auth")

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectTOMongoDB } = require("./connection");
const URL = require("./models/url");


const app = express();
const PORT = 8001;

connectTOMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB connected");
})


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Authentication hrr baar check hogi = admin ho kya hoo
app.use(checkForAuthentication);




app.use("/url", restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);





app.listen(PORT, () => {
    console.log(`Server Started at PORT : ${PORT}`);
})