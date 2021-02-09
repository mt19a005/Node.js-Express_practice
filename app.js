var express = require('express');
const fs = require('fs');
var multer = require("multer");

var app = express();
var router = express.Router();

// const not_img = (req, file) => {
// }
// app.set("view engine", "ejs");

//画像の設定
const img_Strage = multer.diskStorage({
  //出力先
  destination(req, file, cb) {
    //jpg or png以外はエラー
    const error = file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'
      ? null
      : new Error(`Need jpg or png! you file type is ${file.mimetype}`);
    // cb("エラー", エラーじゃないときの処理)
    cb(error, "./file/");
  },
  // ファイル名
  filename(req, file, cb) {
    // cb(null, '${file.fieldname}-${Date.now()}') //「''」「""」じゃ駄目
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  }
})
const img_upload = multer({storage: img_Strage}).single('file')

app.set("view engine", "ejs")

// プログラムアップロード
app.get('/prog/up', function (req, res) {
  // res.sendFile(__dirname + "/" + "up.html");
  //引数...object型じゃないと駄目．
  var param = {
    noob: "unchi"
  };
  res.render("index", param);
});

//プログラムアップロード後
app.post('/prog/uploaded', img_upload, function (req, res) {
  console.log(req.file);
  const filename = req.file.originalname;
  res.writeHead(200,{"Content-Type":"image/png"});
  res.end(fs.readFileSync(req.file.path));
});

// 画像アップロード
app.get('/img/up', function (req, res) {
  res.sendFile(__dirname + "/" + "up.html");
});

//画像アップロード後
app.post('/img/uploaded', img_upload, function (req, res) {
  console.log(req.file);
  const filename = req.file.originalname;
  res.writeHead(200,{"Content-Type":"image/png"});
  res.end(fs.readFileSync(req.file.path));
});





var server = app.listen(3000, function() {
    console.log("listening at port %s", server.address().port);
});

function generateName(){
    return 'newname';
 }