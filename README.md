# Invoicing Demo App

This is a demo application for an invoicing app, showcasing my technical knowledge developing full-stack Node.js applications using Typescript, React.js, Nest.js, Docker, Postgres, Prisma, and Docker Compose.

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
- and run the following commands in the shown order
```shell
npx prisma migrate dev
npx ts-node prisma/demo.seeder.ts
```

## Login credentials

- username: admin@example.com
- password: admin123


## *The application can be now accessed at http://localhost:8762*
