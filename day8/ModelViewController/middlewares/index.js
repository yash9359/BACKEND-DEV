const fs = require("fs");


function logReqRes(filename) {

    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n${new Date()}: ${req.method}: ${req.path} : ${req.ip}`,
            (err, data) => {
                next();
            }
        );
    };

}

module.exports = {
    logReqRes,
}