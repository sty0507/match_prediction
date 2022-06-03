const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var db_config = require(__dirname + "/config/database.js");
var conn = db_config.init();

db_config.connect(conn);

app.set("views", "./webtest/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.urlencoded({ extended: false }));

module.exports = app;

app.get("/home", (req, res) => {
  res.render("home.html");
});

app.get("/register", (req, res) => {
  res.render("register.html");
});

app.get("/login", (req, res) => {
  res.render("index.html");
});

app.post("/register", (req, res) => {
  var params = [req.body.id, req.body.pw, req.body.name];
  var sql = "INSERT INTO PERSON VALUES(?, ?, ?)";

  if (req.body.pw === req.body.rpw) {
    // 비밀번호 확인이 제대로 되었는지

    conn.query(sql, params, function (err) {
      if (err) console.log("query is not excuted.\n" + err);
      else res.redirect("/register");
    });
    res.redirect("/login");
  } else {
    res.send(
      "<script>alert('비밀번호가 일치하지 않습니다.'); window.location.replace('/register');</script>"
    );
  }
});

app.post("/login", (req, res) => {
  let c_id = req.body.id;
  let c_pw = req.body.pw;

  console.log(c_id);
  console.log(c_pw);

  var sql = "SELECT * FROM PERSON";
  console.log(sql);
  conn.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted\n" + err);
    else res.redirect("/login");
  });

  // if (c_id === primary_id && c_pw === primary_pw) {
  //   res.redirect("/home");
  // } else {
  //   res.send(
  //     "<script>alert('회원정보가 일치하지 않습니다.'); window.location.replace('/login');</script>"
  //   );
  //   // res.redirect("/login");
  // }
});

app.listen(3000, () => {
  console.log("서버 띄우기");
});

// 참고 사이트 : https://cocoon1787.tistory.com/517
