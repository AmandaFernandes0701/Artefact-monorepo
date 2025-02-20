# Task Management Application - Technical Challenge for Artefact

## Table of Contents

1.  [Introduction](#introduction)
2.  [Backend](#backend)
    1.  [Software Architecture](#backend-architecture)
    2.  [Data Modeling](#backend-data-modeling)
    3.  [API Endpoints & Business Logic](#backend-api-endpoints)
    4.  [Validation and Error Handling](#backend-validation)
    5.  [Technology Stack](#backend-technology)
    6.  [Folder Structure & Workflow](#backend-folder-structure)
3.  [Frontend](#frontend)
    1.  [Software Architecture](#frontend-architecture)
    2.  [Component Structure](#frontend-components)
    3.  [State Management](#frontend-state)
    4.  [User Interface & Experience](#frontend-ui)
    5.  [Technology Stack](#frontend-technology)
4.  [Development Workflow](#development-workflow)
    1.  [Running the Application](#running-app)
    2.  [Testing](#testing)
5.  [Future Enhancements](#future-enhancements)
6.  [Conclusion](#conclusion)

---

## Introduction

This project was developed as a technical challenge for a Fullstack Developer internship position at Artefact. It aims to showcase my abilities in both backend and frontend development, demonstrating my understanding of software architecture, best practices, and modern technologies. The application is a task management system built with Next.js (v15), focusing on effective integration between the frontend and backend.

**Key Features:**

*   Create, list, update, and delete tasks.
*   Intuitive user interface for task management.
*   Robust validation and error handling.

---

## Backend

### Software Architecture <a name="backend-architecture"></a>

The backend architecture prioritizes modularity, scalability, and maintainability, even though the project scope is intentionally simple. It follows a layered approach inspired by Clean Architecture principles:

*   **Application (Use Cases):** Contains specific business logic for each operation (e.g., `TarefaUseCases.ts` for task-related actions).
*   **Domain (Entities):** Defines core data structures and business rules (`Tarefa.ts` represents a task entity).
*   **Infrastructure:** Handles external concerns like database access, API calls, or external services (not used in this simplified version).
*   **Presentation (Routers):** Exposes API endpoints and handles request/response cycles (`TarefaRouter.ts` manages task routes).
*   **Utils:** Contains helper functions and shared logic (`errorHandler.ts`, `errorMessages.ts`).

While this project doesn't utilize a database or external services, the architecture is designed with the idea of easily extending it in the future. For example, if we needed to persist tasks in a database, we could add a `repositories` layer in the Infrastructure folder to handle data access logic.

### Data Modeling <a name="backend-data-modeling"></a>

Tasks have the following attributes:

*   `id`: Unique identifier (UUID).
*   `title`: Task title (required, string).
*   `description`: Task details (optional, string).
*   `createdAt`: Creation timestamp.

### API Endpoints & Business Logic <a name="backend-api-endpoints"></a>

The tRPC API offers:

*   `createTask`: Creates a task, validates input.
*   `listTasks`: Retrieves all tasks.
*   `updateTask`: Updates a task, ensures existence and valid input.
*   `deleteTask`: Deletes a task, verifies existence.

Business logic resides in use cases, ensuring separation of concerns.

### Validation and Error Handling <a name="backend-validation"></a>

*   **Input Validation:** Zod validates incoming data for type safety.
*   **Error Handling:** Custom error classes represent scenarios, providing messages.
*   **Centralized Handling:** Middleware captures errors, creates user-friendly responses.

### Technology Stack <a name="backend-technology"></a>

*   Node.js (v18+)
*   Express.js (v4+)
*   tRPC (v10+)
*   Zod (v3+)
*   TypeScript (v5+)

### Folder Structure & Workflow <a name="backend-folder-structure"></a>

*   **dist:** Contains the compiled JavaScript files (output of the TypeScript compiler).
*   **src:** Contains the source code of the backend application.
    *   **application:** Holds use cases, each representing a specific action a user can take.
    *   **config:** Stores environment variables and configuration settings.
    *   **domain:** Defines the entities and value objects of the domain.
    *   **infrastructure:** Handles external concerns (not used in this simplified version).
    *   **presentation:** Manages API routes and request/response handling.
    *   **utils:** Contains utility functions and shared logic.
    *   **server.ts:** Entry point of the backend application, sets up the server and connects the different parts.
    *   **errorMessages.ts:** Centralizes error messages for consistency.

The workflow is as follows:

1.  Requests come in through the **presentation** layer (routers).
2.  Routers call the appropriate **use cases** in the **application** layer.
3.  Use cases interact with **domain** entities and potentially **infrastructure** (if it existed) to perform actions.
4.  Use cases return results to routers, which format the response and send it back to the client.

---

## Frontend

### Software Architecture <a name="frontend-architecture"></a>

The frontend architecture is component-based, utilizing Next.js features:

*   **Pages:** Represent application routes, handle user interactions.
*   **Components:** Reusable UI elements, promoting modularity.
*   **Contexts:** Manage global state, provide data to components.
*   **Hooks:** Access state and side effects within components.

This architecture fosters organization, maintainability, and reusability.

### Component Structure <a name="frontend-components"></a>

Key components include:

*   `TaskList`: Displays a list of tasks.
*   `TaskForm`: Allows creating/updating tasks.
*   `Header`: Application header with navigation.
*   `Layout`: Provides consistent layout across pages.

### State Management <a name="frontend-state"></a>

State is managed using React Context and hooks, providing a centralized and efficient way to handle data flow.

### User Interface & Experience <a name="frontend-ui"></a>

The UI focuses on simplicity and usability:

*   Clear task representation.
*   Intuitive form for task creation/updates.
*   Feedback messages for actions.
*   Responsive design for various devices.

### Technology Stack <a name="frontend-technology"></a>

*   Next.js (v15+)
*   React (v18+)
*   TypeScript (v5+)
*   Zustand (or similar state management library)
*   UI Library (e.g., Material UI, Chakra UI)

---

## Development Workflow

### Running the Application <a name="running-app"></a>

1.  Clone the repository.
2.  Install dependencies (`npm install`).
3.  Start the development server (`npm run dev`).

### Testing <a name="testing"></a>

Due to the project's simplicity and focus on integration, unit tests were not implemented in this version. However, the architecture is designed to support testing at all levels (unit, integration, end-to-end) in future iterations.

---

## Future Enhancements

*   Database integration for persistent tasks.
*   User authentication and authorization.
*   Advanced features like task prioritization and due dates.
*   Improved testing coverage.

---

## Conclusion

This project demonstrates my ability to build a full-stack application with a well-defined architecture, robust validation, and modern technologies. I am confident that my skills and experience align well with the requirements of the Fullstack Developer internship at Artefact.
