const jwt  = require("jsonwebtoken");
const secret = "Yash$123@";


// basic getter and setter lgg raha hai

function setUser(user) {
    
//    payload  = jisme user ki sari info hoti hai to yaha hm directpura user info hi payload bana dete hai

const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
}

    return jwt.sign(payload,secret)
}
function getUser(token) {
    if(!token) return null;
    try{
         return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }
   
}

module.exports = {
    setUser,
    getUser,
}