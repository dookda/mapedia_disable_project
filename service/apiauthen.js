const express = require('express')
const app = express();
const db = require("./db").th;

let { generateAccessToken, authenticateToken } = require("./jwt")


let checkUser = async (userid) => {
    let res = await db.query(`SELECT * FROM dis_register WHERE userid = '${userid}'`);
    if (res.rows.length > 0) {
        return "valid"
    } else {
        return "invalid"
    }
}

app.post('/dis-auth/authen', authenticateToken, (req, res) => {
    console.log();
    res.status(200).json(true)
})

app.post("/dis-auth/getalluser", async (req, res) => {
    const { userid } = req.body;
    const { prov } = req.body;
    let chk = checkUser(userid)
    chk.then(x => {
        if (x == "valid") {
            let sql
            if (prov) {
                sql = `SELECT userid,usrname,approved,uname, TO_CHAR(ts, 'DD-MM-YYYY HH24:MI:SS') as ndate FROM dis_register Where pro_name ='${prov}' order by ts desc;`
            } else {
                sql = `SELECT userid,usrname,approved,uname,TO_CHAR(ts, 'DD-MM-YYYY  HH24:MI:SS') as ndate FROM dis_register order by ts desc;`
            }
            db.query(sql, (e, r) => {
                res.status(200).json({
                    data: r.rows
                })
            })
        } else {
            res.status(200).json({
                data: "invalid"
            })
        }
    })
})

app.post('/dis-auth/getiduser', authenticateToken, (req, res) => {
    const { gid } = req.body;
    let sql = `SELECT * FROM dis_register WHERE gid = '${gid}'`
    db.query(sql, (e, r) => {
        if (r.rows.length > 0) {
            res.status(200).json({
                data: r.rows
            })
        } else {
            res.status(200).json({
                data: "invalid"
            })
        }
    })
})

app.post('/dis-auth/getuser', (req, res) => {
    const { usrname, pass } = req.body;
    let sql = `SELECT gid, userid, auth, usrname FROM dis_register WHERE usrname = '${usrname}' AND pass ='${pass}';`
    db.query(sql).then(r => {
        if (r.rows.length) {
            const token = generateAccessToken({ usrname });
            res.status(200).json({
                data: token,
                gid: r.rows[0].gid,
                auth: r.rows[0].auth,
                usrname: r.rows[0].usrname
            })
        } else {
            res.status(200).json({
                data: "invalid"
            })
        }
    })
});

app.post("/dis-auth/chkuser", async (req, res) => {
    const { userid } = req.body;
    let chk = checkUser(userid)
    chk.then(r => res.status(200).json({
        data: r
    }))
})

app.post("/dis-auth/chkusername", async (req, res) => {
    const { usrname } = req.body;
    // console.log(usrname);
    let sql = `SELECT gid FROM dis_register WHERE usrname = '${usrname}' `
    db.query(sql).then(r => {

        if (r.rows.length) {
            res.status(200).json({
                data: "yes"
            })
        } else {
            res.status(200).json({
                data: "no"
            })
        }
    })
})

app.post("/dis-auth/insertuser", async (req, res) => {
    const { data } = req.body;
    let userid = md5(Date.now());
    await db.query(`INSERT INTO dis_register(userid)VALUES('${userid}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE dis_register SET ${d}='${data[d]}' WHERE userid='${userid}'`
            // console.log(sql);
            await db.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/dis-auth/deleteuser", async (req, res) => {
    const { userid } = req.body;
    await db.query(`DELETE FROM dis_register WHERE userid='${userid}'`)

    res.status(200).json({
        data: "success"
    })
})

app.post("/dis-auth/approved", async (req, res) => {
    const { userid, approve } = req.body;
    let sql = `UPDATE dis_register SET approved ='${approve}' WHERE userid='${userid}'`
    // console.log(sql);
    db.query(sql, (e, r) => {

        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/dis-auth/updateprofile", async (req, res) => {
    const { userid, data } = req.body;

    let sql = `UPDATE dis_register SET editdate=now() WHERE userid='${userid}'`;
    await db.query(sql)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE dis_register SET ${d}='${data[d]}' WHERE userid='${userid}'`;
            // console.log(sql);
            await db.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/dis-auth/updateimgprofile", async (req, res) => {
    const { img, userid } = req.body;

    let sql = `UPDATE dis_register SET img='${img}' WHERE userid='${userid}'`;
    await db.query(sql, (e, r) => {
        res.status(200).json({
            data: "success"
        })
    })
})
app.post("/dis-auth/repassword", async (req, res) => {
    const { usrname, email, pass } = req.body;
    let sql = `SELECT gid, userid FROM dis_register WHERE email ='${email}' and usrname ='${usrname}';`
    await db.query(sql, (e, r) => {
        if (r.rows.length > 0) {
            db.query(` UPDATE dis_register SET pass ='${pass}' where email ='${email}' and usrname ='${usrname}';`);
            res.status(200).json({
                data: "success"
            })
        } else {
            res.status(200).json({
                data: "false"
            })
        }
    })
})

module.exports = app;