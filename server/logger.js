const bunyan = require("bunyan");

// favour using env variables to provide your code with external configs
// it makes it a lot simpler when you want to change the configs
const level = process.env.NODE_LOGGING_LEVEL || "info";

const log = bunyan.createLogger({
    name: "Redmine kanban",
    streams: [
        {
            level,
            stream: process.stdout
        }
    ]
});

module.exports = log;
