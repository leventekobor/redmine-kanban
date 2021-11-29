require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')
const logger = require("./logger")

const port = process.env.PORT || 3000
const app = express()
const jsonParser = bodyParser.json()
app.use(cors())

logger.info(process.env.BASE_URL)

app.post('/api/login', jsonParser, function(req, res) {
    const baseUrlDomain = process.env.BASE_URL.split('://')[1]

    request(`https://${req.body.username}:${req.body.password}@${baseUrlDomain}users/current.json`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            info.logger("User successfully logged in")
            res.send(response.body)
        }
    })
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
