const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");
const PORT = "https://morimotolog.online/";
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

//Database connect
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("データベースに接続成功しました"))
    .catch((err) => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);



app.listen(PORT, () => { console.log("サーバーの起動に成功しました")});




