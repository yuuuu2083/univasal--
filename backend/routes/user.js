const express = require("express");
// const { default: Post } = require("../../frontend/src/commponents/post/Post");
const router = express.Router();
const User = require("../models/User");
const post = require("../models/Post");

//  auth.jsでUser情報のusernameとemailとpasswordは設定できている
//  なので編集と削除があれば良い
//  ユーザーのフォローとフォローの削除をここに書いていく


//ユーザーの編集
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const update = await user.update({
                $set: req.body
            });
            return res.status(200).json("内容を編集しました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(404).json("idが一致しません")
    }
});

//ユーザーの削除
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const del = await user.delete();
            return res.status(200).json("削除しました");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("IDが一致しません");
    }
});


//ユーザーを友達登録
router.put("/:id/follow", async (req, res) => {
    //ボタンをクリックすると自分のfriends欄に相手のIDが格納される
    if (req.body.userId !== req.params.id) {//自分自身をフォローできないようにする
        try {

            const Myuser = await User.findById(req.body.userId);// MyID

            if (!Myuser.friends.includes(req.params.id)) {//もし自分のfriend欄に相手のIDがなかったら追加
                await Myuser.updateOne({
                    $push: {
                        friends: req.params.id
                    }
                });
                return res.status(200).json("友達を追加した");
            } else {
                await Myuser.updateOne({
                    $pull: {
                        friends: req.params.id
                    }
                });
            }
                return res.status(200).json("友達を削除した");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("自分自身を追加できません");
    }
});

//ユーザーに友達のIDが入っているか確認API
router.get("/friendIdConfirm/:id", async (req, res) => {
    try {
        const Myuser = await User.findById(req.body.userId);//自分のID
        const friendId = await User.findById(req.params.id);//友達のID
        if(Myuser.friends.includes(friendId._id)) {
            return res.status(200).json("isFriend");
        } else {
            return res.status(200).json("noFriend");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});


//ユーザー情報の取得

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//自分の友達情報を取得するそのIDから友達の情報をもらう

router.get("/friend/:id", async (req, res) => {
    try {
        const host = await User.findById(req.params.id);//自分の情報
        const [...friend] = await Promise.all(//自分の友達のId情報から
            host.friends.map((e) => {
            return User.find({_id: e});
        }))
        return res.status(200).json(friend);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//友達が投稿したIdから友達の情報を取得







// router.put("/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {//指定したID(req.body.userId)がURL/:id←この部分に当てはまっているか？
//         try {
//             const user = await User.findByIdAndUpdate(req.params.id, {
//                 $set: req.body,//shemaで書いた全ての部分
//             });
//             res.status(200).json("ユーザー情報が更新されました");
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(403).json("ログイン情報が違うため更新できません");
//     }
// });

module.exports = router;