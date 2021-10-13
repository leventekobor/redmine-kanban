require('dotenv').config()
const express = require('express')
const request = require('request')
const cors = require('cors')

const port = process.env.PORT || 3000
var app = express()
app.use(cors())

console.log(process.env.BASE_URL)

app.use('/api', function(req, res) {
    req.pipe(request(process.env.BASE_URL + req.url)).pipe(res);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
