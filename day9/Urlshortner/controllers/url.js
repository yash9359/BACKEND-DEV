const URL = require("../models/url");
const {nanoid}= require("nanoid");

async function handleGenerateNewURL(req,res) {

    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error:"URL is required"
        })
    }

    const shortID = nanoid(8);
    await URL.create({
        shortID:shortID,
        redirectURL: body.url,
        visitHistory: [],

    });
    return res.json({id: shortID});
}


async function handleGetUrl(req,res) {
    const id = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortID: id,
    }, {
        $push: {
            visitHistory: {
              timestamp:  Date.now(),
            }
        }
    },
   
    );

    if(!entry){
        return res.json({
            msg:"URL not found"
        })
    }

    return res.redirect(entry.redirectURL);

    
}



module.exports = {
    handleGenerateNewURL,
    handleGetUrl,
    
}