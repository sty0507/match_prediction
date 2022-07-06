const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var db_config = require(__dirname + "/config/database.js");
var conn = db_config.init();
var cookie = require("cookie");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// 함수에서 전역으로 사용하는 변수들
let i = 0;
const saltRounds = 10;
//DB 연동
db_config.connect(conn);

module.exports = app;

app.set("views", "./webtest/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("fhr#!md4l%sdk@3d%l$e@l"));

app.get("/home", (req, res) => {
  let decoded = jwt.decode(req.cookies.token, "secretToken");
  let sql_name = "SELECT name FROM person WHERE id = " + "'" + decoded + "'";
  if (decoded != undefined) {
    conn.query(sql_name, function (err, results) {
      let name = results[0].name;
      return res.render("home.ejs", { usr: 1, name: name });
    });
  } else return res.render("home.ejs", { usr: 0 });
});

app.get("/match", (req, res) => {
  res.render("match_prediction.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("index.ejs");
});
// ============================== 회원가입 ================================
app.post("/registerAF", async (req, res) => {
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
});
//==============================================================

//============================== 로그인 ================================
app.post("/loginAF", (req, res) => {
  // 로그인 post
  let c_id = req.body.id; // 입력 받은 id
  let c_pw = req.body.pw; // 입력 받은 pw

  if (c_pw == "" || c_id == "") {
    res.send(
      "<script>alert('입력해주세요.'); window.location.replace('/login');</script>"
    ); // 1)입력을 했는가
  } else {
    var sql_pw = "SELECT pw FROM PERSON WHERE ID = " + '"' + c_id + '"';
    var result;
    var result_pw = { pw: "" };
    conn.query(sql_pw, async function (err, results) {
      result = results[0];
      if (result != undefined) {
        // 2)아이디가 DB 상에 존재를 하는가
        result_pw = result.pw;
        if (await checkUser(c_pw, result_pw)) {
          // 비밀번호 확인 3)입력한 아이디가 DB 상의 비밀번호와 일치하는가
          setCookie(res, req, c_id);
          return res.redirect("/home");
        } else {
          return res.send(
            "<script>alert('비밀번호가 일치하지 않습니다.'); window.location.replace('/login');</script>"
          );
        }
      } else {
        return res.send(
          "<script>alert('회원정보가 존재하지 않습니다.'); window.location.replace('/login');</script>"
        );
      }
    });
  }
});
//========================================================================

//=================================== 매치 ===============================
app.post("/matchAF", (req, res) => {
  // 매치 post
  var home = req.body.wh;
  var draw = req.body.d;
  var away = req.body.wa;

  if (home) console.log("Will win home team");
  else if (draw) console.log("Will draw");
  else console.log("Will win away team");

  res.redirect("/match");
});
//======================================================================

//=============================== 로그아웃 =============================
app.post("/logoutAF", (req, res) => {
  clearCookies(res);
  res.redirect("/home");
});
//======================================================================
//================================== 패스워드 암호화 ====================
async function hashPassword(password) {
  const hashpass = await bcrypt.hash(password, saltRounds);
  return hashpass;
}
//=======================================================================

//========================================= 유저 확인 ===================
async function checkUser(bp, hpassword) {
  const re = bcrypt.compareSync(bp, hpassword);
  return re;
}
// =======================================================================

// ================================= 로그인 했다는 쿠키 입력 ==============
function setCookie(res, req, id) {
  var expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7);
  var token = jwt.sign(id.toString(), "secretToken");
  //var decoded = jwt.decode(token, "secretToken");
  // res.cookie("id", id, { expires: expiryDate, httpOnly: true, signed: true });
  res.cookie("token", token, { expires: expiryDate, httpOnly: true });
}
// ========================================================================

// ====================================로그아웃 쿠키========================
function clearCookies(res) {
  res.clearCookie("token");
}
// ========================================================================

app.listen(3000, () => {
  console.log("서버 띄우기");
});

// person 생성 코드
// create table person(id varchar(30) primary key, pw varchar(100), name varchar(30), num int);
// var sql_pw = "SELECT pw FROM PERSON WHERE ID = " + '"' + c_id + '"'; // 아이디가 존재하는지 확인 후 그에 맞는 password 가져옴
// var sql_name = "SELECT name FROM PERSON WHERE ID = " + '"' + c_id + '"';
