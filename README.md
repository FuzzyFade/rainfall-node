# Rainfall Real-time Big data processor distributed application 

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
# Run kafka server in local machine
$ docker-compose up
```


#### Step- 2 (Optional)
Initial Database and Tables
```bash
$ yarn init:db

```


#### Step- 3
Run the application
```bash
$ yarn start

```

## API Document

### local machine
> example

#### Push Event
```
POST http://localhost:3000/send/consumer
Body 
{
    "devicecode": "4396123012",
    "rainfall": 1.213,
    "monitortime": "23/9/2021 18:50:00"
}

```

#### Download CSV
```
GET http://localhost:3000/download
```
