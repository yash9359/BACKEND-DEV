const express = require("express");
const path = require("path")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
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


app.use("/url", urlRoute);
// static route rendering ke liye hota hai
app.use("/",staticRoute);





app.listen(PORT, () => {
    console.log(`Server Started at PORT : ${PORT}`);
})