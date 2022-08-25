const express = require('express');
const app = express();
const oracledb = require('oracledb');
const con = require("./db");
const dbConfig = con.dbConfig;

// oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat, 
        mdp.REGION_NAME_THAI,
        mdp.REGION_CODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.REGION_NAME_THAI AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE='${address_code}' AND mdp.REGION_CODE IS NOT NULL
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
                CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                            CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                            END 
                        END  
                    END 
                END AS age,
                mdd.DEFORM_ID
            FROM "DEPGIS".V_MN_DES_PERSON mdp  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
            WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL) ad 
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.REGION_NAME_THAI,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL) ad 
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
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE IS NOT NULL) ad 
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.PROVINCE_NAME  AS cat, 
        mdp.PROVINCE_NAME,
        mdp.PROVINCE_CODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}'
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}'
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}'
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}'
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.PROVINCE_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE='${address_code}' AND mdp.REGION_CODE='${region_code}'
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
                CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                            CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                            END 
                        END  
                    END 
                END AS age,
                mdd.DEFORM_ID
            FROM "DEPGIS".V_MN_DES_PERSON mdp  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
            WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}') ad 
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.PROVINCE_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}') ad 
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
    let { address_code, region_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.REGION_CODE='${region_code}') ad 
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.DISTRICT_NAME  AS cat, 
        mdp.DISTRICT_NAME,
        mdp.AMPCODE,
        SUM(CASE  WHEN mdp.SEX_CODE='M' OR mdp.SEX_CODE='F' OR mdp.SEX_CODE IS NULL  THEN 1 ELSE 0 END) AS cnt
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F   
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
    GROUP BY mdp.DISTRICT_NAME, mdp.AMPCODE 
    ORDER BY mdp.DISTRICT_NAME`
    console.log(sql);

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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE WHEN mdp.AGE_NOW  <= 5 THEN 1 ELSE 0 END) AS age5,
        SUM(CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN 1 ELSE 0 END) AS age14,
        SUM(CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN 1 ELSE 0 END) AS age21,
        SUM(CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN 1 ELSE 0 END) AS age59,
        SUM(CASE WHEN mdp.AGE_NOW  > 59   THEN 1 ELSE 0 END) AS age60
        
    FROM "DEPGIS".V_MN_DES_PERSON mdp  
    WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mdp.DISTRICT_NAME AS cat,
        SUM(CASE WHEN bdt.DEGT_GROUP_CODE = '$Low$' OR bdt.DEGT_GROUP_CODE = '$Mid$' OR bdt.DEGT_GROUP_CODE = '$Hig$' OR bdt.DEGT_GROUP_CODE = '$Oth$' THEN 1 ELSE 0 END) AS cnt,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
        FROM "DEPGIS".V_MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
    WHERE mdp.ADDRESS_CODE='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
                CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                            CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                            END 
                        END  
                    END 
                END AS age,
                mdd.DEFORM_ID
            FROM "DEPGIS".V_MN_DES_PERSON mdp  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
            WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT ad.AGE AS CAT,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
        SUM(CASE ad.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
    FROM (SELECT mdp.DISTRICT_NAME,
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            bdt.DEGT_GROUP_CODE
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mdp.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
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
    let { address_code, province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

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
            CASE WHEN mdp.AGE_NOW  <= 5 THEN '1) <5' ELSE 
                CASE WHEN mdp.AGE_NOW  > 5 AND mdp.AGE_NOW  <= 14 THEN '2) 6-14' ELSE 
                    CASE WHEN mdp.AGE_NOW  > 14 AND mdp.AGE_NOW  <= 21 THEN '3) 15-21' ELSE 
                        CASE WHEN mdp.AGE_NOW  > 21 AND mdp.AGE_NOW  <= 59 THEN '4) 22-59' ELSE '5) >60' 
                        END 
                    END  
                END 
            END AS age,
            mdp.OCC
        FROM "DEPGIS".V_MN_DES_PERSON mdp 
        WHERE mdp.ADDRESS_CODE ='${address_code}' AND mdp.PROVINCE_CODE='${province_code}' AND mdp.DISTRICT_NAME IS NOT NULL) ad 
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

// amp
app.post("/api/get_by_province", async (req, res) => {
    let { region_code, province_code, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!province_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.REGION_CODE='${region_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE ='${province_code}'`;
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
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE='${amphoe_code}'`;
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
    let where;
    if (!tambon_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE = '${amphoe_code}'`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.TAMCODE ='${tambon_code}'`;
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

app.post("/api/get_by_age_type_pro", async (req, res) => {
    let { province_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, 
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mdd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mdd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mdd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mdd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mdd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mdd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mdd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mdd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
            FROM "DEPGIS".V_MN_DES_PERSON mda  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mda.MAIMAD_ID = mdd.MAIMAD_ID
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME`

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

