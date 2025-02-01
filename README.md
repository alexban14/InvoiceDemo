# Invoicing Demo App

This is a demo application for an invoicing app in order to showcase my technical knowledge developing full-stack Node.js applications using Typescript, React.js, Nest.js, Docker, Postgres, Prisma, and Docker Compose.

## Project Setup

### Pre-requisites
- Docker version 27.4.1 or higher
- Docker Compose version 2.32.4 or higher

### Environment setup steps

- build the project Docker images and run the containers by running:
```shell
docker compose up -d --build
```

- enter the server container by running:
```shell
docker compose exec -it server sh
```
- run the migrate command to apply the database schema
```shell
npx prisma migrate dev
```
- and run the following command to seed the database with demo data:
```shell
npx ts-node prisma/demo.seeder.ts
```

## Login credentials

- username: admin@example.com
- password: admin123


## *The application can be now accessed at http://localhost:8762*
