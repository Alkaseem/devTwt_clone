const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
    try {
        const post = await db.Post.find().populate("creator")
        if (!post) return res.status(401).send("No post found!");
        res.status(200).json(post)
    } catch (err) {
        console.log("not good " + err);
    }
});

router.get('/:postId/show', async (req, res) => {
    try {
        const post = await db.Post.findById(req.params.postId);
        if (!post) return res.status(401).json({
            msg: "Post not found"
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json("Something Wrong! " + err);
    }
});

router.post('/addPost', async (req, res) => {
    const {
        title,
        description,
        image
    } = req.body;
    try {
        const newPost = new db.Post({
            title,
            description,
            image,
            creator: "5e4445283ea87b0e448e003e"
        });
        const savedPost = await newPost.save();
        if (!savedPost) return res.status(400).json({
            msg: "post not saved"
        });
        const user = await db.User.findById({
            _id: "5e4445283ea87b0e448e003e"
        });
        if (!user) return res.status(400).json({
            msg: "User not found"
        });
        user.posts.push(savedPost);
        await user.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(400).json("Something Wrong! " + err);
    }
});


module.exports = router;