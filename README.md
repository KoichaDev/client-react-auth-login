# "React Register Form with Validation, Auth, Axios, and Accessibility"

**Description:**

This repository shares the code applied during the [Node Server](https://github.com/KoichaDev/node-server-auth-jwt-user-role-demo). 


## How to Test your access and refresh token is working
---
1. When logging in, you get access token
2. When you go to the router `/admin`, it will start and fetch data from a mock users from the back-end of MongoDB server
3. When you get a network call that is `xhr.js:210  GET http://localhost:3500/employees 403 (Forbidden)`, that means React will use axios and try to intercept the response from the error, and try to send a new refresh token to the Node.js back-end server end point `auth/refresh` to validate to check if you still have authorization from the client side
4. If you are still authorized, you are still on the page `/admin` page
5. If  you are not authorized, it will redirect you back to the `/login` page

## Modifying to the the expiration time on the back-end
---

There is a file [tokenExpiration.js](https://github.com/KoichaDev/node-server-auth-jwt-user-role-demo). from the repo of the Node.js server. Here, you can try to modify the expiration date for the access token and refresh tokens.

- The access token is set as expiration time 1 day
- The refresh token is set as expiration time for 30 seconds

The refresh token is where we get the network call that we will `get 403 (forbidden)` after 30 seconds from the `/employees` router path