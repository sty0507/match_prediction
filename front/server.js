// ======================== password 암호화 ========================================
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const saltRounds = 10; // 몇번 해싱을 할 것인지
var afterPassword = ""; // after

app.get("/", async function (req, res) {
  var beforePassword = "12345";
  var testpass = "1234";
  var a = await hpassword(beforePassword);
  var ch = await checkUser(testpass, a);
  console.log("m : " + a);
  console.log("ch : " + ch);
});
async function checkUser(bp, m) {
  var b = bcrypt.compare(bp, m);
  console.log(b)
  return b;
}
async function hpassword(bp) {
  const hashpass = await bcrypt.hash(bp, saltRounds);
  return hashpass;
}

app.get("/home", function (req, res) {
  console.log("after : " + a);
});

app.listen(8080, () => {
  console.log("서버 띄우기");
});
