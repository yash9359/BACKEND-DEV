
// uuid ->cokkies wali id banata
const {v4: uuidv4} =  require("uuid");
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
   // sbb sahi to session id banano
    const sessionId= uuidv4();
    setUser(sessionId,user);
    // cokkie ka naam uid and send kiya session id
    res.cookie("uid",sessionId);

    // jese hi signup hoga then vo turant  home pe redirect kar dega
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}