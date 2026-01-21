const path = require("path");
const express = require("express");
const  multer = require("multer");

// to upload file we need multer

const app =express();
const PORT = 8000;

// jo bhi kuch upload karo usse uploads folder mai dalna
// isse file ka binary data store hota hai asli file nahi
// const upload= multer({dest: "uploads/"});

// usse bachne ke liye

const storage = multer.diskStorage({
    //destination kon se folder ke andar store karna hai
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function (req,file,cb){
        //file ka naam kya rakna hai
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    return res.render("homepage");
})

app.post("/upload" , upload.single("profileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})


app.listen(PORT,()=>{
    console.log(`Server Started at PORT:${PORT}`);
});