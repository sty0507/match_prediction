// const express = require('express')
// const app = express()

// const server = app.listen(3000, () => {
//     console.log('server start, port 3000')
// })

// const oracledb = require('oracledb')
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

// app.get('/select', function(request, response) {
//     getSelect(request, response)
// })

// async function getSelect(request, response) {
//     let connection
//     try {
//         connection = await oracledb.getConnection({
//             user          : "c##oracle_test",
//             password      : "1234",
//             connectString : "xe"
//         })

//         const result = await connection.execute(
//             `SELECT * FROM PERSON`
//         )

//         console.log(result)
//         response.send(result.rows)
//     } catch (error) {
//         console.log(error)
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close()
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }
// }

var oracledb = require('oracledb');
var config = {
    user: "c##oracle_test",
    password: "1234",
    connectString: "localhost/xe"
}

oracledb.getConnection(config, (err, conn) =>{
    todoWork(err, conn);
});

function todoWork(err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("select * from person", [], function (err, result) {
        if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
        }
        console.log(result.metaData);  //테이블 스키마
        console.log(result.rows);  //데이터
        doRelease(connection);
    });
}    

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}