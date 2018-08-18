'use strict';

const express = require('express');
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient({
    "host": "flights.data"
});

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

const getAsync = promisify(client.get).bind(client);



app.get('/', (req, res) => {
    getAsync('foo').then(function(result) {
        res.send(result);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);