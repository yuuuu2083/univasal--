const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
});

const upload = multer({storage});

router.post("/", upload.single("file"),  (req, res) => {
    try {
        return res.status(200).json("アップロードに成功しました");
    } catch(err) {
       return res.status(500).json(err);
    }
});



module.exports = router;