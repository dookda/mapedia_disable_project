const express = require('express');
const app = express();
const oracledb = require('oracledb');
const con = require("./db");
const dbConfig = con.dbConfig;

oracledb.initOracleClient({ libDir: '/Users/sakdahomhuan/instantclient_19_8' });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.post("/api/get_by_region", async (req, res) => {
    let { address_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);

    const sql = `SELECT br.REGION_CODE, 
        br.REGION_NAME_THAI,
        COUNT(br.REGION_CODE) AS cnt,
        SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
        SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
    FROM "OPP$_DBA".MN_DES_PERSON mdp 
    LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
    LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
    LEFT JOIN "OPP$_DBA".BS_REGION br ON bp.REGION_CODE = br.REGION_CODE 
    WHERE mda.ADDRESS_CODE ='${address_code}' GROUP BY br.REGION_CODE, br.REGION_NAME_THAI ORDER BY br.REGION_NAME_THAI`

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
    let { province_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME`;
    } else {
        where = `WHERE bp.PROVINCE_CODE ='${province_code}' GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME`;
    }

    const sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, 
            COUNT(bp.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        ${where}`

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
    let { province_code, amphoe_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.PROVINCE_CODE = '${province_code}'`;
    } else {
        where = `WHERE CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE)='${amphoe_code}'`;
    }

    let sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME,
            COUNT(bp.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        LEFT JOIN "OPP$_DBA".BS_DISTRICT bd ON CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE)  = CONCAT(bd.PROVINCE_CODE,bd.DISTRICT_CODE) 
        ${where}
        GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME ,bd.DISTRICT_CODE, bd.DISTRICT_NAME`

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
    let { amphoe_code, tambon_code } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!tambon_code) {
        where = `WHERE CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE) = '${amphoe_code}'`;
    } else {
        where = `WHERE CONCAT(mda.PROVINCE_CODE, CONCAT(mda.DISTRICT_CODE, SUBSTR(mda.SUB_DISTRICT, 1, 2))) ='${tambon_code}'`;
    }

    let sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME, bs.SUBDISTRICT_CODE, bs.SUBDISTRICT_NAME, 
            COUNT(bp.PROVINCE_CODE) AS TOTLE,
            SUM(CASE mdp.SEX_CODE WHEN 'M' THEN 1 ELSE 0 END) AS M,
            SUM(CASE mdp.SEX_CODE WHEN 'F' THEN 1 ELSE 0 END) AS F 
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        LEFT JOIN "OPP$_DBA".BS_DISTRICT bd ON CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE)  = CONCAT(bd.PROVINCE_CODE,bd.DISTRICT_CODE) 
        LEFT JOIN "OPP$_DBA".BS_SUBDISTRICT bs ON CONCAT(mda.PROVINCE_CODE, CONCAT(mda.DISTRICT_CODE, SUBSTR(mda.SUB_DISTRICT, 1,2))) = CONCAT(bs.PROVINCE_CODE, CONCAT(bs.DISTRICT_CODE, SUBSTR(bs.SUBDISTRICT_CODE , 1,2))) 
        ${where}
        GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME ,bd.DISTRICT_CODE, bd.DISTRICT_NAME, bs.SUBDISTRICT_CODE, bs.SUBDISTRICT_NAME`
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
    let { province_code, age_start, age_end } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (province_code == "ALL") {
        where = `WHERE ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    } else {
        where = `WHERE bp.PROVINCE_CODE = '${province_code}' AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    }

    let sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, 
            COUNT(bp.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE bd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE bd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE bd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE bd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE bd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE bd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE bd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_DEFORM bd ON mdd.DEFORM_ID = bd.DEFORM_ID 
        ${where}
        GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME`

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
    let { province_code, amphoe_code, age_start, age_end } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!amphoe_code) {
        where = `WHERE mda.PROVINCE_CODE = '${province_code}' AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    } else {
        where = `WHERE CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE)='${amphoe_code}' AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    }

    let sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME,
            COUNT(bp.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE bd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE bd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE bd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE bd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE bd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE bd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE bd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        LEFT JOIN "OPP$_DBA".BS_DISTRICT bd ON CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE) = CONCAT(bd.PROVINCE_CODE,bd.DISTRICT_CODE)
        LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_DEFORM bd ON mdd.DEFORM_ID = bd.DEFORM_ID 
        ${where}
        GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME`
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
    let { tambon_code, amphoe_code, age_start, age_end } = req.body
    let connection = await oracledb.getConnection(dbConfig);
    let where;
    if (!tambon_code) {
        where = `WHERE CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE) = '${amphoe_code}' AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    } else {
        where = `WHERE CONCAT(mda.PROVINCE_CODE, CONCAT(mda.DISTRICT_CODE, SUBSTR(mda.SUB_DISTRICT, 1, 2))) ='${tambon_code}' AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) > ${age_start} AND ((SELECT EXTRACT(YEAR FROM SYSDATE) FROM DUAL)-(SUBSTR(mdp.BIRTH_DATE,-4)-543)) <= ${age_end}`;
    }

    let sql = `SELECT bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME, bs.SUBDISTRICT_CODE, bs.SUBDISTRICT_NAME,
            COUNT(bp.PROVINCE_CODE) AS TOTAL,
            SUM(CASE bd.DEFORM_ID WHEN '0' THEN 1 ELSE 0 END) AS type0, 
            SUM(CASE bd.DEFORM_ID WHEN '11' THEN 1 ELSE 0 END) AS type12,
            SUM(CASE bd.DEFORM_ID WHEN '12' THEN 1 ELSE 0 END) AS type13,
            SUM(CASE bd.DEFORM_ID WHEN '13' THEN 1 ELSE 0 END) AS type14,
            SUM(CASE bd.DEFORM_ID WHEN '14' THEN 1 ELSE 0 END) AS type15,
            SUM(CASE bd.DEFORM_ID WHEN '15' THEN 1 ELSE 0 END) AS type16,
            SUM(CASE bd.DEFORM_ID WHEN '16' THEN 1 ELSE 0 END) AS type17,
            SUM(CASE bd.DEFORM_ID WHEN '17' THEN 1 ELSE 0 END) AS type18
        FROM "OPP$_DBA".MN_DES_PERSON mdp 
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS mda ON mdp.MAIMAD_ID = mda.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_PROVINCE bp ON mda.PROVINCE_CODE = bp.PROVINCE_CODE 
        LEFT JOIN "OPP$_DBA".BS_DISTRICT bd ON CONCAT(mda.PROVINCE_CODE,mda.DISTRICT_CODE) = CONCAT(bd.PROVINCE_CODE,bd.DISTRICT_CODE)
        LEFT JOIN "OPP$_DBA".BS_SUBDISTRICT bs ON CONCAT(mda.PROVINCE_CODE, CONCAT(mda.DISTRICT_CODE, SUBSTR(mda.SUB_DISTRICT, 1,2))) = CONCAT(bs.PROVINCE_CODE, CONCAT(bs.DISTRICT_CODE, SUBSTR(bs.SUBDISTRICT_CODE , 1,2))) 
        LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID = mdd.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_DEFORM bd ON mdd.DEFORM_ID = bd.DEFORM_ID 
        ${where}
        GROUP BY bp.PROVINCE_CODE, bp.PROVINCE_NAME, bd.DISTRICT_CODE, bd.DISTRICT_NAME, bs.SUBDISTRICT_CODE, bs.SUBDISTRICT_NAME`
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