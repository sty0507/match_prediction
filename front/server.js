var express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());
app.set("views", "./front/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.urlencoded({ extended: false }));

module.exports = app;

app.get("/", function (req, res) {
  res.render("a.html");
});
// 쿠키 생성
app.post("/login", (req, res) => {
  res.cookie("id", req.body.p_id);
  res.cookie("pw", req.body.p_pw);
  res.redirect("/");
});
// 쿠키 읽기
app.get("/state", function (req, res) {
  res.send("cookie : " + req.cookies.FirstName);
});
// 쿠키 업데이트
app.get("/update", function (req, res) {
  res.cookie("FirstName", "Park");
  res.redirect("/state");
});
// 쿠키 삭제
app.get("/logout", function (req, res) {
  res.clearCookie("FirstName");
  res.redirect("/state");
});

app.listen(8080, () => {
  console.log("서버 띄우기");
});
