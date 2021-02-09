const express = require('express');
const multer = require("multer");
const Upload_img = require("./routes/Upload_image");
const Upload_py = require("./routes/Upload_python");

const app = express();

//ejsを使いますよー
app.set("view engine", "ejs");

//画像アップロード
app.use('/img/*', Upload_img);

//pythonアップロード
app.use('/py/*', Upload_py);

const server = app.listen(3000, () => {
    console.log("listening at port %s", server.address().port);
});
//よくわからん
module.exports = app;