app.post("/api/get_by_age_type_amp", async (req, res) => {
    let { province_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE='${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mdd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mdd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mdd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mdd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mdd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mdd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mdd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mdd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
            FROM "DEPGIS".V_MN_DES_PERSON mda  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mda.MAIMAD_ID = mdd.MAIMAD_ID
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME`
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

app.post("/api/get_by_age_type_tam", async (req, res) => {
    let { tambon_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!tambon_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE = '${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.TAMCODE = '${tambon_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mdd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mdd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mdd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mdd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mdd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mdd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mdd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mdd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
            FROM "DEPGIS".V_MN_DES_PERSON mda  
            LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mda.MAIMAD_ID = mdd.MAIMAD_ID
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME`
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

// by edu
app.post("/api/get_by_age_edu_pro", async (req, res) => {
    let { province_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, 
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
            FROM "DEPGIS".V_MN_DES_PERSON mda
            LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mda.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME`
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

app.post("/api/get_by_age_edu_amp", async (req, res) => {
    let { province_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE='${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
            FROM "DEPGIS".V_MN_DES_PERSON mda
            LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mda.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME`
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

app.post("/api/get_by_age_edu_tam", async (req, res) => {
    let { tambon_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!tambon_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE = '${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.TAMCODE = '${tambon_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Low$' THEN 1 ELSE 0 END) AS low, 
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Mid$' THEN 1 ELSE 0 END) AS mid,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Hig$' THEN 1 ELSE 0 END) AS hig,
            SUM(CASE bdt.DEGT_GROUP_CODE WHEN '$Oth$' THEN 1 ELSE 0 END) AS oth
            FROM "DEPGIS".V_MN_DES_PERSON mda
            LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mda.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME`
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

// by occ pro
app.post("/api/get_by_age_occ_pro", async (req, res) => {
    let { province_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, 
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mda.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
            SUM(CASE mda.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
            SUM(CASE mda.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
            SUM(CASE mda.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
            SUM(CASE mda.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
            SUM(CASE mda.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
            SUM(CASE mda.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
            SUM(CASE mda.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
            SUM(CASE mda.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
            SUM(CASE mda.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
            SUM(CASE mda.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
            SUM(CASE mda.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
            SUM(CASE mda.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
            SUM(CASE mda.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
            SUM(CASE mda.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
            SUM(CASE mda.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
            SUM(CASE mda.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
            SUM(CASE mda.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
            SUM(CASE mda.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
            SUM(CASE mda.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
            SUM(CASE mda.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
            FROM "DEPGIS".V_MN_DES_PERSON mda
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME`

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

app.post("/api/get_by_age_occ_amp", async (req, res) => {
    let { province_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.PROVINCE_CODE = '${province_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE='${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mda.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
            SUM(CASE mda.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
            SUM(CASE mda.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
            SUM(CASE mda.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
            SUM(CASE mda.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
            SUM(CASE mda.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
            SUM(CASE mda.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
            SUM(CASE mda.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
            SUM(CASE mda.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
            SUM(CASE mda.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
            SUM(CASE mda.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
            SUM(CASE mda.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
            SUM(CASE mda.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
            SUM(CASE mda.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
            SUM(CASE mda.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
            SUM(CASE mda.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
            SUM(CASE mda.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
            SUM(CASE mda.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
            SUM(CASE mda.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
            SUM(CASE mda.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
            SUM(CASE mda.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
            FROM "DEPGIS".V_MN_DES_PERSON mda
            LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mda.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME`
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

app.post("/api/get_by_age_occ_tam", async (req, res) => {
    let { tambon_code, amphoe_code, age_start, age_end, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!tambon_code) {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.AMPCODE = '${amphoe_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    } else {
        where = `WHERE mda.ADDRESS_CODE = '${address_code}' AND mda.TAMCODE = '${tambon_code}' AND (mda.AGE_NOW > ${age_start} AND mda.AGE_NOW <= ${age_end})`;
    }

    let sql = `SELECT mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME,
            COUNT(mda.PROVINCE_CODE) AS TOTAL,
            SUM(CASE mda.OCC WHEN '001' THEN 1 ELSE 0 END) AS occ_001,
            SUM(CASE mda.OCC WHEN '002' THEN 1 ELSE 0 END) AS occ_002,
            SUM(CASE mda.OCC WHEN '003' THEN 1 ELSE 0 END) AS occ_003,
            SUM(CASE mda.OCC WHEN '004' THEN 1 ELSE 0 END) AS occ_004,
            SUM(CASE mda.OCC WHEN '005' THEN 1 ELSE 0 END) AS occ_005,
            SUM(CASE mda.OCC WHEN '006' THEN 1 ELSE 0 END) AS occ_006,
            SUM(CASE mda.OCC WHEN '007' THEN 1 ELSE 0 END) AS occ_007,
            SUM(CASE mda.OCC WHEN '008' THEN 1 ELSE 0 END) AS occ_008,
            SUM(CASE mda.OCC WHEN '009' THEN 1 ELSE 0 END) AS occ_009,
            SUM(CASE mda.OCC WHEN '010' THEN 1 ELSE 0 END) AS occ_010,
            SUM(CASE mda.OCC WHEN '011' THEN 1 ELSE 0 END) AS occ_011,
            SUM(CASE mda.OCC WHEN '012' THEN 1 ELSE 0 END) AS occ_012,
            SUM(CASE mda.OCC WHEN '013' THEN 1 ELSE 0 END) AS occ_013,
            SUM(CASE mda.OCC WHEN '014' THEN 1 ELSE 0 END) AS occ_014,
            SUM(CASE mda.OCC WHEN '015' THEN 1 ELSE 0 END) AS occ_015,
            SUM(CASE mda.OCC WHEN '016' THEN 1 ELSE 0 END) AS occ_016,
            SUM(CASE mda.OCC WHEN '017' THEN 1 ELSE 0 END) AS occ_017,
            SUM(CASE mda.OCC WHEN '018' THEN 1 ELSE 0 END) AS occ_018,
            SUM(CASE mda.OCC WHEN '019' THEN 1 ELSE 0 END) AS occ_019,
            SUM(CASE mda.OCC WHEN '020' THEN 1 ELSE 0 END) AS occ_020,
            SUM(CASE mda.OCC WHEN '999' THEN 1 ELSE 0 END) AS occ_999
            FROM "DEPGIS".V_MN_DES_PERSON mda
            LEFT JOIN "OPP$_DBA".BS_DEGREE_TYPE bdt ON mda.DEGREE_TYPE_CODE = bdt.DEGREE_TYPE_CODE
            ${where}
            GROUP BY mda.PROVINCE_CODE, mda.PROVINCE_NAME, mda.AMPCODE, mda.DISTRICT_NAME, mda.TAMCODE, mda.SUBDISTRICT_NAME`
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