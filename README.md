This is a node.js project.

## Install dependencies
npm must be used to install dependencies because project has package-lock.json.
If you want to install yarn, before install dependencies remove package-lock.json file.

```
npm install
```

## Docker container for Mongo DB

For testing the project you can use  a MongoDB through a docker container. The project contains a docker-compose.yml file which permit create that information.

Run

´´´
docker-compose build
´´´

´´´
docker-compose up
´´´

## Environment variables

Create a .env file and include the following variables

- PORT=5000
- MONG_URI='mongodb://root:example@localhost:27017/?authSource=admin'
- ETHERSCAN_API_KEY

In the case of MONG_URI is the corresponding for the local docker container.

In the case of the ETHERSCAN_API_KEY  you have to complete the value with your own API_KEY for etherscan.