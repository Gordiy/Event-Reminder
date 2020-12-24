const express = require('express');
const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'gordiyrushynets',
    database: 'event_reminder',
    password: '',
})

client.connect()

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    client.end()
})

const app = express();
const server = require("http").Server(app);

const rooms = new Map();

app.get('/home', (req, resp)=>{
    resp.send('hello')
})

server.listen(8000, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("Server started.")
})
