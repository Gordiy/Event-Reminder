const express = require('express');
const { Client } = require('pg');


const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'gordiyrushynets',
    database: 'event_reminder',
    password: '',
})

client.connect()

client.query('SELECT * FROM event;', (err, res) => {
    if (err) {
        throw err
    }
    console.log(res)
    client.end()
})


const app = express();
const server = require("http").Server(app);

const rooms = new Map();

const sendEventRequest = (event) => {
    console.log("hello")
}

app.get('/home', (req, resp)=>{
    if(req.method === 'POST') {
        console.log(req);
        resp.send('POST:hello')
    } else {
        console.log("GET", req);
        resp.statusCode = 204;
        resp.set("Access-Control-Allow-Origin", "*");
        resp.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        resp.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        resp.send('GET:hello')
    }
})

app.post('/home', (req, resp)=>{
    if(req.method === 'POST') {
        console.log(req);
        resp.statusCode = 204;
        resp.setHeader('Access-Control-Allow-Origin', '*');
        resp.send('POST:hello')
    } else {
        console.log("GET", req);
        resp.statusCode = 204;
        resp.setHeader('Access-Control-Allow-Origin', '*');
        // resp.set("Access-Control-Allow-Origin", "*");
        // resp.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        // resp.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        resp.send('GET:hello')
    }
})

server.listen(8000, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("Server started.")
})
