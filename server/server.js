// entry point to the server
// handles entry start-up, routing and other functionalities

const express = require("express");
const client = require("./elasticsearch/client");

const app = express();

const port = 3001;

const data = require("./data_management/retrieve_and_ingest_data");

app.use("/ingest_data", data);

app.listen(port, () => console.log(`Server listening to https://localhost:${port}`));