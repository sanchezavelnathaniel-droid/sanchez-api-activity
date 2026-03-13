# API-AVEL

This repository contains a simple Express/MongoDB REST API example with user authentication and role-based access control (RBAC).

Author: **Avel Nathaniel Sanchez**

---

## Setup

1. Create a `.env` file at the project root with the following:

```
PORT=3000
BASE_URI=/api/v1
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_long_secret_here
```

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm run dev   # development with nodemon
npm start     # production
```

---

## Endpoints

- `POST /api/v1/auth/register` – Register a new user  
- `POST /api/v1/auth/login` – Login and receive JWT token  
- `GET /api/v1/dishes` – Public endpoint  
- `POST /api/v1/dishes` – Protected (Admin or Manager only)

---

## Testing with Postman

1. Register a user with an `admin` role.  
2. Login and copy the token from the response.  
3. For protected routes, add an `Authorization: Bearer <token>` header.

---

# RESTful API Activity Answers

## Best Practices Implementation

### 1. Environment Variables

**Why did we put `BASE_URI` in `.env` instead of hardcoding it?**

Using `.env` for `BASE_URI` makes the application configurable and secure. It allows different environments like development, testing, and production to use different API endpoints without changing the code. It also helps prevent sensitive configuration details from being exposed in the source code.

---

### 2. Resource Modeling

**Why did we use plural nouns (e.g., `/dishes`) for our routes?**

Plural nouns are used in RESTful APIs to represent collections of resources. For example, `/dishes` refers to the collection of all dishes, while `/dishes/1` refers to a specific dish with ID 1. This makes the API easier to understand and follows common REST conventions.

---

### 3. Status Codes

**When do we use `201 Created` vs `200 OK`?**

`201 Created` is used when a new resource has been successfully created, usually after a POST request.  
`200 OK` is used when the request is successful but does not create a new resource, such as when retrieving data with GET or updating data with PUT.

**Why is it important to return `404` instead of an empty array or generic error?**

Returning `404 Not Found` clearly tells the client that the requested resource does not exist. If an empty array is returned, it might look like the resource exists but simply has no data. Using the correct status code helps client applications properly understand and handle errors.

---

### 4. Data Modeling

**Why did I choose to Embed the Review/Tag/Log?**

I chose embedding because reviews are usually small pieces of data and are frequently accessed together with the dish. Embedding them inside the `Dish` document keeps related data together and makes reading data faster since it avoids extra database queries.

**Why did I choose to Reference the Chef/User/Guest?**

I used referencing because chefs can be associated with many dishes. By referencing the `Chef` using an ObjectId, it avoids duplicating chef information in multiple documents. This keeps the database organized and allows updates to the chef data in one place.

---

## README Questions

### Authentication vs Authorization

Authentication verifies who the user is, such as logging in using an email and password.  
Authorization determines what actions the authenticated user is allowed to perform, such as allowing only admins to create dishes.

---

### Security (bcrypt)

`bcryptjs` is used to hash passwords before storing them in MongoDB. This ensures that passwords are not saved as plain text and helps protect user credentials even if the database is compromised.

---

### JWT Structure

The `protect` middleware checks for a JWT token in the request header. If the token is valid, it verifies the token and attaches the user information to the request. If the token is missing or invalid, access to the protected route is denied.