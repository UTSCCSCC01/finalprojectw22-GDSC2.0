## Changes

Since we changed the file architecture, we have had isolated environment for our server.

The connection is established by the ```client:links``` in [docker-compose.yml](./docker-compose.yml).

To see the source code, [here](https://github.com/docker/awesome-compose/tree/master/react-express-mongodb)
## Prerequisites
* Ensure [Node.js](https://nodejs.org/en/) is installed locally

* Download [Docker Desktop](https://docs.docker.com/get-docker/) (recommended), or download Docker Engine.

## Run Whole App
Run the following in root directory
```sh
docker-compose build
```
To start the application
```sh
docker-compose up -d
```
To stop and remove container
```sh
docker-compose down
```


## Run Back-end Only
Make sure you are in ```/backend```
```sh
docker build -t server
```
```sh
docker run -p 5000:5000 server
```
<strong>Notice</strong>: ```Contrl+C``` won't be able to kill the program. If you want to stop it, please see [Trouble Shooting](#trouble-shooting)

## Run Back-end Only
Make sure you are in ```/frontend```
```sh
docker build -t react-app
```
```sh
docker run -p 3000:3000 react-app
```
<strong>Notice</strong>: ```Contrl+C``` won't be able to kill the program. If you want to stop it, please see [Trouble Shooting](#trouble-shooting)

## After Build

Images will appear in your docker.

To view all images you have
```sh
docker image ls
```
## Trouble Shooting

All of the below can be done in Docker Desktop.

### Kill a running container

Get running container ID
```sh
docker ps
```
Kill by ID
```sh
docker kill {Container ID}
```

### Remove Image

Get list of IMAGES
```sh
docker image ls
```
Remove unused IMAGES by ID
```sh
docker image rm [-f] {Image ID}
```