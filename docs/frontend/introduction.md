---
sidebar_position: 1
---

# Introduction

Welcome to the **Frontend Documentation** for _MEO-continuity_. This guide covers the architecture, components, state management, and API integration used in our frontend application.

## Tech Stack

Our frontend is built using:

- **React** (with TypeScript)
- **Ant Design** (for UI components)
- **Apollo Client** (for GraphQL data fetching)
- **React Hook Form** (for form management)
- **clsx** (for conditional classnames)

## Project Structure

The project follows a modular structure to keep code maintainable and scalable:

```txt
src/
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── hooks/           # Custom React hooks
├── context/         # Global state management
├── services/        # API calls and integrations
├── utils/           # Helper functions
├── styles/          # Global styles
├── types/           # TypeScript types and interfaces
```

## Key Features

- **Component-based architecture** for reusability
- **State management** using React Context and Apollo Client
- **GraphQL API integration** with strong typing
- **Ant Design components** for consistent and professional-looking UI
- **Optimized performance** with lazy loading and memoization

## Getting Started

To set up the project locally, follow these steps:

```sh
git clone https://github.com/designli/meo-frontend.git
cd meo-frontend
npm install
npm run start
```
