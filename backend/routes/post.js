const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CRUDを設定
// C=create,作成
// R=read,読み取り
// U=updata,更新
// D=delete,削除

// 内容を投稿する
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//投稿を削除
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //投稿内容
        if (post.userId !== req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("投稿を削除できました");
        } else {
            return res.status(403).json("他の人の投稿は削除できません");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//ホームにいてる時投稿の全てを表示
router.get("/", async (req, res) => {
    try {
        const allPost = await Post.find();
        return res.status(200).json(allPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//アカウントのIDを検索して投稿を取得(検索)
router.get("/search", async (req, res) => {
    try {
        const post = await Post.find({ userId: req.body.userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})



//投稿にいいねを押す
router.put("/like/:id", async (req, res) => {
    try {
        const frinends = await Post.findById(req.params.id);//相手の投稿のID
        if (!frinends.like.includes(req.body.userId)) {
            await frinends.updateOne({
                $push: {
                    like: req.body.userId
                }
            });
            return res.status(200).json("いいねが押せました");
        } else {
            await frinends.updateOne({
                $pull: {
                    like: req.body.userId
                }
            });
            return res.status(200).json("いいねを消しました");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



//プロフィールが画面上での表示(友達の投稿を取得)
router.get("/friend/:username", async (req, res) => {
    try {
        const post = await Post.find({ userId: req.params.username });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


//プロフィールが画面上での表示(自分の投稿を取得)
// router.get("/profile/:username", async (req, res) => {
//     try {
//         const post = await Post.find({ username: req.params.username });
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


//クエリを使ってプロフィール上で自分の投稿を取得
router.get("/profile", async (req, res) => {
    const userId = req.query.userId;
    try {
        const post = await Post.find({ userId: userId });
       return res.status(200).json(post);
    } catch (err) {
       return res.status(500).json(err);
    }
});

//クエリを使ってdetailファイルで投稿内容を取得

router.get("/detail", async (req, res) => {
    try {
        const detail = await Post.findById(req.query.userId);
        return res.status(200).json(detail)
    } catch(err) {
         return res.status(500).json(err)
    }
})



module.exports = router;