const express = require('express');
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

// if (libPath && fs.existsSync(libPath)) {
//     oracledb.initOracleClient({ libDir: libPath });
// }

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.post("/api_report/get_by_region", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat, 
        mdp.REGION_NAME_THAI,
        mdp.REGION_CODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
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


app.post("/api_report/get_by_sex", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SEX_CODE as name, count(mdp.SEX_CODE) AS value 
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL
    GROUP BY mdp.SEX_CODE `
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


app.post("/api_report/get_by_type", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT 
        SUM(CASE mdd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
        SUM(CASE mdd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type11,
        SUM(CASE mdd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type12,
        SUM(CASE mdd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type13,
        SUM(CASE mdd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type14,
        SUM(CASE mdd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type15,
        SUM(CASE mdd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type16,
        SUM(CASE mdd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type17,
        SUM(CASE mdd.DEFORM_ID WHEN '18' THEN 1 ELSE 0 END) AS type18
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL
    `
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

app.post("/api_report/get_by_agetype", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
        SUM(CASE ad.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type11,
        SUM(CASE ad.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type12,
        SUM(CASE ad.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type13,
        SUM(CASE ad.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type14,
        SUM(CASE ad.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type15,
        SUM(CASE ad.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type16,
        SUM(CASE ad.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type17,
        SUM(CASE ad.DEFORM_ID WHEN '18' THEN 1 ELSE 0 END) AS type18
    FROM (SELECT mdp.REGION_NAME_THAI,
                CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                            CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                            END 
                        END  
                    END 
                END AS age,
                mdd.DEFORM_ID
            FROM "DEPGIS".V_MN_DES_PERSON mdp  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
            WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL) ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`
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



app.post("/api_report/get_by_occ", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE mdp.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE mdp.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE mdp.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE mdp.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE mdp.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE mdp.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE mdp.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE mdp.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE mdp.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE mdp.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE mdp.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE mdp.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE mdp.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE mdp.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE mdp.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE mdp.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE mdp.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE mdp.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE mdp.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE mdp.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM "DEPGIS".V_MN_DES_PERSON mdp
    WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL
    `
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