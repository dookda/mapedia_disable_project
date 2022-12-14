const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

const api = require('./service/api');
app.use(api);

const apireport = require('./service/apireport');
app.use(apireport);

const geoapi = require('./service/geoapi');
app.use(geoapi);

const capi = require('./service/capi')
app.use(capi)

const apiauthen = require('./service/apiauthen')
app.use(apiauthen)

app.use('/', express.static('www'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})