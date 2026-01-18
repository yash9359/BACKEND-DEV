const express= require("express");
const { handleGenerateNewURL,handleGetUrl, handleGetAnalytics } = require("../controllers/url")

const router  = express.Router();

router.post("/", handleGenerateNewURL);
router.get("/:shortId",handleGetUrl);

router.get("/analytics/:shortId",handleGetAnalytics);




module.exports = router;




