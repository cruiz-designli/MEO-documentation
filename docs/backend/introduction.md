---
sidebar_position: 1
---

# Getting Started

This guide will help you set up a local development environment for the project.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above
- [Docker](https://docs.docker.com/get-docker/) 
- [Git](https://git-scm.com/downloads)

## Setting up the project

1. Clone the repository

```bash
git clone https://github.com/mxglodde89/meo-backend.git
```

2. Install the dependencies

```bash
cd meo-backend
npm install
```

## Setting up the database

The project uses a MariaDb database. To set up the database, you can use docker compose to start a MariaDB container.

```yaml title="docker-compose.yml"
services:
    mariadb:
        image: mariadb
        restart: always
        environment:
            MARIADB_ROOT_PASSWORD: testdatabase
        ports:
            - 3306:3306
```

To start the database, run the following command:

```bash
docker compose up -d
```


## Setting up the environment variables

The project uses environment variables to configure the application. To set up the environment variables, create a `.env` file in the root of the project with the following content:

```env title=".env"
DATABASE_URL=mysql://root:testdatabase@localhost:3306/meo_backend?schema=public&connection_limit=1
PORT=3000
APP_ENV=development
IS_LOCAL=true
USE_SQS=false

# Auth0
ISSUER_BASE_URL=
AUDIENCE=
AUTH0_CLIENT_SECRET=
CLIENT_ORIGIN_URL=
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=

# AWS
AWS_ACCESS_KEY_ID_AUX=
AWS_SECRET_ACCESS_KEY_AUX=

AWS_SES_ACCESS_KEY_ID=
AWS_SES_SECRET_ACCESS_KEY=

AWS_S3_BUCKET_NAME=

AWS_REGION_AUX=us-east-2
AWS_REGION=us-east-2

SQS_URL=http://localhost
EMAIL_FROM=EMAIL_FROM=notifications@meocontinuity.com
```

## Running migrations

The project uses [Prisma](https://www.prisma.io/) to manage the database schema. To run the migrations, run the following command:

```bash
npx prisma migrate dev
```

:::tip
To start working with data is recommended to restore the database from a development dump.
:::

## Running the project

To start the project, run the following command:

```bash
npm run start:dev
```
