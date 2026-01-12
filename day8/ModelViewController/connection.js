const mongoose = require("mongoose");


async function connectMongoDb(url) {

   return await mongoose.connect(url).then(() => {
        console.log("MongoDB started");
    }).catch((err) => {
        console.log("Error in Db: ", err);
    })


}

module.exports = {
    connectMongoDb,
};