const cluster = require("node:cluster");
const express = require("express");
const os = require("os");

const totalCPUs = os.cpus().length;
// console.log(totalCPUs);



if (cluster.isPrimary) {
    // console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        const worker = cluster.fork();   
        console.log("Worker started with PID:", worker.process.pid);
    }

}
else {
    const app = express();
    const PORT = 8000;


    app.get("/", (req, res) => {

        return res.json({ Message: `Hello from express server ${process.pid}` })

    });

    app.listen(PORT, () => {
        console.log(`Server Started at http://localhost:${PORT}`);

    });

}