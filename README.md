# Artefact Project - Backend

## Table of Contents

1. [Introduction](#introduction)
2. [Overview](#overview)
3. [Project Objectives](#project-objectives)
4. [Backend](#backend)
    1. [File Structure and Software Architecture](#file-structure-and-software-architecture)
    2. [Technologies Used](#technologies-used)
    3. [Explanation of Code Parts](#explanation-of-code-parts)
    4. [How to Run Locally](#how-to-run-locally)
    5. [How to Test in Postman](#how-to-test-in-postman)
5. [Frontend](#frontend)
6. [Cloning the Monorepo and Running Locally](#cloning-the-monorepo-and-running-locally)

---

## Introduction

The **Artefact** project is a task management application where users can create, list, and delete tasks. This repository contains the backend of the project, which serves as the API responsible for interacting with the database and providing the necessary routes to make the system functional.

---

## Overview

The goal of **Artefact Backend** is to provide an efficient RESTful API for managing tasks, implementing proper error handling, and ensuring that the system is scalable and easy to maintain. The architecture has been planned using **Clean Code**, **SOLID principles**, and good **design patterns**.

---

## Project Objectives

1. Create an API to manage tasks.
2. Ensure data integrity and security using a relational database.
3. Create high-performance endpoints with low maintenance costs.
4. Implement best development practices such as **Clean Code** and **SOLID principles**.
5. Provide documented endpoints that can be easily tested and integrated with the frontend.

---

## Backend

### File Structure and Software Architecture

The architecture adopted in the backend follows a **modularized** and **layered** structure. Below is a detailed explanation of the file structure:

src/
├── controllers/     # Handles business logic and HTTP request handling
├── middlewares/    # Middleware functions (e.g., authentication, validation)
├── models/         # Database schema definitions (ORM)
├── routes/         # Files defining the routes
├── services/        # Service layer for data processing
├── utils/          # Utility functions and helpers
├── validation/     # Data validation using Zod
└── index.ts        # Entry point of the application

**Why this structure?**

*   **Modularity:** Separating responsibilities into distinct folders makes maintenance and scalability easier.
*   **Clarity:** The division between controllers, services, and routes helps in understanding the code flow and finding errors or functionalities quickly.
*   **Layered Architecture:** The application follows a layered architecture where each layer has clear responsibilities, which improves code organization and flexibility.

The file structure is also designed to allow easy expansion. For example, adding new features will be simple and will not complicate the existing codebase.

---

### Technologies Used

*   **Node.js:** Used as the runtime platform to execute the application. Node.js was chosen due to its efficiency and scalability.
*   **Express.js:** A minimal framework for creating RESTful APIs. Express was selected for its simplicity and flexibility in routing.
*   **Zod:** A data validation library. Zod was used to ensure the consistency and validation of data on the backend before being persisted in the database.
*   **Prisma ORM:** Used to facilitate interactions with the database. Prisma simplifies SQL query execution and database schema modeling.
*   **TypeScript:** TypeScript was chosen for type safety, autocomplete support, and long-term maintainability.

The choice of these technologies is driven by the desire for **performance**, **productivity**, and **scalability**.

---

### Explanation of Code Parts

#### 1. Controllers

*   The controller handles the business logic for processing HTTP requests. Each route has a corresponding controller function, such as `createTask`, `listTasks`, etc. The code within the controller calls the service layer and returns the results to the client.

#### 2. Services

*   Services are responsible for business logic. When a controller needs to perform complex operations (e.g., data manipulation or database interactions), it delegates that responsibility to the services.

#### 3. Validation

*   Validation is done using the Zod library, which ensures that incoming request data is correct before the backend processes it. If any required data is missing or invalid, Zod will generate a clear error message.

#### 4. Routes

*   Routes define the API endpoints. Here, all HTTP methods (GET, POST, DELETE) and their corresponding URLs are mapped to controller functions.

#### 5. Middlewares

*   Middlewares are used for intermediate functions, such as authentication or error handling, ensuring that requests are processed correctly before they reach the controllers.

---

### How to Run Locally

1.  Clone the repository:

    ```bash
    git clone [https://github.com/your-username/artefact-backend.git](https://github.com/your-username/artefact-backend.git)
    cd artefact-backend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Configure the environment variables (create a `.env` file with the necessary variables):

    ```
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4.  Start the server:

    ```bash
    npm run dev
    ```

The API will be running at `http://localhost:3000`.

---

### How to Test in Postman

To test the backend in Postman, follow these steps:

1.  Open Postman and create a new Collection.
2.  To import the Postman routes, click **Import**, choose the export file (provided in another file or folder), and import it.
3.  Configure the environment in Postman:
    *   Add the base URL of the API as a variable in the environment (e.g., `{{baseUrl}}`).
    *   Add the authentication token as a variable (`{{authToken}}`).
4.  Test the endpoints using the imported routes.

**Token Automation:**

The URL and authentication token variables have already been set up to simplify the testing process.

---

## Frontend

(Section to be filled in with frontend details)

---

## Cloning the Monorepo and Running Locally

1.  Clone the repository:

    ```bash
    git clone [https://github.com/your-username/artefact-monorepo.git](https://github.com/your-username/artefact-monorepo.git)
    ```

2.  Access the frontend and backend directories:

    ```bash
    cd artefact-monorepo
    ```

3.  Run the servers for both frontend and backend:

    **Backend:**

    ```bash
    cd backend
    npm run dev
    ```

    **Frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

Now, the frontend will be running at `http://localhost:3000`, and the backend will be available at `http://localhost:4000`.

Feel free to contribute improvements or adjust it according to your needs!
