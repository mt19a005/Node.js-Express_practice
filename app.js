var express = require('express');
var multer = require("multer");
var Upload_img = require("./routes/Upload_image");
var Upload_py = require("./routes/Upload_python");

var app = express();

//ejsを使いますよー
app.set("view engine", "ejs");

//画像アップロード
app.use('/img/up', Upload_img);

//pythonアップロード
app.use('/py/up', Upload_py);

var server = app.listen(3000, () => {
    console.log("listening at port %s", server.address().port);
});
//よくわからん
module.exports = app;