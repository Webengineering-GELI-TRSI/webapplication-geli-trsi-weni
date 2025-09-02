const express = require('express')
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded()

const app = express()
const PORT = 3000

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
