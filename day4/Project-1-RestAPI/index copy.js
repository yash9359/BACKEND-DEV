const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");


const app = express();
const PORT = 8000;

// plugin = middleware
// jab bhi koi form deat ayega usko post karne kaa kama karega body mai
app.use(express.urlencoded({extended:false}));

// Routes


app.get('/users', (req, res) => {
    /*
    <ul>
    <li>yash gupta</li>
    */

    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);

})

/// REST API
app.get("/api/users", (req, res) => { 
    return res.json(users);
})

// /// Dynamic path parameter = :id
// app.get("/api/users/:id",(req,res)=>{
    
//     // geeting :id to here
//     const id = Number(req.params.id);/// string ko number mai badla
    
//     // abb id ko json mai too find karna padega naa

//     const finduser = users.find((u)=> u.id ===id)

//     // bina return ke bhi sidh res.json bhej sakte but return is a good parctice uske niche wala code nahi chalega\
//     return   res.json( finduser);
// })


// app.patch("/api/users/:id",(req,res)=>{
//     //TOOD: Edit  User with
//     return res.json({status:"pending"});
// })

// app.delete("/api/users/:id",(req,res)=>{
//      return res.json({status:"pending"});
// })


// sbko merge karke  ye achii practice kyuki ek hi route pe jana thaa kal ko route change tooo hmm sbko alag alg nhai karna padega 
// brower defalut get request hi bhejta hai
// to post patch ese nahi chalegi


app.post("/api/users",(req,res)=>{
    //TOOD: Create new User

    const body = req.body;
    // bina middle ware ke yee undefind ega express ko nahipata ki 
    // kii tum kis prakar ka data post kar rahe hoo
    console.log("Body",body);
    /// abb ye body ko leke mockdata mai daal dunga

    // Ram mai push kiya, deep copy jaruri
    users.push({...body, id: users.length + 1});
    

    // json.stringyfy => boject/arry ko string badlta hai
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
         return res.json({status:"success" ,id: users.length });
    });


   
})

app.route("/api/users/:id").get((req,res)=>{
         
    // geeting :id to here
    const id = Number(req.params.id);/// string ko number mai badla
    
    // abb id ko json mai too find karna padega naa

    const finduser = users.find((u)=> u.id ===id)

    // bina return ke bhi sidh res.json bhej sakte but return is a good parctice uske niche wala code nahi chalega\
    return   res.json( finduser);
}).patch((req,res)=>{
   // /TOOD: Edit  User with
    return res.json({status:"pending"});
}).delete((req,res)=>{
    return res.json({status:"pending"});
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT} `)
})

