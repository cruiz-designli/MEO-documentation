---
sidebar_position: 4
---

# State Management

## **Overview**

This project uses **React Context API** to manage user **permissions** across the entire application. Instead of using third-party state management libraries like Redux, we rely on Context for a **lightweight and scalable** solution.

## **Why Context API?**

- ✅ **Simple and Native:** Built into React, reducing dependencies.
- ✅ **Efficient:** State is managed at the provider level and memoized for performance.
- ✅ **Scoped and Secure:** Permissions are determined based on user roles, ensuring restricted access to certain features.

---

## **Permissions Context (`UserContext`)**

The application contains a **single** context: `UserContext`, which manages user roles and permissions. This ensures that components have **access control** based on the user’s role.

### **How it Works**

- `UserProvider` wraps the application and provides user **permissions**.
- Only the **Super Admin** permissions are determined by **Auth0 user roles**.
- Developers can access the user’s **role-based permissions** anywhere in the application using `useUserContext()`.

---

## **1️⃣ Defining the Permissions Context**

Below is the implementation of `UserContext`:

```tsx
import React, { createContext, useContext, useMemo } from "react";
import { USER_TYPES } from "../pages/users-managment/constants";
import { useAuth0, User } from "@auth0/auth0-react";

export type PermissionType =
  | "admin"
  | "active"
  | "export"
  | "financials"
  | "edit"
  | "approver";

type UserProviderProps = {
  userData: {
    roles: {
      generalPermissions: {
        admin: boolean;
        active: boolean;
        export: boolean;
        financials: boolean;
        edit: boolean;
        approver: boolean;
      };
      selectedValue: string | null;
      selectedTags: string[] | null;
      __typename: string;
    };
  };
  children: React.ReactNode;
};

const initialUserContext = {
  isAdmin: false,
  isActive: false,
  canExport: false,
  canViewFinancials: false,
  canEdit: false,
  canApprove: false,
  isCorporate: false,
  isDivision: false,
  isLocation: false,
  isSuperAdmin: false,
  selectedTags: null as string[] | null,
  currentRoles: null as UserProviderProps["userData"]["roles"] | null,
};

const UserContext = createContext(initialUserContext);

const SUPER_ADMIN = "admin";

type UserType = User & {
  userRoles: {
    name: string;
    description: string;
    id: string;
  }[];
};

export const UserProvider = ({ children, userData }: UserProviderProps) => {
  const { user } = useAuth0();

  const roles = useMemo(
    () => (user as UserType)?.userRoles?.map((role) => role.name) || [],
    [user]
  );

  const isSuperAdmin = useMemo(() => roles.includes(SUPER_ADMIN), [roles]);

  const value = useMemo(() => {
    if (!userData.roles) return initialUserContext;
    return {
      isAdmin: userData.roles.generalPermissions.admin,
      isActive: userData.roles.generalPermissions.active,
      canExport: userData.roles.generalPermissions.export,
      canViewFinancials: userData.roles.generalPermissions.financials,
      canEdit: userData.roles.generalPermissions.edit,
      canApprove: userData.roles.generalPermissions.approver,
      isCorporate:
        userData.roles.selectedValue === USER_TYPES.CORPORATE.toUpperCase(),
      isDivision:
        userData.roles.selectedValue === USER_TYPES.DIVISION.toUpperCase(),
      isLocation:
        userData.roles.selectedValue === USER_TYPES.LOCATION.toUpperCase(),
      selectedTags: userData.roles.selectedTags,
      currentRoles: userData.roles,
      isSuperAdmin,
    };
  }, [user, userData]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
```

---

## **2️⃣ Wrapping the Application with `UserProvider`**

To ensure permissions are available globally, wrap the entire application with `UserProvider` in `App.tsx`.

```tsx
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider userData={userDataFromBackend}>
      <YourApp />
    </UserProvider>
  );
}

export default App;
```

---

## **3️⃣ Accessing User Permissions in a Component**

Any component that requires permission-based logic can consume `UserContext` using `useUserContext()`.

```tsx
import { useUserContext } from "../context/PermissionsContext";

const Dashboard = () => {
  const { isAdmin, canEdit, canViewFinancials } = useUserContext();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>

      {isAdmin && <button>Manage Users</button>}

      {canEdit && <button>Edit Reports</button>}

      {canViewFinancials ? (
        <p>Financial Reports are visible.</p>
      ) : (
        <p>You do not have access to financial reports.</p>
      )}
    </div>
  );
};
```

---

## **Permissions Context in the Project Structure**

The `UserContext` is organized under the `context/` directory:

```
src/
├── context/
│   ├── PermissionsContext.tsx   # Manages user permissions across the entire app
```

---

## **Key Features of `UserContext`**

✅ **Centralized Role Management** – All user permissions are handled in a single context.  
✅ **Efficient Memoization** – Uses `useMemo()` to optimize performance.  
✅ **Seamless Auth0 Integration** – Extracts **Super Admin** role directly from Auth0 user data.  
✅ **Scoped Access Control** – Components can conditionally render UI based on user roles.

---

## **Conclusion**

With `UserContext`, permissions are **centrally managed**, **easily accessible**, and **optimized for performance**. This approach keeps the codebase **clean**, **scalable**, and **secure**, ensuring that users only see what they are authorized to access.

🚀 **This is the only context used in the application**, making it simple to maintain!
