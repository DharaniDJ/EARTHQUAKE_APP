# EARTHQUAKE_APP

Full stack Earthquake Watch app(Node.js & React) that enables users to search for earthquake data stored in Elasticsearch!

## Two Ways to Learn
We all have preferred method of learning so choose the format that works for you:

**1. [Video format](https://ela.st/mini-beginners-crash-course) (YouTube playlist)**

<img width="817" alt="image" src="https://user-images.githubusercontent.com/60980933/188253792-bccb5137-a7e3-462f-88b8-e7314b3660dd.png">

**2. [Blog format](https://dev.to/lisahjung/beginners-guide-to-building-a-full-stack-app-nodejs-react-with-elasticsearch-5347) (Dev.to)**

## App Architecture
The following diagram illustrates our app architecture:

<img width="817" alt="image" src="https://res.cloudinary.com/practicaldev/image/fetch/s--SQYLaATU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dscw3y5uz8ab8kdcwmk0.png">

## Running the App locally
If you wish to download the project, follow these instructions.

### Downloading the repo
Go to the main branch and Click on the `Code` button(blue box) to display the drop down menu.

<img width="1327" alt="image" src="https://user-images.githubusercontent.com/60980933/184769135-25c906df-3382-44bf-be0c-68222b79b79a.png">

Click on the `Download Zip` option(red box).

Once the code is downloaded, double click on the file to unzip it. 

Move the unzipped file to your desired location.

Cd into the project directory.

### Start the server

Execute these commands in the terminal in the following order. 
```javascript
//in the project directory
npm install
npm start
```

### Start the client

Execute these commands *in a new terminal* in the following order. 
```javascript
//in the project directory
cd client
npm install
npm start
```
:sparkles:**The recommended browser for this project is Google Chrome.**:sparkles:

### Don't forget!
This project requires creating an Elastic Cloud deployment and adding the Elastic Cloud access credentials to the `config/default.json` file.

The steps on how to accomplish these tasks are outlined in the following blogs:
- [Part 3: Create an Elastic Cloud deployment](https://dev.to/lisahjung/part-3-create-an-elastic-cloud-deployment-36bn)
- [Part 4: Securely connect Node.js server to Elastic Cloud](https://dev.to/lisahjung/part-4-securely-connect-nodejs-server-to-elastic-cloud-4f22)

:sparkles:**When running the project, be sure to update the `config/default.json` file with your access credentials before running the project!**:sparkles: