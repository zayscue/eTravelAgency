'use strict';

const express = require('express');
const redis = require('redis');
const moment = require('moment');
const shortid = require('shortid');
const {promisify} = require('util');

const PORT = 8080;
const HOST = 'localhost';
const REDIS_HOST = 'localhost';
const FLIGHTS = [
    {
        "id": "VayEUZWn9",
        "departureLocation":  "JFK",
        "departureTime": moment().toISOString(),
        "arrivalLocation": "RDU",
        "arrivalTime": moment().add(7, 'hours').toISOString(),
        "airline": "Delta"
    },
    {
        "id": "Kc-SfwTO7i",
        "departureLocation":  "JFK",
        "departureTime": moment().toISOString(),
        "arrivalLocation": "MIA",
        "arrivalTime": moment().add(10, 'hours').toISOString(),
        "airline": "American Airlines"
    }
];

const client = redis.createClient({
    "host": REDIS_HOST
});

const hsetAsync = promisify(client.hset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const saddAsync = promisify(client.sadd).bind(client);

async function flightsDataSeeder() {
    const flightsKeyExists = await existsAsync('flights');
    if(!flightsKeyExists) {
        for(let i = 0; i < FLIGHTS.length; i++) {
            const flight = FLIGHTS[i];
            const key = `flight:${flight.id}`;
            await saddAsync('flights', key);
            for(let propertyName in flight) {
                const value = flight[propertyName];
                await hsetAsync(key, propertyName, value.toString());
            }
        }
    }
};

const startupPromise = new Promise(async function(resolve, reject) {
    try {
        await flightsDataSeeder();
        resolve();
    } catch(exception) {
        reject(exception);
    }
});

startupPromise.then(function() {
    const app = express();

    app.get('/api/flights', async (req, res) => {
        const members = await smembersAsync('flights');
        let flights = [];
        for(let i = 0; i < members.length; i++) {
            const flightKey = members[i];
            flights.push(await hgetallAsync(flightKey));
        }
        res.json(flights);
    });

    app.get('/api/flights/:flightId', async (req, res) => {
        const params = req.params;
        const flightId = params.flightId;
        const key = `flight:${flightId}`;
        if(await sismemberAsync('flights', key)) {
            const flight = await hgetallAsync(key);
            res.json(flight);
        } else  {
            res.status(404).send('Not found');
        }
    });

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
});