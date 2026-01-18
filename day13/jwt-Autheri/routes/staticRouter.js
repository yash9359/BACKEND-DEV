const  express = require("express");
const URL = require("../models/url");
const mongoose = require("mongoose");
const { restrictTo } = require("../middlewares/auth");

//static router ui router ke liye bante hai
const router  = express.Router();

router.get("/admin/urls", restrictTo(['ADMIN']),async(req,res)=>{

    const allurls = await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
})

router.get("/",restrictTo(['NORMAL',"ADMIN"]) ,async(req,res)=>{
    

   const userId = new mongoose.Types.ObjectId(req.user._id);
const allurls = await URL.find({ createdBy: userId });

    return res.render("home",{
        urls:allurls,
    });
})


router.get("/signup",(req,res)=>{
    // sign up ejs html file kholega
    return res.render("signup");
})
router.get("/login",(req,res)=>{
    return res.render("login");
})

module.exports = router;