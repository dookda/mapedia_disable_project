const express = require('express');
const app = express();
// const con = require("./db");
// const db = con.db;

const oracledb = require('oracledb');


oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
// oracledb.autoCommit = true;

async function run1() {
    console.log("dadas");
    const connection = await oracledb.getConnection({
        user: "depgis",
        password: "D3p2022Gi$",
        connectString: "192.168.3.170:1521/ORCL"
    })

    const result = await connection.execute(
        `SELECT * FROM "OPP$_DBA".MN_DES_ADDRESS`,
        [0],  // bind value for :id
    );
    console.log(result);
    console.log("da");
}


async function run() {
    const connection = await oracledb.getConnection({
        user: "depgis",
        password: "D3p2022Gi$",
        connectString: "192.168.3.170:1521/ORCL"
    })

    try {
        connection = await oracledb.getConnection(connection);
        console.log('Connection was successful!');

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run()

app.get("/api/getdata", async (req, res) => {
    const sql = `SELECT * FROM "OPP$_DBA".MN_DES_ADDRESS`
    // const result = await db.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT })
    // console.log(result);
})

module.exports = app;