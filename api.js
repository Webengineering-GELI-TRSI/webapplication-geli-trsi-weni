const express = require('express');
const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'webapp',
    user: 'webapp',
    password: 'webapp',
});

const router = express.Router();

router.get('/routes', (req, res, next) => {
    db.one({
        name: 'routes-index',
        text: 'SELECT * FROM routes', // can also be a QueryFile object
        values: [1]
    })
        .then(routes => {

        })
        .catch(error => {
            next(error);
        });
});

router.post('/routes', (req, res, next) => {
    db.one({
        name: 'routes-create',
        text: 'SELECT * FROM users WHERE id = $1', // can also be a QueryFile object
        values: [1]
    })
        .then(route => {
            res.send(result);
        })
        .catch(error => {
            next(error);
        });
});

router.get('/routes/:id', (req, res, next) => {
    db.one({
        name: 'routes-view',
        text: 'SELECT * FROM users WHERE id = $1', // can also be a QueryFile object
        values: [
            req.params.id
        ]
    })
        .then(route => {
            res.send(route);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
