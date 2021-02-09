const express = require('express');
const multer = require("multer");
const fs = require('fs');
const router = express.Router();

//保存の設定
const py_Strage = multer.diskStorage({
  //出力先
  destination(req, file, cb) {
      cb(null, "./py/");
  },
  // ファイル名
  filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.py`);
  }
});
const py_handler = multer({storage: py_Strage}).single('file')

router.get('/', (req, res)  => {
  let param = {
    form_path:"py",
    accept:".py"
  };
  res.render("Upload_form", param);
});

//プログラムアップロード後
router.post('/', py_handler, (req, res) => {
  console.log(req.file);
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.end(fs.readFileSync(req.file.path));
});

module.exports = router;