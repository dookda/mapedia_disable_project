const express = require('express');
const app = express();
const oracledb = require('oracledb');
const con = require("./db");
const dbConfig = con.dbConfig;

// oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.post("/api/get_by_region", async (req, res) => {
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT mda.REGION_CODE, 
        mda.REGION_NAME_THAI,
        COUNT(mda.REGION_CODE) AS cnt,
        SUM(CASE mda.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mda.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
    FROM "DEPGIS".V_MN_DES_PERSON mda
    WHERE mda.ADDRESS_CODE ='${address_code}' 
    GROUP BY mda.REGION_CODE, mda.REGION_NAME_THAI 
    ORDER BY mda.REGION_NAME_THAI`

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

app.post("/api/get_by_province", async (req, res) => {
    let { province_code, address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `mda.ADDRESS_CODE = '${address_code}'`;
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
            SUM(CASE mda.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mda.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mda.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mda.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mda.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mda.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mda.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mda.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
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
            SUM(CASE mda.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mda.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mda.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mda.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mda.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mda.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mda.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mda.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
            FROM "DEPGIS".V_MN_DES_PERSON mda  
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
            SUM(CASE mda.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mda.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mda.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mda.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mda.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mda.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mda.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mda.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
            FROM "DEPGIS".V_MN_DES_PERSON mda  
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
            SUM(CASE mda.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE mda.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE mda.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE mda.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE mda.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE mda.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE mda.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE mda.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
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

module.exports = app;