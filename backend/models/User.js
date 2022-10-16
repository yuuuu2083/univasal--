const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 30
    },
    desc: {
        type: String,
        default: "自己紹介文を記入してください",
        min: 4,
        max: 180
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("user", UserSchema);