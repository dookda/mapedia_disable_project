const express = require('express');
const app = express.Router();
const con = require("./db");
const th = con.th;

app.get("/geoapi/get-extent/:lyr/:val", (req, res) => {
    const lyr = req.params.lyr;
    const val = req.params.val;
    let sql;

    if (lyr == "pro") {
        sql = `SELECT ST_AsGeoJSON(ST_Envelope(ST_FlipCoordinates(geom))) as geom
            FROM province_4326
            WHERE pv_idn = '${val}'`;
    } else if (lyr == "amp") {
        sql = `SELECT ST_AsGeoJSON(ST_Envelope(ST_FlipCoordinates(geom))) as geom
            FROM amphoe_4326
            WHERE ap_idn = '${val}'`;
    } else if (lyr == "tam") {
        sql = `SELECT ST_AsGeoJSON(ST_Envelope(ST_FlipCoordinates(geom))) as geom
            FROM tambon_4326
            WHERE tb_idn = '${val}'`;
    }

    th.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.get("/geoapi/get-bound/:lyr/:val", (req, res) => {
    const lyr = req.params.lyr;
    const val = req.params.val;
    let sql;

    if (lyr == "th") {
        sql = `SELECT ST_AsGeoJSON(geom) as geom
            FROM th_bound`;
    } else if (lyr == "reg") {
        sql = `SELECT ST_AsGeoJSON(geom) as geom
            FROM th_region_sim
            WHERE rg_code = '${val}'`;
    } else if (lyr == "pro") {
        sql = `SELECT ST_AsGeoJSON(geom) as geom
            FROM th_province
            WHERE pv_code = '${val}'`;
    } else if (lyr == "amp") {
        sql = `SELECT ST_AsGeoJSON(geom) as geom
            FROM th_amphoe
            WHERE ap_code = '${val}'`;
    } else if (lyr == "tam") {
        sql = `SELECT ST_AsGeoJSON(geom) as geom
            FROM th_tambon
            WHERE tb_code = '${val}'`;
    }

    th.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

module.exports = app;