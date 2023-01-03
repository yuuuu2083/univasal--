const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");
const PORT = 8020;
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

//Database connect
mongoose
    .connect("mongodb+srv://morimoto:212711@junior-high-school-post.hvbvrzy.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.use(express.static('build'));
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);

app.get('*', function (req, res) {
    const indexHtml = path.resolve('build', 'index.html');
    res.sendFile(indexHtml);
});



app.listen(PORT, () => { console.log("サーバーの起動に成功しました")});
