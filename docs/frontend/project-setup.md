---
sidebar_position: 2
---

# Project Setup

This guide walks you through setting up the frontend project locally.

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: `>=18.x.x`)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management
- A `.env` file with the necessary environment variables

## Installation

1. Clone the repository:

```sh
git clone https://github.com/designli/meo-frontend.git
```

2. Navigate into the project directory:

```sh
cd meo-frontend
```

3. Install dependencies:

```sh
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the root directory and configure it with the necessary API keys and environment-specific values:

```txt
REACT_APP_API_URL=https://api.example.com
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

**Note: You may need to ask the team for the correct .env values.**

## Running the Project

To start the development server, run:

```sh
npm run start
# or
yarn dev
```

The app should now be available at http://localhost:3000.

## Available Scripts

Here are some useful commands:

- **Start the dev server:**

```sh
npm run start
```

- **Build for production:**

```sh
npm run build
```

Now your frontend is set up and running! 🚀 Next, check out the Components section for details on UI development.
