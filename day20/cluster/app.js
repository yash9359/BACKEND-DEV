const express = require("express");
const status = require("express-status-monitor");
const { MessageEvent } = require("http");

const app = express();
const PORT = 8000;

app.use(status());

app.get("/", (req, res) => {

    return res.json({ Message: `Hello from express server ${process.pid}` })

});

app.listen(PORT, () => {
    
    console.log(`Server Started at http://localhost:${PORT}`);

});