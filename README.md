# Structureflow API

# Local Development Setup

## Prerequisites

The following need to be installed:

- [Node.js Latest LTS](https://nodejs.org/en)
- NPM (Provided with Node.js)
- Postman for testing API endpoints

## Initial Setup

### Cloning the repository

The project is hosted here [Github](https://github.com/aamine113/structureflow-api).
The repository contains the source code to run the API locally.


### Setting up seed Data

A script has been created to populate the MongoDB with 3 documents representing 3 companies as demo data set.
To run the script, open a bash console in the root directory structureflow-api/ and run the following command:
`npm run seed`

You should see a console log confirming that the data have been inserted successfully.

Please wait until the following section "Running API" to run the seed data script.

## Running the API

NPM should be used to run the API

### NPM

Follow these steps:

1. open the structureflow-api folder in a terminal
2. run `npm install`. This should install all required dependencies
3. run `npm run seed` to insert the seed data to Mongo DB. If ts-node command is not recognised, run `npm i ts-node`
4. run `npm start` to start the Backend API. The application should run at localhost:3001
5. open a browser at http://localhost:3001. You should see the following message: 

    "Welcome to Structureflow API!"

6. Import the Postman collection Structureflow.postman_collection.json located at the root structureflow-api/  and test the different endpoints

## Running the unit tests

Jest is used as a unit test framework
You can run the unit tests using the following command at the root directory structureflow-api/
`npm run test`

## Limitation

This API has obviously some limitations and areas for improvement. Some of them below:
* Sensitive information to be removed from .env file
* Implement authentication
* Add a middleware to check/validate the input sent by users
* Use a logging library instead of console.error/console.log
* Create an interface contract (Swagger.io) for the API

This list is not exhaustive