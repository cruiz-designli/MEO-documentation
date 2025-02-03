---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pipelines

This document describes the different pipelines that are used in the backend repository. The pipelines are used to automate the deployment process of the application. This pipelines are intended to be used in the [Github Actions](https://docs.github.com/es/actions) environment.

## Frontend Deployment

The frontend is being automatically deployed by [Amplify](https://aws.amazon.com/es/amplify/) when a commit is pushed to the respective branch, so there is no need to create a pipeline for the frontend.

## Backend Deployment 

This pipeline is used to deploy development, main and production branches. The pipeline is divided into 3 sections, the first job is to build the application, the second job is to deploy the application to the server and the last job is to create the respective pull request to the next environment.

:::note pipeline
Note that the pipeline of the deployment environment only creates pull request to the main branch. Also the production environment pipeline does not create any pull request.
:::



<Tabs>
	<TabItem value="development" label="Development" default>
```yml
name: Deploy to Develop

on:
  push:
    branches: [develop]

env:
  ENVIROMENT: dev

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
          cache: "npm"

      - name: Cache NPM dependencies
        uses: actions/cache@v4
        id: npm-cache
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.ENVIROMENT }}-node-${{ hashFiles('package-lock.json') }}

      - name: Apply all pending migrations to the database
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_DEVELOP }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to Mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile
        env:
          MAU_KEY: ${{ secrets.MAU_DEVELOP_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_DEVELOP_SECRET  }}

  create-staging-pr:
    needs: deploy
    name: Create staging PR
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_BRANCH: main
      HEAD_BRANCH: ${{ github.head_ref || github.ref_name }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if existing ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR exists
        id: check-pr
        run: |
          PR_ID=$(gh pr list --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --json id --jq .[].id)
          echo $PR_ID
          echo "PR_ID=${PR_ID}" >> $GITHUB_OUTPUT

      - if: ${{ steps.check-pr.outputs.PR_ID == null || steps.check-pr.outputs.PR_ID == '' }}
        name: Create ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR
        run: gh pr create --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --title "Create ${{ env.BASE_BRANCH }} PR" --body "${DEPLOY_ENV}"
```
	</TabItem>
	<TabItem value="staging" label="Staging">
```yml
name: Deploy to production

on:
  push:
    branches: [main]

env:
  ENVIROMENT: main

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
          DATABASE_URL: ${{ secrets.DATABASE_URL_STAGING }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile

        env:
          MAU_KEY: ${{ secrets.MAU_STAGING_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_STAGING_SECRET  }}

  create-greenbrier-prod-pr:
    needs: deploy
    name: Create Greenbrier production PR
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_BRANCH: production/greenbrier
      HEAD_BRANCH: ${{ github.head_ref || github.ref_name }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if existing ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR exists
        id: check-pr
        run: |
          PR_ID=$(gh pr list --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --json id --jq .[].id)
          echo $PR_ID
          echo "PR_ID=${PR_ID}" >> $GITHUB_OUTPUT

      - if: ${{ steps.check-pr.outputs.PR_ID == null || steps.check-pr.outputs.PR_ID == '' }}
        name: Create ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR
        run: gh pr create --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --title "Create ${{ env.BASE_BRANCH }} PR" --body "${DEPLOY_ENV}"

  create-envista-prod-pr:
    needs: deploy
    name: Create Envista production PR
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_BRANCH: production/envista
      HEAD_BRANCH: ${{ github.head_ref || github.ref_name }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if existing ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR exists
        id: check-pr
        run: |
          PR_ID=$(gh pr list --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --json id --jq .[].id)
          echo $PR_ID
          echo "PR_ID=${PR_ID}" >> $GITHUB_OUTPUT

      - if: ${{ steps.check-pr.outputs.PR_ID == null || steps.check-pr.outputs.PR_ID == '' }}
        name: Create ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR
        run: gh pr create --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --title "Create ${{ env.BASE_BRANCH }} PR" --body "${DEPLOY_ENV}"

  create-bd-prod-pr:
    needs: deploy
    name: Create Beckton dickinson production PR
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_BRANCH: production/becktondickinson
      HEAD_BRANCH: ${{ github.head_ref || github.ref_name }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if existing ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR exists
        id: check-pr
        run: |
          PR_ID=$(gh pr list --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --json id --jq .[].id)
          echo $PR_ID
          echo "PR_ID=${PR_ID}" >> $GITHUB_OUTPUT

      - if: ${{ steps.check-pr.outputs.PR_ID == null || steps.check-pr.outputs.PR_ID == '' }}
        name: Create ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR
        run: gh pr create --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --title "Create ${{ env.BASE_BRANCH }} PR" --body "${DEPLOY_ENV}"

  create-avantor-prod-pr:
    needs: deploy
    name: Create Avantor production PR
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      BASE_BRANCH: production/avantor
      HEAD_BRANCH: ${{ github.head_ref || github.ref_name }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Check if existing ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR exists
        id: check-pr
        run: |
          PR_ID=$(gh pr list --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --json id --jq .[].id)
          echo $PR_ID
          echo "PR_ID=${PR_ID}" >> $GITHUB_OUTPUT

      - if: ${{ steps.check-pr.outputs.PR_ID == null || steps.check-pr.outputs.PR_ID == '' }}
        name: Create ${{ env.HEAD_BRANCH }} -> ${{ env.BASE_BRANCH }} PR
        run: gh pr create --base ${{ env.BASE_BRANCH }} --head ${{ env.HEAD_BRANCH }} --title "Create ${{ env.BASE_BRANCH }} PR" --body "${DEPLOY_ENV}"
```
	</TabItem>
	<TabItem value="becton-dickinson" label="Becton Dickinson">
```yml
name: Deploy to Beckton Dickinson

on:
  push:
    branches: [production/becktondickinson]

env:
  ENVIROMENT: becton-dickinson

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
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRDBD }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile

        env:
          MAU_KEY: ${{ secrets.MAU_PRDBD_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_PRDBD_SECRET  }}
```
  </TabItem>
  <TabItem value="greenbrier" label="Greenbrier">
```yml
name: Deploy to Greenbrier

on:
  push:
    branches: [production/greenbrier]

env:
  ENVIROMENT: greenbrier

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
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRDGB }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile

        env:
          MAU_KEY: ${{ secrets.MAU_PRDGB_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_PRDGB_SECRET  }}
```
	</TabItem>
	<TabItem value="avantor" label="Avantor">
```yml
name: Deploy to Avantor

on:
  push:
    branches: [production/avantor]

env:
  ENVIROMENT: avantor

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
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRDAV }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile

        env:
          MAU_KEY: ${{ secrets.MAU_PRDAV_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_PRDAV_SECRET  }}
```
	</TabItem>
	<TabItem value="envista" label="Envista">
```yml
name: Deploy to Envista

on:
  push:
    branches: [production/envista]

env:
  ENVIROMENT: envista

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
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRDEN }}

      - name: Generate prisma database model
        run: npx prisma generate

      - name: Deploy to mau
        run: npx @nestjs/mau deploy --dockerfile ./mau.dockerfile

        env:
          MAU_KEY: ${{ secrets.MAU_PRDEN_KEY  }}
          MAU_SECRET: ${{ secrets.MAU_PRDEN_SECRET  }}
```
	</TabItem>
</Tabs>

## Syncing pipeline

This pipeline is used to sync the branches from desingli frontend and backedn repositories to the MEO account. This is done to keep the MEO account up to date with the latest changes from the designli repositories.

```yml
on:
  push:
    branches:
      - '*'

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source repository
        uses: actions/checkout@v4
        with:
          persist-credentials: false
          fetch-depth: 0 
      - name: Push to MEO account
        run: |
          git config --global user.email "development@designli.co"
          git config --global user.name "Designli"
          git config --global credential.helper cache
          git remote add meo https://designli-development:${{ env.GITHUB_TOKEN }}@github.com/${{ env.DESTINATION_ACCOUNT }}/${{ env.DESTINATION_REPO }}.git
          git push meo ${{ env.DESTINATION_BRANCH }} --force
        env:
          GITHUB_TOKEN: ${{ secrets.MEO_SYNC_TOKEN }}
          DESTINATION_ACCOUNT: "mxglodde89"
          DESTINATION_REPO: ${{ github.event.repository.name }}
          DESTINATION_BRANCH: ${{ github.ref.name }}
```

      
