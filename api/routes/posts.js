const router = require('express').Router();
const db = require('../models');
const {
    loginRequired
} = require('../config/middleware');

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

router.post('/addPost', loginRequired, async (req, res) => {
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
            creator: req.userId
        });
        const savedPost = await newPost.save();
        if (!savedPost) return res.status(400).json({
            msg: "post not saved"
        });
        const user = await db.User.findById({
            _id: req.userId
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

router.put('/:postId/edit', loginRequired, async (req, res) => {
    try {
        const post = await db.Post.findByIdAndUpdate(req.params.postId, req.body, {
            new: true
        });
        if (!post) return res.status(401).json({
            msg: "Post not found"
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json("Something Wrong! " + err);
    }
});

router.delete('/:postId', loginRequired, async (req, res) => {
    try {
        const post = await db.Post.deleteOne({
            _id: req.params.postId
        });
        if (!post) return res.status(401).json({
            msg: "post not found"
        });
        const user = await db.User.findById(req.userId)
        if (!user) return res.status(401).json("user not found");
        // Check to see if Post exists
        if (user.posts.filter(userPost => userPost.toString() == req.params.postId).length === 0) {
            return res.status(400).json("Post does not exist");
        }
        const removeIndx = user.posts
            .map(items => items.toString()
                .includes(req.params.postId))
        // Splice comment out of array
        user.posts.splice(removeIndx, 1);
        await user.save();
        res.status(200).json("post deleted!");
    } catch (err) {
        res.status(400).json("Something Wrong! " + err);
    }
});


module.exports = router;