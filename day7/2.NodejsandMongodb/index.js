const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connection 
// promise deta
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(() => console.log("Mongodb is connected")).catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        // email dena must hai
        required: true,
        // same email multiple times nahi ayngi
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    


},{timestamps:true});

/// schema bn gya abb uska model banega

const User = mongoose.model('user', userSchema);

app.use(express.urlencoded({ extended: false }));

// oncoming request , response dena to yahi kahtm karo next matlb next middleware ka reference

app.use((req, res, next) => {
    // console.log("Hello from middleWare 2", req.MyuserName);
    // return res.end("hell0");

    fs.appendFile(
        "log.txt",
        `\n${new Date()}: ${req.method}: ${req.path} : ${req.ip}`,
        (err, data) => {
            next();
        }
    );
});

// Routes

app.get("/users",async (req, res) => {

    ///saaare user le aoo kahli ka matlb
    const allDbUsers = await User.find({})

    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

/// REST API
app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
    //TOOD: Create new User

    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are req.." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
     
   

    return res.status(201).json({msg:"Success"});


});

app
    .route("/api/users/:id")
    .get(async(req, res) => {
       
        const user  = await User.findById(req.params.id)
        
        if (!user) {
            res.status(404).json({
                error: "invalid id",
            });
        }

        // bina return ke bhi sidh res.json bhej sakte but return is a good parctice uske niche wala code nahi chalega\
        return res.json(user);
    })
    .patch(async(req, res) => {
       
          const updatedUser=  await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"},{ new: true });
            return  res.json({status:"Success",
                user: updatedUser,
            });

       

        
    })
    .delete(async (req, res) => {
       
        await User.findByIdAndDelete(req.params.id);
        return res.json({status:"Success"});
    });

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT} `);
    
});
