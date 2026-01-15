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
        // ye req.user = user kareke middlware banaya thaa auth.js mai ye req.user wahi se aya
        createdBy: req.user._id,

    });

    return res.render("home",{
        id: shortID,
    })
    // return res.json({id: shortID});
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

async function handleGetAnalytics(req,res) {
    
    const shortId  = req.params.shortId;

   const result = await URL.findOne({shortID:shortId});

   return res.json({totalClicks:result.visitHistory.length,
    analytics: result.visitHistory,
   })
}


module.exports = {
    handleGenerateNewURL,
    handleGetUrl,
    handleGetAnalytics,
    
}