const express = require("express");
const users = require("./MOCK_DATA (1).json");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    const html = `<ul>
    ${users.map((u) => `<li>${u.id}</li>`).join("")}
    </ul>`;

    return res.send(html);
});

//// APi

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body);
    const cuser = { ...body, id: users.length + 1 };
    users.push(cuser);
    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
});

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((u) => u.id == id);
        return res.json(user);
    })
    .post((req, res) => {
        res.json("pending");
    })
    .patch((req, res) => {
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
        fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err, data) => {
            return res.json({
                status: "Success",
                info: users[index],
            });
        });
    })
    .delete((req, res) => {
        
        const body  = req.body;
        const id = Number(req.params.id);
        const index = users.findIndex((u)=> u.id ===id);

        if(index === -1){
            return res.json({
                staus: "Failed",
                info: "invalid id",
            });
        }

        users[index] ={...body};
        
        fs.writeFile("./MOCK_DATA (1).json",JSON.stringify(users),(err,data)=>{
            return res.json({
                staus:"Success",
                info : "Removed"
            })
        })


    });

app.listen(PORT, () => {
    console.log(`PORT has started at ${PORT}`);
});
