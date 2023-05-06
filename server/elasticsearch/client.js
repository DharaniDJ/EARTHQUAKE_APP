const { Client, errors } = require('@elastic/elasticsearch');
const config = require("config");
const { response } = require('express');

const elasticConfig = config.get('elastic');

//
const client = new Client({
    cloud: {
        id: elasticConfig.cloudID,
    },
    auth: {
        // basic authentication
        // username: elasticConfig.username,
        // password: elasticConfig.password,
        // API key
        apiKey: elasticConfig.apiKey,
    },
});

client.ping()
    .then(response => console.log("You are connected to Elasticsearch!"))
    .catch(error => console.log("Elasticsearch is not connected."));

 module.exports = client;