const client = require('./elasticsearch/client');

async function generateApiKeys(opts) {
    const body = await client.security.createApiKey({
    body: { // ES cluster privelages that are associated with the api key
        name: 'earthquake_app', // name of the server that is going to use this api key
        role_descriptors: { // define a role (access privileges) granted to the server
        earthquakes_example_writer: { // role name
            cluster: ['monitor'],  // specify this roles comes with cluster monitor privelage
            index: [ // grants additional previelages
            {
                names: ['earthquakes'],
                privileges: ['create_index', 'write', 'read', 'manage'],
            },
            ],
        },
        },
    },
    });
    // returns an ID and an API key value which are concatinated and encoded in base64
    return Buffer.from(`${body.id}:${body.api_key}`).toString('base64');
}

// prints the API key in the terminal, if error occurs, it prints the error.
generateApiKeys()
    .then(console.log)
    .catch((err) => {
    console.error(err);
    process.exit(1);
    });