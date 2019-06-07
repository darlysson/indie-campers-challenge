# indie-campers-challenge
App that, given a latitude and longitude, return great highlights (or attractions) close to your location.

# Highlights REST API - Description
An API developed to output the closest highlights(or attractions) in a radius of 100km, according to user location(latitude & longitude).

## Usage
- The app assumes that these highlights or attractions are already available in the database.
- A json file with the list of highlights I've created for running local tests is provided inside the folder server (db.json).
- I'm using Postman to make get/put/delete/post requests to the api.

## Installation
Download all dependencies.
```
yarn install or npm install
```

## Running
Backend: Run the following commands inside the folder server. (Server runs on port 3000)
```
yarn dev or npm run dev
```
Frontend: Run the following commands inside the folder client. (App runs on port 8080)
```
yarn serve or npm run serve
```
