const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends : true}));

app.use('/', require('./routes/home'))


module.exports = app;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.render("views/index");
});

app.listen(3000, () => {
  console.log("서버 띄우기");
});

// function check(){
//     var id = $('#id').val();
//     var pw = $('#pw').val();
//     var pw_c = $('#pw_c').val();
//     var name = $('#name').val();

//     if(id.length < 4) alert('id양식에 맞지 않습니다.')
//     else if(pw.length < 4) alert('비밀번호는 4자 이상 입력하세요')
//     else if(pw != pw_c) alert('비밀번호가 일치하지 않습니다.')
//     else {
//         $.ajax({
//             url : '/signup',
//             type : 'POST',
//             data : {
//                 pw : pw,
//                 id : id,
//                 name : name
//             }
//         })
//     }
// }
