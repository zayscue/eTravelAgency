'use strict';

const express = require('express');
const redis = require('redis');
const moment = require('moment');
const shortid = require('shortid');
const {promisify} = require('util');

const PORT = 8080;
const HOST = '0.0.0.0';
const REDIS_HOST = 'flights.data';
const FLIGHTS = [
    {
        "id": "VayEUZWn9",
        "departureLocation":  "JFK",
        "departureTime": moment().toISOString(),
        "arrivalLocation": "RDU",
        "arrivalTime": moment().add(7, 'hours').toISOString(),
        "airline": "Delta",
        "firstClassRate": 1200.43,
        "businessClassRate": 683.79,
        "economyClassRate": 340.52,
        "plane": "plane:oL1iu67-L"
    },
    {
        "id": "Kc-SfwTO7i",
        "departureLocation":  "JFK",
        "departureTime": moment().toISOString(),
        "arrivalLocation": "MIA",
        "arrivalTime": moment().add(9, 'hours').toISOString(),
        "airline": "American Airlines",
        "firstClassRate": 1310.72,
        "businessClassRate": 799.81,
        "economyClassRate": 400.08,
        "plane": "plane:oL1iu67-L"
    }
];
const PLANES = [
    {
        "id": "oL1iu67-L",
        "name": "AA-777",
        "manufacturer": "Boeing",
        "yearBuilt": 1994,
        "numberOfSeats": 242,
        "firstClass": [0,1,2,3],
        "businessClass": [4,5,6,7,8],
        "economyClass": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        "seatingChart": [
            [" 1A", "XXX", "XXX", "XXX", " 1D", " 1G", "XXX", "XXX", "XXX", "XXX", " 1J"],
            [" 2A", "XXX", "XXX", "XXX", " 2D", " 2G", "XXX", "XXX", "XXX", "XXX", " 2J"],
            [" 3A", "XXX", "XXX", "XXX", " 3D", " 3G", "XXX", "XXX", "XXX", "XXX", " 3J"],
            ["XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", " 8J"],
            [" 9A", " 9B", "XXX", "XXX", " 9D", " 9E", " 9G", "XXX", "XXX", " 9H", " 9J"],
            ["10A", "10B", "XXX", "XXX", "10D", "10E", "10G", "XXX", "XXX", "10H", "10J"],
            ["11A", "11B", "XXX", "XXX", "11D", "11E", "11G", "XXX", "XXX", "11H", "11J"],
            ["12A", "12B", "XXX", "XXX", "12D", "12E", "12G", "XXX", "XXX", "12H", "12J"],
            ["13A", "13B", "XXX", "XXX", "13D", "13E", "13G", "XXX", "XXX", "13H", "13J"],
            ["20A", "20B", "XXX", "20C", "20D", "20E", "20F", "20G", "XXX", "20H", "20J"],
            ["21A", "21B", "XXX", "21C", "21D", "21E", "21F", "21G", "XXX", "21H", "21J"],
            ["22A", "22B", "XXX", "22C", "22D", "22E", "22F", "22G", "XXX", "22H", "22J"],
            ["23A", "23B", "XXX", "23C", "23D", "23E", "23F", "23G", "XXX", "23H", "23J"],
            ["24A", "24B", "XXX", "24C", "24D", "24E", "24F", "24G", "XXX", "24H", "24J"],
            ["25A", "25B", "XXX", "25C", "25D", "25E", "25F", "25G", "XXX", "25H", "25J"],
            ["26A", "26B", "XXX", "26C", "26D", "26E", "26F", "26G", "XXX", "26H", "26J"],
            ["27A", "27B", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "27H", "27J"],
            ["XXX", "XXX", "XXX", "30C", "30D", "30E", "30F", "30G", "XXX", "XXX", "XXX"],
            ["31A", "31B", "XXX", "31C", "31D", "31E", "31F", "31G", "XXX", "31H", "31J"],
            ["32A", "32B", "XXX", "32C", "32D", "32E", "32F", "32G", "XXX", "32H", "32J"],
            ["33A", "33B", "XXX", "33C", "33D", "33E", "33F", "33G", "XXX", "33H", "33J"],
            ["34A", "34B", "XXX", "34C", "34D", "34E", "34F", "34G", "XXX", "34H", "34J"],
            ["35A", "35B", "XXX", "35C", "35D", "35E", "35F", "35G", "XXX", "35H", "35J"],
            ["36A", "36B", "XXX", "36C", "36D", "36E", "36F", "36G", "XXX", "36H", "36J"],
            ["37A", "37B", "XXX", "37C", "37D", "37E", "37F", "37G", "XXX", "37H", "37J"],
            ["38A", "38B", "XXX", "38C", "38D", "38E", "38F", "38G", "XXX", "38H", "38J"],
            ["39A", "39B", "XXX", "39C", "38D", "39E", "39F", "39G", "XXX", "39H", "39J"],
            ["40A", "40B", "XXX", "40C", "40D", "40E", "40F", "40G", "XXX", "40H", "40J"],
            ["41A", "41B", "XXX", "41C", "41D", "41F", "41G", "XXX", "XXX", "41H", "41J"],
            ["42A", "42B", "XXX", "42C", "42D", "42F", "42G", "XXX", "XXX", "42H", "42J"],
            ["43A", "43B", "XXX", "43C", "43D", "43F", "43G", "XXX", "XXX", "43H", "43J"],
            ["XXX", "XXX", "XXX", "44C", "44D", "44F", "44G", "XXX", "XXX", "XXX", "XXX"],
            ["XXX", "XXX", "XXX", "45C", "45D", "45F", "45G", "40G", "XXX", "XXX", "XXX"],
        ]
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
    const planesKeyExists = await existsAsync('planes');
    if(!planesKeyExists) {
        for(let i = 0; i < PLANES.length; i++) {
            const plane = PLANES[i];
            const key = `plane:${plane.id}`;
            await saddAsync('planes', key);
            for(let propertyName in plane) {
                const value = plane[propertyName];
                let valueStr;
                if(Array.isArray(value)) {
                    valueStr = JSON.stringify(value);
                } else if (typeof(value) === 'object') {
                    valueStr = JSON.stringify(value);
                } else  {
                    valueStr = value.toString();
                }
                await hsetAsync(key, propertyName, valueStr);
            }
        }
    }
    const flightsKeyExists = await existsAsync('flights');
    if(!flightsKeyExists) {
        for(let i = 0; i < FLIGHTS.length; i++) {
            const flight = FLIGHTS[i];
            const key = `flight:${flight.id}`;
            await saddAsync('flights', key);
            for(let propertyName in flight) {
                const value = flight[propertyName];
                let valueStr;
                if(Array.isArray(value)) {
                    valueStr = JSON.stringify(value);
                } else if(typeof(value) === 'object') {
                    valueStr = JSON.stringify(value);
                } else {
                    valueStr = value.toString();
                }
                await hsetAsync(key, propertyName, valueStr);
            }
            const planeExists = await existsAsync(flight.plane);
            if(planeExists) {
                const plane = await hgetallAsync(flight.plane);
                const seatingChart = JSON.parse(plane.seatingChart);
                const fistClassRows = JSON.parse(plane.firstClass);
                const businessClassRows = JSON.parse(plane.businessClass);
                const economyClassRows = JSON.parse(plane.economyClass);
                for(let i = 0; i < fistClassRows.length; i++) {
                    const row = seatingChart[fistClassRows[i]];
                    for(let j = 0; j < row.length; j++) {
                        const seat = row[j];
                        if(seat !== 'XXX') {
                            await saddAsync(`${key}:availableFirstClassSeats`, seat);
                        }
                    }
                }
                for(let i = 0; i < businessClassRows.length; i++) {
                    const row = seatingChart[businessClassRows[i]];
                    for(let j = 0; j < row.length; j++) {
                        const seat = row[j];
                        if(seat !== 'XXX') {
                            await saddAsync(`${key}:availableBusinessClassSeats`, seat);
                        }
                    }
                }
                for(let i = 0; i < economyClassRows.length; i++) {
                    const row = seatingChart[economyClassRows[i]];
                    for(let j = 0; j < row.length; j++) {
                        const seat = row[j];
                        if(seat !== 'XXX') {
                            await saddAsync(`${key}:availableEconomyClassSeats`, seat);
                        }
                    }
                }
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
            let flight = await hgetallAsync(flightKey);
            flight.firstClassRate = parseFloat(flight.firstClassRate, 10.00);
            flight.businessClassRate = parseFloat(flight.businessClassRate, 10.00);
            flight.economyClassRate = parseFloat(flight.economyClassRate, 10.00);
            if(!flight.plane) {
                flight.plane = null;
            } else  {
                const planeExists = await existsAsync(flight.plane);
                if(planeExists) {
                    let plane = await hgetallAsync(flight.plane);
                    plane.numberOfSeats = parseInt(plane.numberOfSeats, 10);
                    plane.firstClass = JSON.parse(plane.firstClass);
                    plane.businessClass = JSON.parse(plane.businessClass);
                    plane.economyClass = JSON.parse(plane.economyClass);
                    let seatingChart = JSON.parse(plane.seatingChart);
                    plane.seatingChart = seatingChart;
                    flight.plane = plane;
                } else  {
                    flight.plane = null;
                }
            }
            flights.push(flight);
        }
        res.json(flights);
    });

    app.get('/api/flights/:flightId', async (req, res) => {
        const params = req.params;
        const flightId = params.flightId;
        const key = `flight:${flightId}`;
        if(await sismemberAsync('flights', key)) {
            const flight = await hgetallAsync(key);
            flight.firstClassRate = parseFloat(flight.firstClassRate, 10.00);
            flight.businessClassRate = parseFloat(flight.businessClassRate, 10.00);
            flight.economyClassRate = parseFloat(flight.economyClassRate, 10.00);
            if(!flight.plane) {
                flight.plane = null;
            } else  {
                const planeExists = await existsAsync(flight.plane);
                if(planeExists) {
                    let plane = await hgetallAsync(flight.plane);
                    plane.numberOfSeats = parseInt(plane.numberOfSeats, 10);
                    plane.firstClass = JSON.parse(plane.firstClass);
                    plane.businessClass = JSON.parse(plane.businessClass);
                    plane.economyClass = JSON.parse(plane.economyClass);
                    let seatingChart = JSON.parse(plane.seatingChart);
                    plane.seatingChart = seatingChart;
                    flight.plane = plane;
                } else  {
                    flight.plane = null;
                }
            }
            res.json(flight);
        } else  {
            res.status(404).send('Not found');
        }
    });

    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
});