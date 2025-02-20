# Task Management Application - Technical Challenge for Artefact

## Table of Contents

1. [Introduction](#introduction)
2. [Backend](#backend)
    1. [Software Architecture](#backend-architecture)
    2. [Data Modeling](#backend-data-modeling)
    3. [API Endpoints & Business Logic](#backend-api-endpoints)
    4. [Validation and Error Handling](#backend-validation)
    5. [Technology Stack](#backend-technology)
    6. [Folder Structure & Workflow](#backend-folder-structure)
3. [Frontend](#frontend)
    1. [Software Architecture](#frontend-architecture)
    2. [Component Structure](#frontend-components)
    3. [State Management](#frontend-state)
    4. [User Interface & Experience](#frontend-ui)
    5. [Technology Stack](#frontend-technology)
4. [Running the Application](#running-app)
5. [Future Enhancements](#future-enhancements)
6. [Conclusion](#conclusion)

---

## Introduction

This project was developed as a technical challenge for a Fullstack Developer position at Artefact. It is a comprehensive task management system designed to showcase deep expertise in both backend and frontend development, adhering to modern best practices, scalable design, and robust error handling. With an emphasis on clean code, modular architecture, and technical excellence, this application not only meets the immediate requirements but is also engineered to evolve with future feature enhancements.

**Key Features:**

- **Complete CRUD Functionality:** Create, list, update, and delete tasks with state-of-the-art validation.
- **Seamless Integration:** Efficient synchronization between frontend and backend leveraging tRPC for type-safe communications.
- **Robust Error Handling:** Proactive error management that anticipates failure modes and provides clear, actionable feedback.
- **Scalability and Extensibility:** Designed with a layered architecture to facilitate effortless integration of additional features such as authentication, database persistence, and microservices.

---

## Backend

### Software Architecture <a name="backend-architecture"></a>

The backend is architected with a strong emphasis on modularity, separation of concerns, and adherence to Clean Architecture principles. The design ensures that each layer can evolve independently while maintaining a consistent contract across the application. Key architectural patterns include:

- **Layered Approach:**
    - **Application (Use Cases):** Implements specific business logic (e.g., `TarefaUseCases.ts`) following SOLID principles and ensuring that business rules remain isolated from infrastructural concerns.
    - **Domain (Entities):** Defines core entities (such as `Tarefa.ts`) encapsulating business rules and invariants. This layer is agnostic of external dependencies.
    - **Infrastructure:** Although not fully utilized in the current scope, this layer is designed to manage external integrations like databases, external APIs, or messaging systems, making future enhancements seamless.
    - **Presentation (Routers):** Exposes HTTP endpoints using Express.js and tRPC, translating user requests into application commands.
    - **Utilities:** Contains shared logic (e.g., custom error classes, logging, helper functions) that promotes DRY principles across the application.

This architectural strategy not only increases code maintainability and testability but also aligns with industry-standard practices for enterprise-grade applications.

### Data Modeling <a name="backend-data-modeling"></a>

Tasks are modeled as domain entities with a focus on immutability and consistency. The data structure includes:

- **id:** A Universally Unique Identifier (UUID) that ensures each task is uniquely identifiable.
- **title:** A required string representing the task's title.
- **description:** An optional string providing further details about the task.
- **createdAt:** A timestamp marking the creation time of the task, useful for auditing and chronological sorting.

This model is designed to be easily extensible; future iterations could incorporate additional attributes such as task status, priority levels, due dates, and relational mappings for collaborative environments.

### API Endpoints & Business Logic <a name="backend-api-endpoints"></a>

The backend API, built on tRPC, provides a type-safe and efficient interface for client-server communication. The main endpoints include:

- **`createTask`:**
    - **Function:** Creates a new task.
    - **Validation:** Ensures the input meets stringent criteria using Zod schemas.
    - **Business Logic:** Applies domain rules before persisting the new task.
- **`listTasks`:**
    - **Function:** Retrieves all tasks.
    - **Optimization:** Can be extended to support pagination, filtering, and sorting for enhanced performance.
- **`updateTask`:**
    - **Function:** Modifies an existing task.
    - **Validation:** Checks for the existence of the task and validates input changes.
- **`deleteTask`:**
    - **Function:** Deletes a specified task.
    - **Verification:** Confirms the task exists and that the deletion meets business criteria.

Centralizing the business logic within use cases decouples application rules from transport mechanisms, ensuring consistency and facilitating unit testing.

### Validation and Error Handling <a name="backend-validation"></a>

Robust validation and error handling mechanisms are critical for maintaining application integrity:

- **Input Validation:**
    - Utilizes Zod to enforce runtime type-checking and data integrity. This ensures that only valid data is processed by the business logic.
- **Custom Error Classes:**
    - Implements specific error types to clearly differentiate between client-side and server-side issues, aiding in debugging and user feedback.
- **Middleware for Centralized Error Handling:**
    - A dedicated error-handling middleware intercepts exceptions, logs them appropriately, and returns standardized error responses. This mechanism is extensible and can integrate with external monitoring tools.

### Technology Stack <a name="backend-technology"></a>

- **Node.js (v18+):** Provides a robust runtime environment with support for modern JavaScript features.
- **Express.js (v4+):** A lightweight framework that simplifies routing and middleware integration.
- **tRPC (v10+):** Ensures end-to-end type safety between the client and server, reducing runtime errors.
- **Zod (v3+):** Facilitates schema-based validation with a focus on developer productivity and code clarity.
- **TypeScript (v5+):** Enhances code reliability and maintainability through static type checking.

These technologies were chosen for their proven track records in building scalable and maintainable applications, enabling rapid development without compromising on quality.

### Folder Structure & Workflow <a name="backend-folder-structure"></a>

The backend repository is organized to reflect its layered architecture:
```
📦 backend  
 ┣ 📂 dist                       # Arquivos JavaScript compilados (output do TypeScript)
 ┃ ┗ 📂 src                      # Código compilado do backend
 ┣ 📂 src                        # Código-fonte do backend
 ┃ ┣ 📂 application              # Casos de uso (ex.: TarefaUseCases.ts)
 ┃ ┣ 📂 config                   # Configurações e variáveis de ambiente
 ┃ ┣ 📂 domain                   # Modelos de domínio e entidades de negócio (ex.: Tarefa.ts) 
 ┃ ┣ 📂 infrastructure           # Integrações futuras (banco de dados, APIs externas)
 ┃ ┣ 📂 presentation             # Rotas e controladores da API (ex.: TarefaRouter.ts)
 ┃ ┣ 📂 utils                    # Funções utilitárias e tratamento de erros 
 ┃ ┣ 📜 server.ts                # Ponto de entrada; configura servidor e middlewares
 ┃ ┗ 📜 errorMessages.ts         # Mensagens de erro centralizadas para consistência
```

**Workflow Overview:**

1. **Request Handling:**  
   - Incoming HTTP requests are first processed by the **presentation** layer.
2. **Business Logic Execution:**  
   - Routers delegate operations to **use cases** in the **application** layer.
3. **Domain Processing:**  
   - Use cases interact with **domain** entities, ensuring business rules are enforced.
4. **Response Formation:**  
   - Processed results are formatted and returned to the client via the routers.
5. **Error Management:**  
   - Any exceptions trigger centralized error handling, ensuring consistent client feedback.

This structure promotes clarity, ease of navigation, and scalability, allowing for smooth incorporation of new features and modules.

---

## Frontend

### Software Architecture <a name="frontend-architecture"></a>

The frontend is built with Next.js, leveraging its powerful hybrid rendering capabilities to deliver a seamless user experience. The architecture emphasizes:

- **Page-Based Routing:**  
  - Utilizes Next.js pages for server-side rendering (SSR) and static site generation (SSG), enhancing performance and SEO.
  
- **Component-Driven Design:**  
  - Follows the principles of atomic design, ensuring that UI components are reusable, maintainable, and testable.
  
- **Context & Hooks:**  
  - Implements React Context API and custom hooks for state management and side-effect handling, ensuring efficient data flow across components.

This approach allows for a clear separation of concerns, optimized performance, and a highly responsive user interface.

### Component Structure <a name="frontend-components"></a>

Key UI components are designed for modularity and reusability:

- **`TaskList`:**  
  - Displays tasks in a clear, ordered manner.
  - Supports future enhancements such as sorting, filtering, and real-time updates.

- **`TaskForm`:**  
  - Facilitates both task creation and updates.
  - Integrates inline validation and dynamic feedback to enhance usability.

- **`Header`:**  
  - Provides a consistent navigation experience and branding across the application.

- **`Layout`:**  
  - Ensures uniform styling and structure across all pages, contributing to a cohesive user experience.

### State Management <a name="frontend-state"></a>

State is managed using a combination of React Context and hooks, with potential integration of libraries like Zustand for more complex state requirements:

- **Centralized State Store:**  
  - Enables efficient sharing of global state between components.
  - Reduces prop-drilling and simplifies state updates.
  
- **Optimistic UI Updates:**  
  - Future improvements may include real-time synchronization and optimistic rendering to enhance responsiveness.

### User Interface & Experience <a name="frontend-ui"></a>

The frontend design prioritizes clarity, accessibility, and responsiveness:

- **Minimalistic and Intuitive Layout:**  
  - Focus on clear task representation and easy navigation.
  
- **Responsive Design:**  
  - Ensures a seamless experience across desktops, tablets, and mobile devices.
  
- **Accessibility Considerations:**  
  - Implements ARIA roles, keyboard navigability, and high-contrast themes to support all users.

- **Feedback Mechanisms:**  
  - Provides immediate visual feedback for user actions, such as form validations and action confirmations.

### Technology Stack <a name="frontend-technology"></a>

- **Next.js (v15+):** Optimizes both server-side and client-side rendering for performance.
- **React (v18+):** Powers dynamic, component-based UIs with a focus on reactivity.
- **TypeScript (v5+):** Ensures robust type safety and reduces runtime errors.
- **State Management Library (e.g., Zustand):** Simplifies global state management in complex applications.
- **UI Library (e.g., Material UI, Chakra UI):** Provides a suite of pre-designed, customizable components that adhere to modern design guidelines.

This carefully chosen stack supports a high-performance, scalable, and maintainable frontend while remaining flexible for future iterations.

---

## Running the Application <a name="running-app"></a>

To set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/task-management-app.git
   cd task-management-app

## Install Dependencies:

 ```bash
npm install
```

Start the Development Server:

```bash
npm run dev
```

This process ensures a rapid development cycle with immediate feedback, supporting agile iterations and continuous improvement.

## Conclusion
This project is a testament to advanced software engineering practices, combining a well-defined architecture with modern technologies and comprehensive error handling. By leveraging robust design patterns, type safety, and scalable principles, the Task Management Application not only fulfills the immediate requirements but is also primed for future growth. I am confident that this solution reflects the technical depth and innovative mindset required for the Fullstack Developer role at Artefact.
