# Getting started

You can use docker-compose to easily start app.

First of all, install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it on your machine. Make sure you follow all prerequisites.

Second, you should create .env file with following content (example):

```
POSTGRES_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
API_PATH=http://localhost:3030/
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Now, you can execute this commands:

```
# create custom network to connect front-end and back-end (optional)
# you can use your subnet and gateway but in front-end folder edit next.config.js images option and
# api.ts IMAGE_API_URL value to allow nextjs fetch images from API
docker network create bonsay --subnet 172.28.0.0/16 --gateway 172.28.0.1

# build containers and run application
docker-compose -f docker-compose.dev.yaml up
```
