// entry point to the server
// handles entry start-up, routing and other functionalities

const express = require("express");

const app = express();

const port = 3001;

app.listen(port, () => console.log(`Server listening to https://localhost:${port}`));