const { Router } = require("express");
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Comment = require("../models/comment");
// const {checkAuth} = require("./middleware/authentication");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve(`./public/uploads/${req.user._id}`);

        // folder agar nahi hai to bana do
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    // wahi check auth wala payload wala user hai smjhe yaha bhi use hua
    return res.render("addblog", {
        user: req.user,
    });
});

///fetching the indiviual blog
router.get("/:id", async (req, res) => {
    // populate kewal id nahi pura obj utha layega user ka
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
        "createdBy",
    );
   
    // blog page dikhega
    return res.render("blog", {
        user: req.user,
        blog,
        comments,
    });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
});

//////////////////////// comment routers

router.post("/comment/:blogId", async (req, res) => {
    const { content } = req.body;

    const comment = await Comment.create({
        content,
        blogId: req.params.blogId,
        /// ye id hai user ki jo commnet karega uss time login hoga check auth wale middlware se aya yaad aya
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
