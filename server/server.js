var express = require('express');


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
