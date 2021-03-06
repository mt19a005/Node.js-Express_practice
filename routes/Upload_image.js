const express = require('express');
const multer = require("multer");
const fs = require('fs');
const router = express.Router();

//画像の設定
const img_Strage = multer.diskStorage({
  //出力先
  destination(req, file, cb) {
      //エラーの例
      // const error = file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'
      // ? null
      // : new Error(`Need jpg or png! you file type is ${file.mimetype}`);
      // cb("エラー", エラーじゃないときの処理)
      cb(null, "./img/");
  },
  // ファイル名
  filename(req, file, cb) {
      // cb(null, '${file.fieldname}-${Date.now()}') //「''」「""」じゃ駄目
      cb(null, `${file.fieldname}-${Date.now()}.png`);
  }
});
const img_upload = multer({storage: img_Strage}).single('file')


router.get('/', (req, res)  => {
    //引数...object型じゃないと駄目．
    // var param = {
    //   noob: "unchi"
    // };
    // res.render("index", param);
    let param = {
      form_path: "img",
      accept: "image/*"
    };
    res.render("Upload_form", param);
});

//プログラムアップロード後
router.post('/', img_upload, (req, res) => {
  console.log(req.file);
  res.writeHead(200,{"Content-Type":"image/png"});
  res.end(fs.readFileSync(req.file.path));
});

module.exports = router;