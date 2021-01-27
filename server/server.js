const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');
const { EventDB } = require('./database');

const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'gordiyrushynets',
    database: 'event_reminder',
    password: '',
})

client.connect()
const eventDb = new EventDB(client, 'event')

client.query('SELECT * FROM event;', (err, res) => {
    if (err) {
        throw err
    }
    console.log(res)
})

// add router in the Express app.
app.use("/", router);

router.post('/event-date', (request, response) => {
    const date = request.body.date;
})

router.post('/add-event', (request, response) => {
    const minutes = request.body.minutes;
    const hours = request.body.hours;
    const date = request.body.date;
    const label = request.body.label;
    const text = request.body.text;
    
    let datetime = new Date(date);
    datetime.setHours(hours);
    datetime.setMinutes(minutes);

    let resp = {};
    const eventData = eventDb.ProcessEventAdd(datetime, label, text);
    
    if(eventData.status !== undefined) {
        resp.status = eventData.status;
        if(resp.status === 'failed') {
            response.statusCode = 500;
        }
    } else {
        resp.status = 'exist';
        resp.data = eventData;
    }
    
    response.send(resp)
})

router.post('/event-data',(request,response) => {
    let minutes = request.body.minutes;
    let hours = request.body.hours;
    let date = request.body.date;
    
    // datetime.getDate()
    // datetime.getMonth() + 1
    // datetime.getFullYear()

    eventDb.ProcessEvent(date, hours, minutes);
    console.log(request.body);
});

app.listen(8000,() => {
    console.log("Started on PORT 8000");
})