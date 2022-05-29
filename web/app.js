var express = require("express")
var app = express();
var db_config = require(__dirname + "/config/database.js")
var conn = db_config.init();
var bodyParser = require("body-parser")
var n = 1

db_config.connect(conn)

app.set("views", __dirname + "/views")
app.set("viewb engine", "ejs")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + "/public"))

app.get("/", function (req, res){
    res.render("index.ejs")
})

app.post("/", (req, res) => {
    console.log("회원가입 하는 중")
    const body = req.body;
    const id = body.id;
    const pw = body.pw;
    const name = body.name;
    const num = n++;
})
    db_config.query('select * from test where id=?', [id], (err, data) => {
        if (data.length == 0) {
            console.log('회원가입 성공')
            db_config.query('insert into test(id, pw, name, num) value(?,?,?,?,?)', [
                id, pw, name, n
            ]);
            res.redirect('/')
        } else {
            console.log('회원가입 실패');
                res.send('<script>alert("회원가입 실패");</script>')
                res.redirect('/');
        }
    })

app.listen(8080, () => console.log("Server is running on port 3000..."));