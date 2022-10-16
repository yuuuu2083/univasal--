const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
    res.status(200).json("接続確認");
});

//ユーザー登録
router.post("/register", async (req, res) => {
    try {
        const newuser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const user = await newuser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//ログイン

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(404).json("アカウントが見つかりません"); }
        const confirmPassword = req.body.password === user.password;
        if (!confirmPassword) { return res.status(403).json("パスワードが違います"); }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;