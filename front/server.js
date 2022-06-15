const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.set("views", "./front/views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send("<h1> Express Simple Server</h1>");
  res.cookie("myCookie", "set Cookie");
  console.log(req.cookies);
});
app.get("/home", function (req, res) {
  var id = "tae";
  if (check(req.cookies.json.id, id)) {
    return res.render("a", { id: id + "님 반갑습니다." });
  } else return res.render("a", { id: "누구세요" });
});
app.get("/getcookie", function (req, res) {
  res.send(req.cookies);
});
app.get("/setcookie", function (req, res) {
  res.cookie("string", "cookie");
  res.cookie("json", { id: "tae", pw: "1234" });
  res.redirect("/getcookie");
});
app.get("/testcookie", function (req, res) {
  console.log(req.cookies.json.id);
  res.redirect("/getcookie");
});
function check(wid, usr) {
  if (wid == usr) return true;
  else return false;
}
app.listen(8080, () => {
  console.log("서버 띄우기");
});
