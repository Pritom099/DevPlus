live link: https://dev-plus-rose.vercel.app


🚀 DevPulse

Internal Tech Issue & Feature Tracker

DevPulse is a backend API for software teams to report bugs, request new
features, manage issue workflows, and coordinate resolutions.

The project is built with Node.js, TypeScript, Express.js, PostgreSQL,
native pg, JWT, and bcrypt. It follows a modular architecture with
separate controllers, services, routes, middleware, utilities, and
database configuration.

✨ Features

🔐 JWT-based authentication
👤 User registration and login
🔑 Secure password hashing with bcrypt
👥 Role-based authorization
🐛 Create bug reports
💡 Create feature requests
📋 View all issues
🔎 Filter issues by type and status
↕️ Sort issues by newest or oldest
📄 View a single issue
✏️ Update issues according to ownership and role
🗑️ Maintainer-only issue deletion
🔄 Issue workflow status
🛡️ Centralized error handling
📝 Request logging middleware
📦 Modular Express router architecture
🗄️ PostgreSQL with raw SQL queries
🚫 No ORM, query builder, or SQL JOINs
🛠️ Technology Stack


Technology          Purpose

Node.js 24+         Runtime
TypeScript          Type-safe development
Express.js          REST API framework
PostgreSQL          Relational database
pg                Native PostgreSQL driver
bcrypt              Password hashing
jsonwebtoken        JWT authentication
dotenv              Environment variables
http-status-codes   HTTP status constants

🏗️ Architecture

DevPulse uses a modular backend structure:

Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
PostgreSQL
   ↓
Service
   ↓
Controller
   ↓
Standard JSON Response

Responsibility of each layer

Routes → Define API endpoints and attach middleware.

Middleware → Authentication, authorization, logging, and global
error handling.

Controllers → Receive requests, validate request-level data,
call services, and send responses.

Services → Contain business logic and database queries.

Config → Database and application configuration.

Utils → Reusable helpers such as JWT, authentication, and
response formatting.

Types → TypeScript type declarations and Express request
extensions.

📁 Project Structure

DevPlus/
│
├── .vercel/
│
├── dist/
│   └── ...                    # Compiled JavaScript output
│
├── node_modules/
│
├── src/
│   │
│   ├── config/
│   │   └── index.ts           # Application/environment configuration
│   │
│   ├── db/
│   │   └── index.ts           # PostgreSQL connection/pool
│   │
│   ├── middleware/
│   │   ├── globalErrorHandler.ts
│   │   └── logger.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── issue/
│   │   │   ├── issue.controller.ts
│   │   │   ├── issue.routes.ts
│   │   │   └── issue.service.ts
│   │   │
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.route.ts
│   │       └── user.service.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── jwt.ts
│   │   └── sendResponse.ts
│   │
│   ├── app.ts
│   └── index.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsup.config.ts
└── vercel.json

dist/ is the compiled output and should normally be generated during
the build process rather than edited manually.

🔐 Authentication & Authorization

DevPulse uses JWT authentication.

Authentication flow

Client
  │
  │ email + password
  ▼
POST /api/auth/login
  │
  ├── Find user
  ├── Compare password using bcrypt
  └── Generate JWT
  │
  ▼
JWT returned to client
  │
  │ Authorization: <JWT_TOKEN>
  ▼
Protected API
  │
  ├── Verify JWT signature
  ├── Check token expiry
  └── Read user id / name / role
  ▼
Controller / Service

The JWT payload contains:

{
  "id": 1,
  "name": "John Doe",
  "role": "contributor"
}

Passwords are never returned in API responses and should never be
written to logs.


🗄️ Database Schema

users

Column         Description

id           Auto-incrementing unique identifier
name         Full name, required
email        Unique login email, required
password     Bcrypt-hashed password
role         contributor or maintainer
created_at   Account creation timestamp
updated_at   Last update timestamp

issues

Column          Description

id            Auto-incrementing issue ID
title         Issue title, maximum 150 characters
description   Detailed description, minimum 20 characters
type          bug or feature_request
status        open, in_progress, or resolved
reporter_id   ID of the user who created the issue
created_at    Issue creation timestamp
updated_at    Last update timestamp

Relationship

users
  │
  │ reporter_id
  ▼
issues

A foreign key is not required by the specification. The application
validates the reporter/user relationship.


⚙️ Environment Variables

Create a .env file in the project root.

Example:

PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

Use the exact variable names expected by your src/config/index.ts
and database configuration. Never commit real secrets to GitHub.

🚀 Installation & Setup

1. Clone the repository

git clone <your-repository-url>
cd DevPlus

2. Install dependencies

npm install

3. Configure environment variables

Create:

.env

and add your PostgreSQL and JWT configuration.

4. Create the PostgreSQL database

Create a PostgreSQL database and the required users and issues
tables according to the schema above.

5. Start development server

Use the development script defined in package.json, for example:

npm run dev

6. Build the project

npm run build

7. Start production build

Use the production script defined in package.json, for example:

npm start

🧪 API Testing

You can test the API using tools such as:

Postman
Thunder Client
Insomnia
REST Client
Recommended testing order

1. POST /api/auth/signup
          ↓
2. POST /api/auth/login
          ↓
3. Copy JWT token
          ↓
4. POST /api/issues
          ↓
5. GET /api/issues
          ↓
6. GET /api/issues/:id
          ↓
7. PATCH /api/issues/:id
          ↓
8. DELETE /api/issues/:id

For protected endpoints, send:

Authorization: <JWT_TOKEN>

🛡️ Security Practices

DevPulse follows several security practices:

Passwords are hashed using bcrypt.

Plain-text passwords are never stored.

Passwords are never returned in API responses.

Passwords should never appear in logs.

JWT signatures are verified before protected operations.

JWT expiry is checked.

Role-based authorization is applied to privileged actions.

reporter_id is taken from authenticated user information rather
than client input.

SQL queries use parameterized values through PostgreSQL's pg
driver.

No ORM or query builder is used.

📌 Project Rules

This project intentionally follows the assignment constraints:

✅ PostgreSQL
✅ Native pg driver
✅ Raw SQL
✅ pool.query()
✅ Express.js
✅ TypeScript
✅ JWT
✅ bcrypt
✅ Modular routers
✅ Role-based authorization

❌ No ORM
❌ No query builder
❌ No SQL JOIN


📜 License

This project was developed as an internal technical issue and feature
tracking system for the DevPulse assignment.

👨‍💻 Developer

Built with ❤️ using:

TypeScript + Express.js + PostgreSQL + JWT + bcrypt