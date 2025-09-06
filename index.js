const path = require('path');
const express = require('express');
const pgp = require('pg-promise')();

const app = express();
const PORT = 3000;

const db = pgp('postgres://webapp:webapp@host:port/webapp');

app.get('/', (request, response) => {

    if (request.query.from && request.query.to) {
        let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress

        db.one({
            name: 'add-query',
            text: 'INSERT INTO queries(ip, from, to) VALUES($1, $2, $3)',
            values: [
                ip,
                request.query.from,
                request.query.to,
            ]
        })
            .catch(error => {
                console.error(`Error from insert ${error}`)
            });

    }

    const options = {
        root: path.join(__dirname)
    };

    console.log(`from: ${request.query.from} to: ${request.query.to}`);
    response.sendFile('public/index.html', options);
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
