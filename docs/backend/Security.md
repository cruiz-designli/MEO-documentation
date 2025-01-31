The backend implements a security model that is based on the following principles:

- **Authentication**: The backend requires that all requests are authenticated. This is done by providing a valid JWT token in the `Authorization` header of the request. The token is issued by [Auth0](https://auth0.com/), a third-party authentication service. The backend verifies the token using the public key of the Auth0 tenant. If the token is invalid, the backend returns a `401 Unauthorized` response, this behavior is implemented using NestJS's `AuthGuard` and `JwtStrategy`.

- **Authorization**: The system implements a role-based access control (RBAC) model, but the backend doesn't handle the authorization logic, since it's implemented in the frontend. The backend role in this security model y to perform the CRUD operations related to the users and the roles.

- **Cross-origin resource sharing (CORS)**: The backend implements CORS to restrict which domains can access the API. By default, the backend only allows requests from the same domain as the frontend. This prevents malicious websites from making requests to the backend.

- **Helmet**: The backend uses the `helmet` middleware to set various HTTP headers that improve security. For example, the `X-Content-Type-Options` header prevents browsers from MIME-sniffing a response away from the declared content-type.

- **Personal data protection**: The backend doesn't store any personal data of the users. The only information that is stored is the user's ID and the user's role. The user's sensitive information, such as the password, name, and email, is stored in [Auth0](https://auth0.com/), a third-party authentication service.
