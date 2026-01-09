const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");


const app = express();
const PORT = 8000;

// plugin = middleware
// jab bhi koi form deat ayega usko post karne kaa kama karega body mai
app.use(express.urlencoded({ extended: false }));


// oncoming request , response dena to yahi kahtm karo next matlb next middleware ka reference
app.use((req, res, next) => {
    // ye middle are apne ppsss rokk leta request ko nichhe nahi jane deta hai jab tak req ko res  se return ho jata niche ke baki code nahi cahlte 
    console.log("Hello from middleWare 1");
    // return res.json({
    //     msg: "Hello from middleWare 1"
    // })

    // agar hme next fn ko call karna matlb agla midle ho ya fn bss next() call kar doo uske niche middle hoga to vo ajayega nahitooo 
    // tooo code hoga to vo chal gea
    // req.MyuserName = "yoyo _honeysingh"

    next();
})

app.use(
    (req, res, next) => {
        console.log("Hello from middleWare 2", req.MyuserName);
        // return res.end("hell0");

        fs.appendFile("log.txt", `\n${Date.now()}: ${req.method}: ${req.path} : ${req.ip}`, (err, data) => {
            next();
        })

    }
)

// Routes


app.get('/users', (req, res) => {
  

    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);

})

/// REST API
app.get("/api/users", (req, res) => {


    console.log(req.headers);
    res.setHeader(`X-myName`,"Yash Gupta") // custom Header
    // Always add X on custum headers
    return res.json(users);
})


app.post("/api/users", (req, res) => {
    //TOOD: Create new User

    const body = req.body;
    // bina middle ware ke yee undefind ega express ko nahipata ki 
    // kii tum kis prakar ka data post kar rahe hoo
    console.log("Body", body);
    /// abb ye body ko leke mockdata mai daal dunga

    // Ram mai push kiya, deep copy jaruri
    users.push({ ...body, id: users.length + 1 });


    // json.stringyfy => boject/arry ko string badlta hai
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });



})

app.route("/api/users/:id").get((req, res) => {

    // geeting :id to here
    const id = Number(req.params.id);/// string ko number mai badla

    // abb id ko json mai too find karna padega naa

    const finduser = users.find((u) => u.id === id)

    // bina return ke bhi sidh res.json bhej sakte but return is a good parctice uske niche wala code nahi chalega\
    return res.json(finduser);
}).patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index == -1) {
        return res.json({
            staus: "Failed",
            info: "invalid id",
        });
    }
    // abhi kewal Ram mai hoga update
    users[index] = {
        ...users[index],
        ...body,
    };
    // abb file mai hoga means database
    // Users array hai but file mai to string jati hmesa tabhi json. Stringyfy
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
            status: "Success",
            info: users[index],
        });
    });
}).delete((req, res) => {

    const body = req.body;
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.json({
            staus: "Failed",
            info: "invalid id",
        });
    }

    users[index] = { ...body };

    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err, data) => {
        return res.json({
            staus: "Success",
            info: "Removed"
        })
    })


});

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT} `)
})

