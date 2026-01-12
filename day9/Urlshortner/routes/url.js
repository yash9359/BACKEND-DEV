const express= require("express");
const { handleGenerateNewURL,handleGetUrl } = require("../controllers/url")

const router  = express.Router();

router.post("/", handleGenerateNewURL);
router.get("/:shortId",handleGetUrl);




module.exports = router;




