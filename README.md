<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Cinema Backend API - NestJS Application

This document provides a comprehensive overview of the Cinema Backend API, a Node.js RESTful API built using NestJS and Prisma ORM. The API manages various aspects of a cinema platform, including users, movies, genres, actors, reviews, and potentially payments and file uploads (though these modules are not fully detailed in the provided code).

## 1. Introduction

This Cinema Backend API serves as the core data layer for a cinema application. It provides a robust and scalable solution for managing various entities related to movies, users, and administrative functionalities. The API is designed with modularity and maintainability in mind.

## 2. Features

- **User Management**: User registration, login, profile management (including favorite movies), and admin-level user management.
- **Movie Management**: CRUD operations for movies, including associations with genres and actors. (Implementation details needed)
- **Genre Management**: CRUD operations for movie genres, including search functionality.
- **Actor Management**: CRUD operations for actors, including search functionality.
- **Review Management**: User review creation, admin review management.
- **Authentication**: JWT-based authentication with role-based access control (admin vs. regular users).
- **Search Functionality**: Search across genres and actors.

## 3. Architecture

The application follows a layered architecture:

- **Controllers**: Handle incoming requests and delegate to services.
- **Services**: Contain business logic and interact with the database via Prisma.
- **Data Access Layer (Prisma)**: ORM for database interactions (PostgreSQL assumed).
- **DTOs (Data Transfer Objects)**: Used for data validation and structuring.
- **Guards**: Implement authentication and authorization (Auth guard).
- **Decorators**: Simplify access to data (CurrentUser decorator).

## 4. Modules

The application is structured into modules:

- **AuthModule**: JWT authentication.
- **UserModule**: User management.
- **GenreModule**: Genre management.
- **ActorModule**: Actor management.
- **ReviewModule**: Review management.
- **MovieModule**: Movie management (implementation not fully shown).
- **PaymentModule**: Payment processing (implementation not fully shown).
- **FileModule**: File uploads (implementation not fully shown).

## 5. API Endpoints (Examples)

This section provides example endpoints. More complete documentation would include detailed request/response structures, request parameters, and error handling.

### User Endpoints:
- `/users/profile`: Get current user profile (requires authentication).
- `/users/profile/favorites`: Toggle a movie as a favorite (requires authentication).
- `/users/all`: Get all users (requires admin access).
- `/users/get/:id`: Get a user by ID (requires admin access).
- `/users/update/:id`: Update a user (requires admin access).
- `/users/delete/:id`: Delete a user (requires admin access).

### Genre Endpoints:
- `/genres/all`: Get all genres (optional search term).
- `/genres/get/by-slug/:slug`: Get a genre by slug.
- `/genres/get/by-id/:id`: Get a genre by ID (requires admin access).
- `/genres/create`: Create a genre (requires admin access).
- `/genres/update/:id`: Update a genre (requires admin access).
- `/genres/delete/:id`: Delete a genre (requires admin access).

### Actor Endpoints:
(Similar structure to Genre Endpoints)

### Review Endpoints:
- `/reviews/create/:movieId`: Create a review (requires authentication).
- `/reviews/get/all`: Get all reviews (requires admin access).
- `/reviews/delete/:id`: Delete a review (requires admin access).

### Movie Endpoints:
(Implementation not shown, but should include CRUD operations)

### Payment Endpoints:
(Implementation not shown)

### File Endpoints:
(Implementation not shown)

## 6. Technology Stack

- **Backend**: NestJS
- **Database**: PostgreSQL (via Prisma)
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Class-validator

## 7. Setup and Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with database connection string, JWT secret, etc.
4. Run `npx prisma db push` to migrate the database.
5. Run `npm run start:dev` or `npm run start` to start the application.

## 8. Testing

Testing is crucial. The project should have unit tests and integration tests.

## 9. Deployment

Deployment details are not provided but could involve Docker and a cloud provider (AWS, Google Cloud, Azure).

## 10. Further Development

- Complete the Movie, Payment, and File modules.
- Implement comprehensive testing.
- Improve error handling.
- Add input sanitization and security measures.
- Create detailed API documentation (e.g., using Swagger).
