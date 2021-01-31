class EventDB {
    constructor(client, table='event') {
        this._client = client;
        this._events = new Map();
        this._table = table;
    }

    _checkEventByDate(date) {
        date = new Date(date).toLocaleDateString();
        let all_events = undefined
        let eventFounded = false;

        this._client.query(`SELECT * FROM all_event;`, (err, res) => {
            if (err) {
                throw err
            }
            all_events = res;
            eventFounded = true;
        })
        while(!eventFounded) {require('deasync').sleep(100);}

        let result = [];
        result = all_events.rows.filter(data => {
            const dateString = data.detetime.toLocaleDateString();
            return dateString.includes(date);
        });

        let eventData = undefined;
        if(result.length > 0) {
            eventData = result[0];
        }

        return eventData;
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

    _updateEvent(datetime, shortDescription, description) {
        let eventFounded = false;
        datetime = datetime.toLocaleString().replace(',', '');
        const queryText = `UPDATE ${this._table}
        SET short_desc = '${shortDescription}',
        description = '${description}'
        WHERE detetime = '${datetime}';`;

        let status = {status: 'updated'};
        
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
        const eventData = this._checkEventByDate(date);
        let data = undefined;

        if(eventData !== undefined) {
            data = {
                hours: eventData.detetime.getHours(),
                minutes: eventData.detetime.getMinutes(),
                label: eventData.short_desc,
                description: eventData.description
            };
        }
        return data;
    }

    ProcessEventDatetime(datetime) {
        const eventData = this._checkEventByDateTime(datetime);
        let data = undefined;
        if(eventData !== undefined) {
            if(eventData.rows[0] !== undefined) {
                data = {
                    label: eventData.rows[0].short_desc,
                    description: eventData.rows[0].description,
                }
            }
        }
        return data;
    }

    ProcessEventAdd(datetime, shortDescription, description) {
        let event = this._checkEventByDateTime(datetime);
        let data = {};
        if(event.rowCount == 0) {
            event = this._addEvent(datetime, shortDescription, description);
            data = event;
        } else {
            event = this._updateEvent(datetime, shortDescription, description);
        }

        if(event.status === undefined) {
            data = event.rows[0];
        }
        return data;
    }

}


exports.EventDB = EventDB;
