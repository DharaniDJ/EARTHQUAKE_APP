const express = require("express");
const router = express.Router();
const axios = require("axios");
const client = require("../elasticsearch/client");
require('log-timestamp');

/* this file instructs the server 3 things

1) upon receiving an http request retrieve earthquake data
from the usgs api
2) send the retrieved data to elasticsearch earthquake data
pipeline for data transformation
3) instruct the elasticsearch to ingest the transformed data
into the earthquake index
*/

const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`;

router.get('/earthquakes', async function(req, res) {
    console.log('loading application');
    res.json('Running Application...');

    /*
    retrieve earthquake data from the usgs api, create an object for each data,
    send the objects to ES data pipeline for data transformation and instruct ES to 
    ingest transformed data into the earthquake index
    */
    indexData = async () => {
        try {
            console.log('Retrieving data from the USGS API');
            
            // get request to USGS API
            const EARTHQUAKES = await axios.get(`${URL}`,{
                headers: {
                    'content-Type':['application/json','charset=utf-8'],
                },
            });

            console.log("Data retrieved!");
            
            results = EARTHQUAKES.data.features;
            
            console.log('Indexing data...');

            /*
            for each earthquake object in the array, it creates a json object
            that will be indexed later as documents
            */
            results.map(
                async (results) => (
                    (earthquakeObject = {
                        place: results.properties.place,
                        time: results.properties.time,
                        tz: results.properties.tz,
                        url: results.properties.url,
                        detail: results.properties.detail,
                        felt: results.properties.felt,
                        cdi: results.properties.cdi,
                        alert: results.properties.alert,
                        status: results.properties.status,
                        tsunami: results.properties.tsunami,
                        sig: results.properties.sig,
                        net: results.properties.net,
                        code: results.properties.code,
                        sources: results.properties.sources,
                        nst: results.properties.nst,
                        dmin: results.properties.dmin,
                        rms: results.properties.rms,
                        mag: results.properties.mag,
                        magType: results.properties.magType,
                        type: results.properties.type,
                        longitude: results.geometry.coordinates[0],
                        latitude: results.geometry.coordinates[1],
                        depth: results.geometry.coordinates[2],
                    }),

                    // send retrieved api data to ES for data transformation and data ingestions
                    await client.index({
                        index: 'earthquakes',
                        id: results.id,
                        body: earthquakeObject,
                        // this pipeline will transform the data in the manner we specified.
                        pipeline: 'earthquake_data_pipeline',
                    })
                )
            );

            // keep calling indexData fn, if there is data left that has not been indexed
            if (EARTHQUAKES.data.length) {
                indexData();
            } else {
                console.log('Data has been indexed successfully!');
            }
        } catch(err){
            console.log(err);
        }

        console.log('Preparing for the next round of indexing...');
    };
    indexData();
});

module.exports = router;
