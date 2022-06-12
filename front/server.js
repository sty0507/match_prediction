// ======================== password 암호화 ========================================
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const saltRounds = 10; // 몇번 해싱을 할 것인지
const beforePassword = "12345"; // before
var afterPassword = ""; // after

app.get("/", function (req, res) {
  bcrypt.hash(beforePassword, saltRounds, function (err, hash) {
    try {
      afterPassword = hash;
      console.log(afterPassword);
    } catch (err) {
      console.log(err); // 예외처리
    }
  });
  bcrypt.compare(beforePassword, afterPassword, function (err, result) {
    try {
      if (result) console.log("True");
      else console.log("False");
    } catch (err) {
      console.log(err);
    }
  });
});

app.listen(8080, () => {
  console.log("서버 띄우기");
});
