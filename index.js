const path = require('path');
const express = require('express');
const session = require('express-session');
const pgp = require('pg-promise')();

const PORT = 3000;

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'webapp',
    user: 'webapp',
    password: 'webapp',
});

const app = express();

app.use(session({
    secret: '9bXQM0LXf+t4yq64hdtEHmEEHx91FIxC4L7z3JnDE6IZhcZSL8TIBMNrPBz822htQTBCXP2Gks+exKGxGKO33g==',
}));

app.get('/api/v1/routes', (req, res, next) => {
    db.one({
        name: 'routes-index',
        text: 'SELECT * FROM routes WHERE session = $1 ORDER BY count DESC',
        values: [
            req.session.id
        ]
    })
        .then(routes => {
            res.send(routes);
        })
        .catch(error => {
            next(error);
        });
});

app.get('/', (req, res) => {
    if (req.query.from && req.query.to) {
        db.one({
            name: 'routes-create',
            text: 'INSERT INTO queries(session, from, fromCord, to, toCord) VALUES($1, $2, $3, $4, $5)',
            values: [
                req.session.id,
                req.query.from,
                req.query.fromCord,
                req.query.to,
                req.query.toCord,
            ]
        })
            .catch(error => {
                console.error(`Error from insert ${error}`)
            });
    }

    const options = {
        root: path.join(__dirname)
    };

    console.log(`from: ${req.query.from} to: ${req.query.to}`);
    res.sendFile('public/index.html', options);
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
