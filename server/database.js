class EventDB {
    constructor(client, table='event') {
        this._client = client;
        this._events = new Map();
        this._table = table;
    }

    _checkEventByDate(date) {
        let event = undefined;

        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        this._client.query(`SELECT * FROM event WHERE detetime='${date}';`, (err, res) => {
            if (err) {
                throw err
            }
            console.log(res)
        })
    }

    _checkEventByDateTime(datetime) {
        let eventFounded = false;
        let data = undefined;
        datetime = datetime.toLocaleString().replace(',', '');
        this._client.query(`SELECT * FROM event WHERE detetime='${datetime}';`, (err, res) => {
            if (err) {
                throw err
            }
            eventFounded = true;
            data = res;
        })

        while(!eventFounded) {require('deasync').sleep(100);}
        return data;
    }

    _addEvent(datetime, shortDescription, description) {
        let eventFounded = false;
        datetime = datetime.toLocaleString().replace(',', '');
        const queryText = `INSERT INTO ${this._table}(short_desc, description, detetime) values('${shortDescription}', '${description}', '${datetime}');`;
        let status = {status: 'added'};
        
        this._client.query(queryText,
            (err, res) => {
                if (err) {
                    status.status = 'failed';
                }
                eventFounded = true;
            }
        )
        while(!eventFounded) {require('deasync').sleep(100);} // wait for query success.
        return status;
    }

    ProcessEventDate(date) {
        date = new Date(date);
    }

    ProcessEventAdd(datetime, shortDescription, description) {
        let event = this._checkEventByDateTime(datetime);
        let data = undefined;
        if(event.rowCount == 0) {
            event = this._addEvent(datetime, shortDescription, description);
            data = event;
        }

        if(event.status === undefined) {
            data = event.rows[0];
        }
        return data;
    }

}


exports.EventDB = EventDB;
