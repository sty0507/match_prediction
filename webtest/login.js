const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

let i = 0;
exports.loginAF = function async(req,res){
    // 회원가입 post
  i++;
  var sql = "INSERT INTO PERSON VALUES(?, ?, ?, ?)";
  if (req.body.pw === req.body.rpw) {
    // 비밀번호 확인이 제대로 되었는지
    var hpass = await hashPassword(req.body.pw);
    var params = [req.body.id, hpass, req.body.name, i];
    conn.query(sql, params, function (err) {
      if (err) {
        // 제대로 DB로 갔는지 확인
        console.log("query is not excuted.\n" + err);
        return res.redirect("/register");
      } else {
        console.log("Successfully commit");
        return res.redirect("/home");
      }
    });
  } else {
    return res.send(
      "<script>alert('비밀번호가 일치하지 않습니다.'); window.location.replace('/register');</script>"
    );
  }
}