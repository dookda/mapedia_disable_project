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

app.post("/api/getallprov", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    const sql = `SELECT * FROM "OPP$_DBA".BS_PROVINCE`;
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

app.post("/api/get_all_region", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT br.* FROM "OPP$_DBA".BS_REGION br`

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

app.post("/api/get_all_pro", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT bp.*  FROM "OPP$_DBA".BS_PROVINCE bp`

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

app.post("/api/get_all_amp", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT bd.*, CONCAT(bd.PROVINCE_CODE, bd.DISTRICT_CODE) AS AMPCODE FROM "OPP$_DBA".BS_DISTRICT bd`

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

app.post("/api/get_all_tam", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT bs.*, CONCAT(bs.PROVINCE_CODE, CONCAT(bs.DISTRICT_CODE, SUBSTR(bs.SUBDISTRICT_CODE, 2))) AS TAMCODE FROM "OPP$_DBA".BS_SUBDISTRICT bs`

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

// country
app.post("/api/get_by_country_total", async (req, res) => {
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

app.post("/api/get_by_country_sex", async (req, res) => {
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


app.post("/api/get_by_country_type", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
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

app.post("/api/get_by_country_age", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
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
app.post("/api/get_by_country_edu", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.REGION_CODE IS NOT NULL
    GROUP BY mdp.REGION_NAME_THAI
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

app.post("/api/get_by_country_occ", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    GROUP BY mdp.REGION_NAME_THAI
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

app.post("/api/get_by_country_agetype", async (req, res) => {
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

app.post("/api/get_by_country_ageedu", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.REGION_NAME_THAI,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
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

app.post("/api/get_by_country_ageocc", async (req, res) => {
    let { address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.REGION_NAME_THAI,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
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

// region
app.post("/api/get_by_region_total", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME  AS cat, 
        mdp.PROVINCE_NAME,
        mdp.PROVINCE_CODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_region_sex", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_region_type", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_region_age", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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
app.post("/api/get_by_region_edu", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
        GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
        ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_region_occ", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}'
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_region_agetype", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
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
    FROM (SELECT mdp.PROVINCE_NAME,
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
            WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}') ad 
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

app.post("/api/get_by_region_ageedu", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.PROVINCE_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}') ad 
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

app.post("/api/get_by_region_ageocc", async (req, res) => {
    let { address_code, region_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.PROVINCE_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.REGION_CODE='${region_code}') ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`

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


// multi-prov
app.post("/api/get_by_multiprov_total", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME  AS cat, 
        mdp.PROVINCE_NAME,
        mdp.PROVINCE_CODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_multiprov_sex", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_multiprov_type", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_multiprov_age", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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
app.post("/api/get_by_multiprov_edu", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND ${wh}
        GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
        ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_multiprov_occ", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND ${wh}
    GROUP BY mdp.PROVINCE_NAME, mdp.PROVINCE_CODE 
    ORDER BY mdp.PROVINCE_NAME`
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

app.post("/api/get_by_multiprov_agetype", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

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
    FROM (SELECT mdp.PROVINCE_NAME,
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
            WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}) ad 
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

app.post("/api/get_by_multiprov_ageedu", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.PROVINCE_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}) ad 
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

app.post("/api/get_by_multiprov_ageocc", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    let wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `mdp.PROVINCE_CODE='${e}' OR ` : wh += `mdp.PROVINCE_CODE='${e}'`
    })

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.PROVINCE_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND ${wh}) ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`

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

// province
app.post("/api/get_by_province_total", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME  AS cat, 
        mdp.DISTRICT_NAME,
        mdp.AMPCODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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

app.post("/api/get_by_province_sex", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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

app.post("/api/get_by_province_type", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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

app.post("/api/get_by_province_age", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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
app.post("/api/get_by_province_edu", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
    WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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

app.post("/api/get_by_province_occ", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    WHERE mdp.ADDRESS_CODE='${address_code}' ${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
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

app.post("/api/get_by_province_agetype", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
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
    FROM (SELECT mdp.DISTRICT_NAME,
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
            WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
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

app.post("/api/get_by_province_ageedu", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
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

app.post("/api/get_by_province_ageocc", async (req, res) => {
    let { address_code, province_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`

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

// amphoe
app.post("/api/get_by_amphoe_total", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME  AS cat, 
        mdp.SUBDISTRICT_NAME,
        mdp.TAMCODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_amphoe_sex", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME  AS cat, 
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_amphoe_type", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat, 
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_amphoe_age", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri}  AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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
app.post("/api/get_by_amphoe_edu", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
        GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
        ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_amphoe_occ", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_amphoe_agetype", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
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
    FROM (SELECT mdp.DISTRICT_NAME,
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
            WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL) ad 
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

app.post("/api/get_by_amphoe_ageedu", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL) ad 
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

app.post("/api/get_by_amphoe_ageocc", async (req, res) => {
    let { address_code, amphoe_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.AMPCODE='${amphoe_code}' AND mdp.SUBDISTRICT_NAME IS NOT NULL) ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`

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


// tambon non edit
app.post("/api/get_by_tambon_total", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat, 
        mdp.SUBDISTRICT_NAME,
        mdp.TAMCODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.TAMCODE='${tambon_code}'
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_tambon_sex", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME  AS cat, 
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.TAMCODE='${tambon_code}'
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_tambon_type", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat, 
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
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.TAMCODE='${tambon_code}'
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_tambon_age", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.TAMCODE='${tambon_code}'
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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
app.post("/api/get_by_tambon_edu", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri} AND mdp.TAMCODE='${tambon_code}'
        GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
        ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_tambon_occ", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT mdp.SUBDISTRICT_NAME AS cat,
        SUM(CASE mdp.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
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
    WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.TAMCODE='${tambon_code}'
    GROUP BY mdp.SUBDISTRICT_NAME, mdp.TAMCODE 
    ORDER BY mdp.SUBDISTRICT_NAME`
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

app.post("/api/get_by_tambon_agetype", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
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
    FROM (SELECT mdp.DISTRICT_NAME,
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
            WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.TAMCODE='${tambon_code}') ad 
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

app.post("/api/get_by_tambon_ageedu", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.TAMCODE='${tambon_code}') ad 
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

app.post("/api/get_by_tambon_ageocc", async (req, res) => {
    let { address_code, tambon_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
        SUM(CASE ad.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
        SUM(CASE ad.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
        SUM(CASE ad.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
        SUM(CASE ad.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
        SUM(CASE ad.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
        SUM(CASE ad.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
        SUM(CASE ad.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
        SUM(CASE ad.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
        SUM(CASE ad.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
        SUM(CASE ad.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
        SUM(CASE ad.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
        SUM(CASE ad.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
        SUM(CASE ad.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
        SUM(CASE ad.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
        SUM(CASE ad.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
        SUM(CASE ad.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
        SUM(CASE ad.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
        SUM(CASE ad.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
        SUM(CASE ad.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
        SUM(CASE ad.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) 0-5 ปี' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14 ปี' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21 ปี' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59 ปี' ELSE '5) 60 ปีขึ้นไป' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}'${pri} AND mdp.TAMCODE='${tambon_code}') ad 
    GROUP BY ad.AGE
    ORDER BY ad.AGE`

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

//// 

app.post("/api/get_by_province", async (req, res) => {
    let { region_code, province_code, address_code, privilege } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mda.privilege ='01' OR mda.privilege ='02')` : pri = `AND mda.privilege ='${privilege}'`

    let where;
    if (!province_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.REGION_CODE='${region_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.PROVINCE_CODE ='${province_code}'`;
    }

    const sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, 
            COUNT(mda.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mda.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mda.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F
            FROM "DEPGIS".V_MN_DES_PERSON mda 
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME`
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

app.post("/api/get_by_amp", async (req, res) => {
    let { province_code, amphoe_code, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mda.privilege ='01' OR mda.privilege ='02')` : pri = `AND mda.privilege ='${privilege}'`

    let where;
    if (!amphoe_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.PROVINCE_CODE = '${province_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.AMPCODE='${amphoe_code}'`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mda.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mda.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
            FROM "DEPGIS".V_MN_DES_PERSON mda 
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME ,mda.AMPCODE, mda.DISTRICT_NAME`

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

app.post("/api/get_by_tam", async (req, res) => {
    let { amphoe_code, tambon_code, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mda.privilege ='01' OR mda.privilege ='02')` : pri = `AND mda.privilege ='${privilege}'`

    let where;
    if (!tambon_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.AMPCODE = '${amphoe_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}'${pri} AND mda.TAMCODE ='${tambon_code}'`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME, 
            COUNT(mda.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mda.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mda.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
            FROM "DEPGIS".V_MN_DES_PERSON mda 
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME ,mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME`

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

app.post("/api/get_tam_tb", async (req, res) => {
    let { tambon_code, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    let sql = `SELECT mda.*
        FROM "DEPGIS".V_MN_DES_PERSON mda 
        WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.TAMCODE ='${tambon_code}'`

    try {
        const result = await connection.execute(sql, [], { maxRows: 10000 });
        res.status(200).json({
            data: result.rows
        })
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

app.post('/api/card_info', async (req, res) => {
    const { service_code, dtTh, procode } = req.body
    let wh

    if (service_code == "CRD_EXP") {
        if (procode == "") {
            wh = `WHERE mcr.REQUEST_SERVICE_CODE = '${service_code}' AND mcr.CARD_EXPIRE_DATE = '${dtTh}'`
        } else {
            wh = `WHERE mcr.REQUEST_SERVICE_CODE = '${service_code}' AND mcr.CARD_EXPIRE_DATE = '${dtTh}' AND bp.PROVINCE_CODE = '${procode}'`
        }
    } else {
        if (procode == "") {
            wh = `WHERE mcr.REQUEST_SERVICE_CODE = '${service_code}' AND mcr.REQUEST_DATE = '${dtTh}'`
        } else {
            wh = `WHERE mcr.REQUEST_SERVICE_CODE = '${service_code}' AND mcr.REQUEST_DATE = '${dtTh}' AND bp.PROVINCE_CODE = '${procode}'`
        }
    }
    // console.log(wh);
    let connection = await oracledb.getConnection(dbConfig);
    let sql = `SELECT 
            mcr.REQUEST_DATE, 
            mcr.REQUEST_SERVICE_CODE,
            mcr.REQUEST_FIRST_NAME,
            mcr.REQUEST_LAST_NAME, 
            mcr.REQUEST_AGE,
            mcr.ISSUE_DATE,
            mcr.CARD_ISSUE_DATE,
            mcr.CARD_EXPIRE_DATE,
            bp.PROVINCE_NAME,
            bd2.DISTRICT_NAME,
            bs.SUBDISTRICT_NAME
            FROM NEP_CARD.MN_CRD_REQUEST mcr 
            LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mcr.REQUEST_PROVINCE_CODE = bp.PROVINCE_CODE 
            LEFT JOIN "OPP$_DBA".BS_DISTRICT bd2 ON CONCAT(mcr.REQUEST_PROVINCE_CODE,mcr.REQUEST_DISTRICT_CODE)  = CONCAT(bd2.PROVINCE_CODE,bd2.DISTRICT_CODE) 
            LEFT JOIN "OPP$_DBA".BS_SUBDISTRICT bs ON CONCAT(mcr.REQUEST_PROVINCE_CODE, CONCAT(mcr.REQUEST_DISTRICT_CODE, SUBSTR(mcr.REQUEST_SUBDISTRICT_CODE, 1,2))) = CONCAT(bs.PROVINCE_CODE, CONCAT(bs.DISTRICT_CODE, SUBSTR(bs.SUBDISTRICT_CODE, 1,2))) 
            ${wh}`

    try {
        const result = await connection.execute(sql, [], { maxRows: 2000 });
        res.status(200).json({
            data: result.rows
        })
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

// country

app.post("/api/get_by_age", async (req, res) => {
    let { address_code, privilege, year, age_start, age_end } = req.body
    console.log(address_code, privilege, year, age_start, age_end);
    let connection = await oracledb.getConnection(dbConfig);
    let pri
    privilege == "00" ? pri = `AND (mdp.privilege ='01' OR mdp.privilege ='02')` : pri = `AND mdp.privilege ='${privilege}'`

    const sql = `SELECT a.SEX_CODE, SUM(CASE  WHEN a.SEX_CODE='M' OR a.SEX_CODE='F' OR a.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM (SELECT  
        mdp.BIRTH_DATE,
        mdp.SEX_CODE,
        SUBSTR(mdp.BIRTH_DATE,-4),
        (${year} - (SUBSTR(mdp.BIRTH_DATE,-4))) AS AGE_NOW
        FROM "DEPGIS".V_MN_DES_PERSON mdp  
        WHERE mdp.ADDRESS_CODE ='${address_code}' ${pri}) a
    WHERE a.AGE_NOW BETWEEN ${age_start} AND ${age_end}
    GROUP BY a.SEX_CODE`
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