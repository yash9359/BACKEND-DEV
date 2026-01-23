const { Router } = require("express");
const { model } = require("mongoose");
const User = require("../models/user");
const { createHmac } = require("crypto");

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect("/");
});

router.post("/signin", async (req, res) => {
    // entry = backend se user ki puri obj agyi hai
    const DBentry = await User.findOne({ email: req.body.email });
    if (!DBentry) {
        return res.status(400).json({ error: "User not found" });
    }
    const hashedInputPassword = createHmac("sha256", DBentry.salt)
        .update(req.body.password)
        .digest("hex");

    if (hashedInputPassword != DBentry.password) {
        return res.status(400).send({ err: "Invalid Password" });
    }

    return res.redirect("/");
});
module.exports = router;
