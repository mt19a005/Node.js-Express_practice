var express = require('express');
var multer = require("multer");
const fs = require('fs');
var router = express.Router();

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
    res.render("Upload_python");
});

//プログラムアップロード後
router.post('/', py_handler, (req, res) => {
  console.log(req.file);
  const filename = req.file.originalname;
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.end(fs.readFileSync(req.file.path));
});

module.exports = router;