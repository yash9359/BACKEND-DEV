const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly,checkAuth}= require("./middlewares/auth")

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

// ejs use ke liye view engine dikhana padega
app.set("view engine","ejs");
// ab ye bataunga ki meri files kaha rakhi hai ejs ki
// isko lane ke lie ek module use hota jiska naam path hota hai
app.set("views",path.resolve("./views"))

// json data ke liye
app.use(express.json());
// formm wale ke liye data ke liye
app.use(express.urlencoded({extended: false}))
// tabhi cookie ka use kar skte  jab ye middleware lagaynge
app.use(cookieParser());





// abb agar /url ko access karna to login hona jaruri
// iske liye hi restrictToLoggedinUserOnly ye banaya tha jo cookie ya session id pe based hai
// inline middleware hai
app.use("/url",restrictToLoggedinUserOnly, urlRoute);
// static route rendering ke liye hota hai, cahe user ki chize hi kyu naa render karni hoo signup and all stuff
app.use("/",checkAuth,staticRoute);

app.use("/user",userRoute);





app.listen(PORT, () => {
    console.log(`Server Started at PORT : ${PORT}`);
})