const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var db_config = require(__dirname + "/config/database.js");
var conn = db_config.init();
const cookieParser = require("cookie-parser");
let i = 0;

db_config.connect(conn);

app.set("views", "./webtest/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

app.get("/home", (req, res) => {
  res.render("home.html");
});

app.get("/match", (req, res) => {
  res.render("match_prediction.html");
});

app.get("/register", (req, res) => {
  res.render("register.html");
});

app.get("/login", (req, res) => {
  res.render("index.html");
});

// 쿠키 생성
// app.get("/cookie", (req, res) => {
//   res.cookie("cookieName", "cookieValue");
//   res.redirect("/home");
// });

app.post("/registerAF", (req, res) => {// 회원가입 post
  i++;
  var params = [req.body.id, req.body.pw, req.body.name, i];
  var sql = "INSERT INTO PERSON VALUES(?, ?, ?, ?)";
  var ch_id = "SELECT id FROM PEROSN";
  console.log(i);
  if (req.body.pw === req.body.rpw) {
    // 비밀번호 확인이 제대로 되었는지
    conn.query(sql, params, function (err) {
      if (err) {
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


  //확인 해야 할것
  // 1) 입력을 했는가
  // 2) 아이디가 DB 상에 존재를 하는가
  // 3) 입력한 아이디가 DB 상의 비밀번호와 일치하는가


app.post("/loginAF", (req, res) => {// 로그인 post
  let c_id = req.body.id;
  let c_pw = req.body.pw;

  if (c_pw == "" || c_id == "") {
    res.send(
      "<script>alert('입력해주세요.'); window.location.replace('/login');</script>"
    ); // 1)
  } else {
    console.log(c_id);
    console.log(c_pw);

    var sql_id = "SELECT id FROM PERSON";
    var sql_pw = "SELECT pw FROM PERSON WHERE ID = " + '"' + c_id + '"'; // 아이디가 존재하는지 확인 후 그에 맞는 password 가져옴
    var sql_name = "SELECT name FROM PERSON WHERE ID = " + '"' + c_id + '"';
    var result;
    conn.query(sql_pw, function (err, results) {
      console.log(results);
      result = results[0];
      console.log(this.result.length)

      if (true) {
        // 2)
        console.log("True");
        return res.send(
          "<script>alert('회원정보가 존재하지 않습니다.'); window.location.replace('/login');</script>"
        );
      } else if (result_pw != c_pw) {// 비밀번호 확인 3)
        console.log("False");
        return res.send(
          "<script>alert('비밀번호가 일치하지 않습니다.'); window.location.replace('/login');</script>"
        );
      } else {
        console.log("Draw");
        return res.send(
          "<script>alert('성공적으로 로그인이 되었습니다.'); window.location.replace('/home');</script>"
        );
      }
    });
  }
});

app.post("/matchAF", (req, res) => {// 매치 post
  var home = req.body.wh;
  var draw = req.body.d;
  var away = req.body.wa;

  if (home) console.log("Will win home team");
  else if (draw) console.log("Will draw");
  else console.log("Will win away team");

  res.redirect("/match");
});

app.listen(3000, () => {
  console.log("서버 띄우기");
});

// person 생성 코드
// create table person(id varchar(30) primary key, pw varchar(30), name varchar(30), num int);
