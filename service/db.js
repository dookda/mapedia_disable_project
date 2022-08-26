const Pool = require('pg').Pool
const { Client } = require('pg')

const dbConfig = {
    user: "depgis",
    password: "D3p2022Gi$",
    connectString: "192.168.3.170:1521/ORCL"
}

const th = new Pool({
    user: 'postgres',
    host: '192.168.3.110',
    database: 'DEPGIS',
    password: 'KcvNXnoA&jP2',
    port: 5432,
});

module.exports.dbConfig = dbConfig;
module.exports.th = th;

