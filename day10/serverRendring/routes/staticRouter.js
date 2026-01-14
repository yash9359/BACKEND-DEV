const  express = require("express");
const URL = require("../models/url");

//static router ui router ke liye bante hai
const router  = express.Router();


router.get("/", async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
})

module.exports = router;