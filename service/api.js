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
        // const sql = `SELECT * FROM "OPP$_DBA".MN_DES_ADDRESS`;
        const sql = `SELECT mdp.*,
            mdah.ADDRESS_CODE,
            mdah.SEQ_NO,
            mdah.ADDRESS,
            mdah.MOO,
            mdah.SOI,
            mdah.STREET,
            mdah.SUB_DISTRICT,
            mdah.DISTRICT_CODE,
            mdah.PROVINCE_CODE,
            mdah.COUNTRY_CODE,
            mdah.POSTCODE,
            mdah.TELEPHONE,
            mdah.FAX,
            mdah.ADDRESS_NO,
            mdah.ADDRESS_ID,
            mdah.HIS_ID,
            mdd.DEFORM_ID,
            mdd.DEFORM_LEVEL,
            mdd.AGE,
            mdd.DEFORM_CAUSE_ID,
            mdd.DEF_DESC,
            mdd.SEQ_NO,
            mdd.DEFORM_SUB_NAME,
            mdd.TRANSFER_STATUS,
            mdd.AUTISTIC_STATUS,
            mdd.DEFORM_YEAR,
            mdd.DEFORM_MONTH,
            mdd.DIAGNOSE_STATUS,
            mdd.DEF_COMMENT,
            bd.FROM_TYPE_6_DOCTOR,
            bd.FORM_TYPE_8_STATUS,
            bd.FORM_TYPE_8_ALIAS,
            bd.FORM_COV_STATUS,
            bd.FORM_COV_ALIAS,
            bd.DEFORM_NAME,
            bd.STATUS,
            bd.CARD_STATUS,
            bd.CARD_STAFF_STATUS,
            bd.CARD_DOCTOR_STATUS,
            bd.DEFORM_ALIAS,
            bd.FORM_TYPE_6_STATUS,
            bd.FROM_TYPE_6_STAFF
        FROM "OPP$_DBA".MN_DES_PERSON mdp
        LEFT JOIN "OPP$_DBA".MN_DES_ADDRESS_HIS mdah ON mdp.MAIMAD_ID = mdah.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".MN_DES_DEFORMED mdd ON mdp.MAIMAD_ID =mdd.MAIMAD_ID 
        LEFT JOIN "OPP$_DBA".BS_DEFORM bd  ON mdd.DEFORM_ID = bd.DEFORM_ID`
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