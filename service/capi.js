const express = require('express')
const app = express();
const oracledb = require('oracledb');
const con = require("./db");
const dbConfig = con.dbConfig;
const fs = require('fs')
// oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
let libPath;
if (process.platform === 'win32') {           // Windows
    libPath = 'C:\\instantclient_21_6';
} else if (process.platform === 'darwin') {   // macOS
    libPath = '/Users/sakdahomhuan/instantclient_19_8';
}

if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({ libDir: libPath });
}
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.post("/api/get_distotal", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT  
            count(SEX_CODE) AS total,
            sum(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS f,
            sum(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS m
        FROM V_MN_DES_PERSON`

    try {
        const result = await connection.execute(sql, [], { maxRows: 100 });
        res.status(200).json(result.rows)
        // res.status(200).json({ data: "ok" })
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

app.post("/api/get_by_country_sex2", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL
    GROUP BY mdp.REGION_NAME_THAI, mdp.REGION_CODE 
    ORDER BY mdp.REGION_NAME_THAI`
    // console.log(sql);

    try {
        const result = await connection.execute(sql, [], { maxRows: 100 });
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


