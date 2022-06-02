const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("views", "./webtest/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.urlencoded({ extended: false }));

module.exports = app;

// =====================DB 역활=====================
let primary_id = ""; 
let primary_pw = "";
let primary_name = "";
// =================================================

app.get("/home", (req, res) => {
  res.render("home.html", { name: primary_name });
});

app.get("/register", (req, res) => {
  res.render("register.html");
});

app.get("/login", (req, res) => {
  res.render("index.html");
});

app.post("/register", (req, res) => {
  primary_id = req.body.id;
  primary_pw = req.body.pw;
  let repw = req.body.rpw;
  primary_name = req.body.name;
  if (primary_pw === repw) { // 비밀번호 확인이 제대로 되었는지
    console.log(primary_id);
    console.log(primary_pw);
    console.log(primary_name);
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

  if (c_id === primary_id && c_pw === primary_pw) {
    res.redirect("/home");
  } else {
    res.send(
      "<script>alert('회원정보가 일치하지 않습니다.'); window.location.replace('/login');</script>"
    );
    // res.redirect("/login");
  }
});

app.listen(3000, () => {
  console.log("서버 띄우기");
});

// 참고 사이트 : https://cocoon1787.tistory.com/517
