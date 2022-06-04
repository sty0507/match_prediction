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

app.post("/registerAF", (req, res) => {
  var params = [req.body.id, req.body.pw, req.body.name];
  var sql = "INSERT INTO PERSON VALUES(?, ?, ?)";

  if (req.body.pw === req.body.rpw) {
    // 비밀번호 확인이 제대로 되었는지

    conn.query(sql, params, function (err) {
      if (err) console.log("query is not excuted.\n" + err);
      else res.redirect("/register");
    });
    res.redirect("/home");
  } else {
    res.send(
      "<script>alert('비밀번호가 일치하지 않습니다.'); window.location.replace('/register');</script>"
    );
  }
});

app.post("/loginAF", (req, res) => {
  let c_id = req.body.id;
  let c_pw = req.body.pw;

  //확인 해야 할것
  // 1) 입력을 했는가
  // 2) 아이디가 DB 상에 존재를 하는가
  // 3) 입력한 아이디가 DB 상의 비밀번호와 일치하는가

  if (c_pw == "" || c_id == "") {
    res.send(
      "<script>alert('입력해주세요.'); window.location.replace('/login');</script>"
    ); // 1)
  } else {
    console.log(c_id);
    console.log(c_pw);

    var sql_id = "SELECT pw FROM PERSON WHERE ID = " + '"' + c_id + '"'; // 아이디가 존재하는지 확인 후 그에 맞는 password 가져옴
    var sql_pw = "SELECT name FROM PERSON WHERE ID = " + '"' + c_id + '"';
    conn.query(sql_id, function (err, results) {
      var result = results[0];

      console.log(results);
      console.log(result);

      if (!results) {
        // 2) result가 sql을 실행해서 가져옴. 만약 results가 비어있으면 일치하지가 않음(반환 형태가 [] 임.)
        res.send(
          "<script>alert('ID가 존재하지 않습니다.'); window.location.replace('/login');</script>"
        );
      }
      else if (result.pw === c_pw) {
        // 비밀번호 확인 3)
        res.redirect("/home");
      } else {
        res.send(
          "<script>alert('회원정보가 존재하지 않습니다.'); window.location.replace('/login');</script>"
        );
      }
    });
  }

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
