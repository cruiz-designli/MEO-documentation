---
sidebar_position: 1
---

# New environment setup

To generate a new environment for a MEO client we need to follow a series of steps that will ensure that the new client is properly setup and ready for production.

:::tip Variables
replace `[CLIENT_NAME]` and `[CLIENT_ACRONYM]` with the corresponding name, for example, for Avantor it would be `avantor` and `AV` respectively
:::

## 1. Create a new git branch

The new branch name should follow this nomenclature:

> production/[CLIENT_NAME]

As an example here is Avantor branch:

> production/avantor

This new branch should be based on main
### 1.1 Create CI/CD pipeline

For this normally use the following as template, this should be located in the GitHub actions folder `.github/workflows`


``` yml
name: Deploy to [CLIENT_NAME]

on:
  push:
    branches: [production/[CLIENT_NAME]]

env:
  ENVIROMENT: [CLIENT_NAME]

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Cache NPM dependencies
        uses: actions/cache@v4
        id: npm-cache
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.ENVIROMENT }}-node-${{ hashFiles('package-lock.json') }}

      - name: Install npm Dependencies
        if: steps.npm-cache.outputs.cache-hit != 'true'
        run: npm ci

  deploy:
    needs: build
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Cache NPM dependencies
        uses: actions/cache@v4
        id: npm-cache
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.ENVIROMENT }}-node-${{ hashFiles('package-lock.json') }}

      - name: Apply all pending migrations to the database
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRD[CLIENT_ACRONYM] }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./Dockerfile --wait-for-service-stability

        env:
          MAU_KEY: ${{ secrets.MAU_PRD[CLIENT_ACRONYM]_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_PRD[CLIENT_ACRONYM]_SECRET  }}
```

:::tip
Check the [Pipelines documentation](/docs/backend/DevOps/Pipelines) for more information
:::

### 1.2 Create the GitHub repository secrets

The following secrets should be set in the GitHub repository:

``` secrets
DATABASE_URL_PRD[CLIENT_ACRONYM]=
MAU_PRD[CLIENT_ACRONYM]_KEY=
MAU_PRD[CLIENT_ACRONYM]_SECRET=
```
## 2. Create a new environment in Auth0

To ensure that the new client has its own environment in Auth0 we need to create a new organization and use the same configuration as the other clients. 
## 3. Create AWS infrastructure

Every deployment requires a new `ECS` service with its corresponding task definition, for this we use [Mau](https://www.mau.nestjs.com/) which is a tool developed by the `NestJS` team to deploy services to AWS. This makes deploying the new service to AWS a breeze.

For the databases we use a `RDS` server with each client having its own database.
### 3.1 Setup the environment variables

The following environment variables and secrets should be set in the Mau app:

``` variables
AUDIENCE=
ISSUER_BASE_URL=
CLIENT_ORIGIN_URL=
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
SQS_URL=
EMAIL_FROM=
AWS_S3_BUCKET_NAME=
USE_SQS=
```

``` secrets
DATABASE_URL=
AUTH0_CLIENT_SECRET=
AWS_ACCESS_KEY_ID_AUX=
AWS_SECRET_ACCESS_KEY_AUX=
AWS_SES_ACCESS_KEY_ID=
AWS_SES_SECRET_ACCESS_KEY=
AWS_REGION_AUX=
AWS_REGION=
```
### 3.2 Create a new database

	For this step the DATABASE_URL environment variable should be set in the .env file


Since we are using `Prisma` for our ORM, we need to create a new database for the client with its corresponding migrations and seed data. The current pipeline will take care of running the migrations.

To generate the seed data we can use the following command:

``` bash
npx prisma db seed -- -- true --name "name" --logo "logo"
```

The logo is a base64 string of the image that will be used for the client. Here is an example of the Avantor logo first characters

``` logo
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

### 3.3 Setup the app domain

The domain should be set in the Mau app as well as the corresponding CNAMEs and NS records in Route53. The `[CLIENT_ACRONYM]` should be the 3 letter acronym for the client. For example, for Avantor it would be `avt`

``` domain
me.api.[CLIENT_ACRONYM].meocontinuity.com
```


## 4 Setup frontend environment

Currently we are deploying frontends on an Amplify instance hosted on  `us-east-1` region. To setup a new environment we only need to add the backend subdomain in the `REACT_APP_BACKEND_URL` variable and the Auth0 organization id on the `REACT_APP_AUTH0_ORGANIZATIONS` variable.