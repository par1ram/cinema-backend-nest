# Cinema Backend API - NestJS Application

This document provides a comprehensive overview of the Cinema Backend API, a Node.js RESTful API built using NestJS and Prisma ORM. The API manages various aspects of a cinema platform, including users, movies, genres, actors, reviews, and potentially payments and file uploads (though implementations for these last three are not fully provided).

## 1. Introduction

This Cinema Backend API serves as the core data layer for a cinema application. It provides a robust and scalable solution for managing various entities related to movies, users, and administrative functionalities. The API is designed with modularity and maintainability in mind.

## 2. Features

- **User Management**: User registration, login, profile management (including favorite movies), and admin-level user management. Includes functionality to toggle movies as favorites.
- **Movie Management**: (Implementation details needed from `movie.service.ts` etc.) CRUD operations for movies, including associations with genres and actors.
- **Genre Management**: CRUD operations for movie genres, including search functionality based on name and description.
- **Actor Management**: CRUD operations for actors, including search functionality based on name.
- **Review Management**: User review creation (authenticated users only), admin review management (retrieving all reviews and deleting reviews). Reviews include ratings and text.
- **Authentication**: JWT-based authentication with role-based access control (admin vs. regular users). Admin users have elevated privileges for managing users, genres, actors, movies, and reviews.
- **Search Functionality**: Search across genres and actors.

## 3. Architecture

The application follows a layered architecture:

- **Controllers**: Handle incoming requests and delegate to services.
- **Services**: Contain business logic and interact with the database via Prisma.
- **Data Access Layer (Prisma)**: ORM for database interactions (PostgreSQL assumed).
- **DTOs (Data Transfer Objects)**: Used for data validation and input sanitization.
- **Guards**: Implement authentication and authorization (Auth guard, potentially others).
- **Decorators**: Simplify access to data (CurrentUser decorator for user information).
- **Helper Functions**: Utility functions like `generateSlugFromRu` for generating slugs from Russian text.

## 4. Modules

The application is structured into several modules, each responsible for a specific domain:

- **AuthModule**: JWT authentication and authorization. Handles user registration and login. Includes JWT strategy and configuration.
- **UserModule**: User management, including profile management and favorite movies.
- **GenreModule**: Genre management, including CRUD operations and search.
- **ActorModule**: Actor management, including CRUD operations and search.
- **ReviewModule**: Review management, including creation, retrieval, and deletion.
- **MovieModule**: Movie management (implementation details needed).
- **PaymentModule**: Payment processing (implementation details needed).
- **FileModule**: File uploads (implementation details needed).
- **StatisticsModule**: (Implementation details needed). Likely provides aggregated statistics.

## 5. API Endpoints (Examples)

This section provides example endpoints. More complete documentation would include detailed request/response structures, request parameters, and error handling. Error handling in the provided code often uses `NotFoundException`. More robust error handling (validation errors, database errors, etc.) is recommended.

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

## 6. Technology Stack

- **Backend**: NestJS
- **Database**: PostgreSQL (via Prisma)
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Class-validator
- **Password Hashing**: Argon2 (inferred from `user.service.ts`)

## 7. Setup and Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with database connection string, JWT secret, etc.
4. Run `npx prisma db push` to migrate the database.
5. Run `npm run start:dev` or `npm run start` to start the application.
