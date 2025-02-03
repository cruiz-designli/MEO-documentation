---
sidebar_position: 5
---

# Routing

## Overview

This project uses **React Router** for handling client-side navigation. React Router enables **declarative routing**, allowing us to define routes and navigate between pages dynamically.

## Installation

If React Router is not installed, you can add it using:

```sh
npm install react-router-dom
```

---

## Setting Up Routes

Routes are defined inside the `AppRoutes.tsx` file for better modularity.

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

## Navigating Between Pages

Use the Link or `useNavigate` hook to navigate between pages.

### **Using `<Link>`**

```tsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};
```

### **Using `useNavigate` Hook**

```tsx
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
    </div>
  );
};
```

---

## Authentication & Authorization

Authentication and authorization are critical aspects of any web application. In this project, we use **Auth0** for authentication and `useUserContext` for managing role-based permissions.

### Authentication

For authentication, we use **Auth0** as our identity provider. The `useAuth0` hook provides an easy way to manage authentication states such as whether the user is authenticated or not.

The **ProtectedRoute** component ensures that only authenticated users can access certain routes.

```tsx
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
```

### Role-Based Authorization

We also have role-based authorization implemented through the `RoleBasedRoute` component. This ensures that users with the correct permissions (or superadmin status) can access certain routes.

```tsx
import { useUserContext } from "../context/PermissionsContext";

interface RoleBasedRouteProps {
  permissions: boolean[];
  children: ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  permissions,
  children,
}) => {
  const { isSuperAdmin } = useUserContext();

  const isPermissionGranted = permissions.every(Boolean) || isSuperAdmin;

  return isPermissionGranted ? children : <Navigate to="/access-denied" />;
};
```

In your routing setup, you can combine both `ProtectedRoute` and `RoleBasedRoute` to manage both authentication and role-based access.

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route element={<RoleBasedRoute permissions={[true, false]} />}>
      <Route path="/admin" element={<AdminPage />} />
    </Route>
  </Route>
</Routes>
```

---

## 404 Page (Handling Undefined Routes)

If a user navigates to a route that doesn’t exist, they should see a **404 Not Found** page.

```tsx
import { Button } from "antd";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import notFoundAnimation from "../components/assets/lottie/not-found-animation.json";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8">
      <div className="w-80 h-80">
        <Lottie options={defaultOptions} />
      </div>
      <h2 className="text-4xl font-bold text-gray-800">Oops! Page not found</h2>
      <p className="text-lg text-gray-600">
        It seems you've hit a dead end. The page you're looking for doesn't
        exist or has moved.
      </p>
      <Link to="/">
        <Button type="primary" size="large" className="mt-6">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
```

Ensure this is included in your route setup:

```tsx
[
  {
    path: "*",
    element: <NotFound />,
  },
];
```

---

## Access Denied Page

If a user navigates to a route that they don’t have permissions to see, they should see an **Access Denied** page.

```tsx
import { Result } from "antd";
import { Button } from "../components";
import { useAuth0 } from "@auth0/auth0-react";

const AccessDenied = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="logout"
          className="text-sm"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          Logout
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6">
        <Result
          status="403"
          title={
            <h2 className="text-blue-500 font-semibold tracking-wider">
              Access Denied
            </h2>
          }
          subTitle={
            <div className="text-gray-600 space-y-4">
              <p>You do not have permission to view this page.</p>
              <p className="text-secondary-300">
                If you believe this is an error, please contact{" "}
                <span className="text-blue-600 font-semibold bg-gray-100 px-2 py-1 rounded">
                  support@meocontinuity.com
                </span>
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AccessDenied;
```

Ensure this is included in your route setup:

```tsx
[
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
];
```

---

## Redirecting Users

You can redirect users dynamically using `Navigate`:

```tsx
import { Navigate } from "react-router-dom";

const RedirectToHome = () => {
  return <Navigate to="/" replace />;
};
```

Or conditionally redirect inside a component:

```tsx
if (!user) {
  return <Navigate to="/login" replace />;
}
```

---

## Conclusion

React Router provides a powerful way to handle routing in React applications.  
This documentation covers:
✅ **Basic Route Setup**  
✅ **Navigation with Link and useNavigate**  
✅ **Protected Routes**  
✅ **404 Handling & Redirects**  
✅ **Authentication & Authorization (with Role-Based Routing)**

---
