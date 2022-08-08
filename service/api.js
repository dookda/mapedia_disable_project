const express = require('express');
const app = express();
const oracledb = require('oracledb');
const con = require("./db");
const dbConfig = con.dbConfig;

oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.get("/api/getdata", async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log('Connection was successful!');
        const sql = `SELECT * FROM "OPP$_DBA".MN_DES_ADDRESS`
        const result = await connection.execute(sql, [], { maxRows: 1 });
        // console.log(result.metaData);
        res.status(200).json(result.rows)
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
})

module.exports = app;