// entry point to the server
// handles entry start-up, routing and other functionalities

const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors'); // allow server and client of different origins to exchange different information

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors()); // enable all cors request

app.get('/results', (req, res) => {
  const passedType = req.query.type;
  const passedMag = req.query.mag;
  const passedLocation = req.query.location;
  const passedDateRange = req.query.dateRange;
  const passedSortOption = req.query.sortOption;

  // send a search request to ES and
  // retrieve earthquake documents that match the user selected criteria
  async function sendESRequest() {
    const body = await client.search({
      index: 'earthquakes',
      body: {
        // ordered by the value of the mag field
        sort: [
          {
            mag: {
              order: passedSortOption,
            },
          },
        ],
        size: 300, // retrieve upto 300 matching documents
        // documents should match all 4 of the user's criteria to be
        // considered as a search result.  
        query: {
          bool: {
            filter: [
              {
                term: { type: passedType },
              },
              {
                range: {
                  mag: {
                    gte: passedMag,
                  },
                },
              },
              {
                match: { place: passedLocation },
              },
              // for those who use prettier, make sure there is no whitespace.
              {
                range: {
                  '@timestamp': {
                    gte: `now-${passedDateRange}d/d`,
                    lt: 'now/d',
                  },
                },
              },
            ],
          },
        },
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.group(`Server started on ${PORT}`));