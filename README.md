# Rainfall Real time Big data processor distributed application 

> nodejs + nestjs + prisma + zookeeper + kafka + mysql

## Installation

```bash
$ yarn install
```
The step will automatic generate some types of Model with Prisma schema when post-install

## Running the app

#### Step- 1 
Make sure docker & docker-compose is installed. 

```
# Run kafka server in local machine, go to docker folder 
$ docker-compose up
```


#### Step- 2 (Optional)
Initial Database and Tables
```bash
# development
$ yarn init:db

```


#### Step- 3
 Run the application
```bash
# development
$ yarn start

```
