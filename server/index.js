require('dotenv').config()
const express = require('express')
const request = require('request')
const cors = require('cors')
const logger = require("./logger")

const port = process.env.PORT || 3000
var app = express()
app.use(cors())

logger.info(process.env.BASE_URL)

app.get('/api/redmine_url', function(req, res) {
    res.send(process.env.BASE_URL)
    logger.info("base url is served")
})

app.use('/api', function(req, res) {
    let startTime = new Date()
    logger.info("Incoming " + req.method + " request")
    logger.debug("request URL: " + req.url)
    req.pipe(request(process.env.BASE_URL + req.url)).pipe(res);
    let endTime = new Date()
    logger.info("Response %s. Completed in: %dms", res.statusCode, (endTime - startTime))
})

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`)
})
