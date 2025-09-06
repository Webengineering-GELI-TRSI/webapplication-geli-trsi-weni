const express = require('express');

const app = express();
const PORT = 3000;

app.use('/api/v1', require('./api'))

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
