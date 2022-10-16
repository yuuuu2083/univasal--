const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        max: 14,
        required: true
    },
    desc: {
        type: String,
        max: 84
    },
    img: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    post: {
        type:  String,
        default: "post"
    }
},
 { timestamps: true}
);
module.exports = mongoose.model("posts", PostSchema);