const express = require("express");


const app = express();
app.get("/",(req,res)=>{
    return res.send("Hello from home page"+ " hey "+ req.query.myname);
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About page"+" hey "+ req.query.myname);
})

app.get("/profile",(req,res)=>{
    return res.send(`Profile  Page`);
})


app.listen(8000, () => {
    console.log("Server Started!");
})




