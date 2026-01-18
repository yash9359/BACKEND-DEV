

const User = require("../models/user");
const {setUser,getUser} = require("../service/auth");

async function handleUserSignup(req,res) {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    // jese hi signup hoga then vo turant  home pe redirect kar dega
    return res.redirect("/");
}

/// basiccally hmare paas login ke time hmee cokkies honi cahiye msil nshi uthsni chsiye login ke time data base se iske liye npm i uuid hota jo bahut badi badi uid  deta hai
async function handleUserLogin(req,res) {
    const {email,password} = req.body;
   const user =  await User.findOne({email,password});

   if(!user){
    // vaps se unexist login page dalta hai
    return  res.render('login',{
        error:"Invalid User name or password",
    })
   }
  
    // ye token bana ke dega pura user ka info ka
    const token = setUser(user);
    // cokkie ka naam uid and send kiya session id
    res.cookie("token",token);

    // jese hi signup hoga then vo turant  home pe redirect kar dega
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}