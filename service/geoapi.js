const e = require('express');
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

app.get("/geoapi/get-bound2/:lyr/:val", (req, res) => {
    const lyr = req.params.lyr;
    const val = req.params.val;
    let sql;

    if (lyr == "th") {
        sql = `SELECT rg_code as code, rg_th as name, ST_AsGeoJSON(geom) as geom FROM th_region_sim`;
    } else if (lyr == "reg") {
        sql = `SELECT pv_code as code, pv_th as name, ST_AsGeoJSON(geom) as geom FROM th_province
            WHERE rg_code = '${val}'`;
    } else if (lyr == "pro") {
        sql = `SELECT ap_code as code, ap_th as name, ST_AsGeoJSON(geom) as geom FROM th_amphoe
            WHERE pv_code = '${val}'`;
    } else if (lyr == "amp") {
        sql = `SELECT tb_code as code, tb_th as name, ST_AsGeoJSON(geom) as geom FROM th_tambon
            WHERE ap_code = '${val}'`;
    } else if (lyr == "tam") {
        sql = `SELECT tb_code as code, tb_th as name, ST_AsGeoJSON(geom) as geom FROM th_tambon
            WHERE tb_code = '${val}'`;
    }
    // console.log(sql);
    th.query(sql).then((r) => {
        let arr = []
        r.rows.forEach(e => {
            let json = {
                type: "Feature",
                properties: {
                    code: e.code,
                    name: e.name
                },
                geometry: JSON.parse(e.geom)
            }
            arr.push(json)
        });

        res.status(200).json({
            data: arr
        });
    });
})



app.post("/geoapi/get-multiprov", (req, res) => {
    const { province_code } = req.body;

    var wh = ""
    province_code.forEach((e, i) => {
        i < province_code.length - 1 ? wh += `pv_code='${e}' OR ` : wh += `pv_code='${e}'`
    })

    // console.log(wh);

    let sql = `SELECT pv_code as code, pv_th as name, ST_AsGeoJSON(geom) as geom FROM th_province
            WHERE ${wh}`;

    console.log(sql);
    th.query(sql).then((r) => {
        let arr = []
        r.rows.forEach(e => {
            let json = {
                type: "Feature",
                properties: {
                    code: e.code,
                    name: e.name
                },
                geometry: JSON.parse(e.geom)
            }
            arr.push(json)
        });

        console.log(arr);

        res.status(200).json({
            data: arr
        });
    });
})


module.exports = app;