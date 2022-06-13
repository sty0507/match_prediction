// ======================== password 암호화 ========================================
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const saltRounds = 10; // 몇번 해싱을 할 것인지
var afterPassword = ""; // after
var m = "";

app.get("/", function (req, res) {
  var beforePassword = "12345";
  hpassword(beforePassword);
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }

  console.log("m : " + m);
});
function checkUser(bp) {
  bcrypt.compare(bp, m, function (err, result) {
    try {
      console.log("true");
    } catch (err) {
      console.log("false");
    }
  });
}
function hpassword(bp) {
  bcrypt.hash(bp, saltRounds, function (err, hash) {
    try {
      m = hash;
      console.log("after : " + m);
    } catch (err) {
      console.log(err); // 예외처리
    }
  });
}

app.get("/home", function (req, res) {
  console.log("after : " + m);
});

app.listen(8080, () => {
  console.log("서버 띄우기");
});
