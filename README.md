# Getting started

You can use docker-compose to easily start app.

First of all, install [docker-compose](https://docs.docker.com/compose/install/) if you don't have it on your machine. Make sure you follow all prerequisites.

Second, you should create .env file with following content (example):

```
JWT_SECRET=your_jwt_secret
API_PATH=http://localhost:3020/
API_INTERNAL_PATH=http://bonsay_api:3020/
STRIPE_SECRET_KEY=your_stripe_secret_key
POSTGRES_PASSWORD=your_postgres_password
```

Third, create `docker_postgres_password` file and fill it with your postgres database password.

```
echo -n "your_postgres_password" >> docker_postgres_password
```

Now, you can execute this commands:

```
# create folder for uploads
mkdir public/files

# create custom network to connect front-end and back-end (optional)
docker network create bonsay

# build containers and run application
docker-compose -f docker-compose.dev.yaml up
```
