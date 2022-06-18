const express = require("express");
var cookieParser = require("cookie-parser");
const { localsName } = require("ejs");
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
  res.render("a", { id: " " });
});
app.post("/setcookie", (req, res) => {
  console.log(req.body.p_id);
  in_id(req);
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
function in_id(req) {
  console.log(req.body.p_id);
  var id = req.body.p_id;
  var name = req.body.p_name;
  console.log(id);
  console.log(name);
  res.cookie("string", "cookie");
  res.cookie("json", { id: id, name: name });
}
app.listen(8080, () => {
  console.log("서버 띄우기");
});
