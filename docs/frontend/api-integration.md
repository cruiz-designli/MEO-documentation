---
sidebar_position: 6
---

# API Integration

## Overview

This project uses **Apollo Client** to manage API requests to the backend **GraphQL** server. Apollo provides caching, error handling, and a declarative approach to data fetching.

## Installation

Ensure Apollo Client is installed in your project:

```sh
npm install @apollo/client graphql
```

---

## Setting Up Apollo Client

To configure Apollo Client, create an **`apolloClient.ts`** file in your `services/` directory.

```tsx
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_SERVER_URL, // Backend GraphQL API URL
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
```

### Wrapping the Application with ApolloProvider

Ensure the Apollo Client is available throughout your app by wrapping the application inside **`ApolloProvider`** in `App.tsx`.

```tsx
import { ApolloProvider } from "@apollo/client";
import client from "./services/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <YourApp />
    </ApolloProvider>
  );
}

export default App;
```

---

## Fetching Data with Apollo Client

### **1️⃣ Basic Query (Fetching Data)**

GraphQL queries are defined using `gql` and used with `useQuery`.

```tsx
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const UsersList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};
```

---

### **2️⃣ Mutations (Modifying Data)**

To send data to the backend, use `useMutation`.

```tsx
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const CreateUserForm = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: { name: "John Doe", email: "john@example.com" } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        Create User
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>User Created: {data.createUser.name}</p>}
    </form>
  );
};
```

---

### **3️⃣ Handling API Errors**

Apollo Client provides built-in error handling.

```tsx
const { data, error } = useQuery(GET_USERS, {
  onError: (err) => {
    console.error("Error fetching users:", err.message);
  },
});
```

For mutations, you can handle errors using `onError` inside `useMutation`.

```tsx
const [createUser] = useMutation(CREATE_USER, {
  onError: (err) => {
    console.error("Error creating user:", err.message);
  },
});
```

---

## Apollo Cache Management

Apollo **automatically caches** GraphQL queries to improve performance. When updating or adding new data, you may need to **update the cache manually**.

### **Updating Cache After Mutation**

When creating a new user, update the cache to include the new user **without refetching the entire list**.

```tsx
const [createUser] = useMutation(CREATE_USER, {
  update(cache, { data: { createUser } }) {
    cache.modify({
      fields: {
        users(existingUsers = []) {
          return [...existingUsers, createUser];
        },
      },
    });
  },
});
```

### **Clearing Cache & Refetching Data**

You can also **force a refetch** after a mutation.

```tsx
const [createUser] = useMutation(CREATE_USER, {
  refetchQueries: [{ query: GET_USERS }],
});
```

---

## **Querying Data with Variables**

You can pass dynamic variables when making queries.

```tsx
const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const UserDetails = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <p>
      {data.user.name} - {data.user.email}
    </p>
  );
};
```

---

## **Conclusion**

Apollo Client provides a powerful way to integrate GraphQL APIs with caching and automatic state updates.

✅ **Key Features of Apollo Client in Our Project:**

- **Queries (`useQuery`)** → Fetch data
- **Mutations (`useMutation`)** → Modify data
- **Error Handling (`onError`)** → Handle API failures
- **Cache Management** → Optimize API performance

---
