require('dotenv').config()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const request = require('request')
const routes = require('express').Router();
const logger = require("../logger")

routes.get('/api/redmine_url', function(req, res) {
    logger.info("Serving base URL")
    res.send(process.env.BASE_URL)
})

routes.post('/api/login', jsonParser, function(req, res) {
    const baseUrlDomain = process.env.BASE_URL.split('://')[1]

    request(`https://${req.body.username}:${req.body.password}@${baseUrlDomain}users/current.json`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            logger.info("User successfully logged in")
            res.send(response.body)
        }
    })
})

routes.use('/api', function(req, res) {
    let startTime = new Date()
    logger.info("Incoming " + req.method + " request")
    logger.debug("request URL: " + req.url)
    req.pipe(request(process.env.BASE_URL + req.url)).pipe(res);
    let endTime = new Date()
    logger.info("Response %s. Completed in: %dms", res.statusCode, (endTime - startTime))
})

module.exports = routes;
