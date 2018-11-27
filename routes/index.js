var express = require("express");
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  dest: "tmp/",
  limits: {
    fileSize: 1 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image/png")) {
      cb(new Error("Mauvais"));
    }
    cb(null, true);
  },
  storage
});

const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/monupload", upload.array("monfichier", 3), (req, res) => {
  console.log(req.files);
  res.end();
});

module.exports = router;
