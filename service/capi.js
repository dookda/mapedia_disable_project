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

app.post("/api/get_by_region", async (req, res) => {
    let { region_code, address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (privilege ='01' OR privilege ='02')` : pri = `AND privilege ='${privilege}'`

    const sql = `SELECT REGION_CODE, REGION_NAME_THAI, 
            COUNT(REGION_CODE) AS TOTAL,
            SUM(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F
            FROM V_MN_DES_PERSON
            WHERE ADDRESS_CODE = '${address_code}'${pri} AND REGION_CODE='${region_code}'
            GROUP BY REGION_CODE, REGION_NAME_THAI`
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

app.post("/api/get_by_privilege", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (privilege ='01' OR privilege ='02')` : pri = `AND privilege ='${privilege}'`

    const sql = `SELECT count(SEX_CODE) AS total, 
	        sum(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS f,
	        sum(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS m
            FROM V_MN_DES_PERSON 
            WHERE ADDRESS_CODE ='${address_code}'${pri}`
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

app.post("/api/get_by_prov", async (req, res) => {
    let { province_code, address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (privilege ='01' OR privilege ='02')` : pri = `AND privilege ='${privilege}'`

    const sql = `SELECT  PROVINCE_CODE, PROVINCE_NAME,
	        count(SEX_CODE) AS total, 
	        sum(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS f,
	        sum(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS m
            FROM V_MN_DES_PERSON 
            WHERE ADDRESS_CODE ='${address_code}'${pri} AND province_code='${province_code}'
            GROUP BY PROVINCE_CODE, PROVINCE_NAME`
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

app.post("/api/get_by_amphoe", async (req, res) => {
    let { amphoe_code, address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (privilege ='01' OR privilege ='02')` : pri = `AND privilege ='${privilege}'`

    let sql = `SELECT  PROVINCE_CODE, PROVINCE_NAME, AMPCODE, DISTRICT_NAME,
	        count(SEX_CODE) AS total, 
	        sum(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS f,
	        sum(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS m
            FROM V_MN_DES_PERSON 
            WHERE ADDRESS_CODE ='${address_code}'${pri} AND AMPCODE ='${amphoe_code}'
            GROUP BY PROVINCE_CODE, PROVINCE_NAME ,AMPCODE, DISTRICT_NAME`

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

app.post("/api/get_by_tambon", async (req, res) => {
    let { tambon_code, address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (privilege ='01' OR privilege ='02')` : pri = `AND privilege ='${privilege}'`

    let sql = `SELECT PROVINCE_CODE, PROVINCE_NAME, AMPCODE, DISTRICT_NAME, TAMCODE, SUBDISTRICT_NAME, 
	count(SEX_CODE) AS total, 
	sum(CASE SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS f,
	sum(CASE SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS m
FROM V_MN_DES_PERSON 
WHERE ADDRESS_CODE ='${address_code}'${pri} AND TAMCODE = '${tambon_code}'
 GROUP BY PROVINCE_CODE, PROVINCE_NAME ,AMPCODE, DISTRICT_NAME,TAMCODE,SUBDISTRICT_NAME`

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


