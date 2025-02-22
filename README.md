# Task Management Application - Technical Challenge for Artefact

## Table of Contents

1. [Introduction](#introduction)
2. [Backend](#backend)
    1. [Software Architecture](#backend-architecture)
    2. [Data Modeling](#backend-data-modeling)
    3. [API Endpoints & Business Logic](#backend-api-endpoints)
    4. [Validation and Error Handling](#backend-validation)
    5. [Technology Stack & Rationale](#backend-technology)
    6. [Workflow](#backend-workflow)
3. [Frontend](#frontend)
    1. [Software Architecture](#frontend-architecture)
    2. [Component Structure](#frontend-components)
    3. [State Management](#frontend-state)
    4. [User Interface & Experience](#frontend-ui)
    5. [Technology Stack & Rationale](#frontend-technology)
4. [Project Structure & File Organization](#project-structure)
5. [Running the Application](#running-app)
6. [Testing backend with Postman](#testing-backend-with-postman)
7. [Future Enhancements](#future-enhancements)
8. [Conclusion](#conclusion)

---

## Introduction

This project was developed as a technical challenge for a Fullstack Developer position at Artefact. It represents a comprehensive task management system designed to exhibit deep expertise in both backend and frontend development. The application adheres to modern best practices, scalable design, and robust error handling while demonstrating a strong commitment to clean code, modular architecture, and maintainability. 

**Key Features:**

- **Complete CRUD Functionality:** Offers the ability to create, list, update, and delete tasks, all supported by rigorous validation and domain-specific business logic.
- **Type-Safe Communications:** Implements seamless integration between the frontend and backend using tRPC, ensuring type safety throughout the entire stack.
- **Robust Error Handling:** Incorporates comprehensive error management that anticipates failure modes and provides clear, actionable feedback.
- **Scalability and Extensibility:** Designed with a layered architecture to facilitate the effortless integration of future features, such as authentication, persistent storage, and microservices.

---

## Backend

### Software Architecture <a name="backend-architecture"></a>

The backend is organized following a layered, Clean Architecture paradigm that ensures a strict separation of concerns, thus enhancing maintainability, scalability, and testability. The architecture is partitioned into the following layers:

 ```bash
📦 backend  
 ┣ 📂 dist                       # Compiled output (JavaScript) from TypeScript 
 ┃ ┣ 📂 application              # Business logic use cases (e.g., TarefaUseCases.js)  
 ┃ ┣ 📂 config                   # Configuration files & environment settings (e.g., env.js)  
 ┃ ┣ 📂 domain                   # Core domain entities and business rules (e.g., Tarefa.js)  
 ┃ ┣ 📂 infrastructure           # External integrations (e.g., database adapters, API clients)  
 ┃ ┣ 📂 presentation             # API endpoints and controllers (e.g., TarefaRouter.js)  
 ┃ ┣ 📂 utils                    # Utility functions and centralized error handlers (e.g., errorHandler.js)  
 ┃ ┗ 📜 server.js                # Entry point for the backend server
 ┣ 📂 postman                    # Contains pre-configured Postman Collection and Environment for easy API testing.  
 ┣ 📂 src                        # Original TypeScript source code  
 ┃ ┣ 📂 application              # Business logic use cases (e.g., TarefaUseCases.ts)  
 ┃ ┣ 📂 config                   # Environment configuration & settings (e.g., env.ts)  
 ┃ ┣ 📂 domain                   # Domain entities with invariants (e.g., Tarefa.ts)  
 ┃ ┣ 📂 presentation             # API controllers & routers (e.g., TarefaRouter.ts)  
 ┃ ┣ 📂 utils                    # Helper functions and error messages (e.g., errorMessages.ts)  
 ┃ ┗ 📜 server.ts                # Main server initialization and middleware setup  
 ┣ 📜 package.json               # NPM configuration with backend-specific dependencies & scripts  
 ┣ 📜 tsconfig.json              # TypeScript configuration for strict type-checking  
 ```

- **Application Layer:**  
  Contains _use cases_ (e.g., `TarefaUseCases.ts`) that orchestrate business logic. This layer strictly adheres to SOLID principles, ensuring that the core functionality remains independent of infrastructure concerns.

- **Domain Layer:**  
  Defines core business entities (e.g., `Tarefa.ts`) with immutable properties and encapsulated invariants. This isolation guarantees that the business rules remain robust even as the system evolves.

- **Infrastructure Layer:**  
  Though not fully utilized at the current stage, this layer is architected to eventually manage external integrations (e.g., databases, third-party APIs, caching mechanisms), thereby allowing seamless future scalability.

- **Presentation Layer:**  
  Exposes HTTP endpoints via Express and tRPC, serving as the interface between the client and the backend. It translates client requests into commands that invoke use cases, thereby abstracting the underlying business logic.

- **Utilities:**  
  Contains helper functions, custom error classes, and logging mechanisms that promote the DRY principle and standardize error handling across the application.

This stratification not only reinforces the robustness of the system but also facilitates unit testing and modular development.

### Data Modeling <a name="backend-data-modeling"></a>

The core entity within the backend is the **Task** (Tarefa), designed with the following attributes:

- **id:** A Universally Unique Identifier (UUID) that guarantees unique identification across distributed systems.
- **title:** A mandatory string that succinctly represents the task.
- **description:** An optional string for extended task details.
- **createdAt:** A timestamp denoting when the task was created, useful for auditing and sorting.

The domain model is intentionally designed to be immutable, enforcing invariants that prevent state corruption. This approach lays the groundwork for future extensions such as priority levels, status indicators, and due dates, while ensuring consistency within business processes.

### API Endpoints & Business Logic <a name="backend-api-endpoints"></a>

The backend API leverages tRPC to provide a type-safe communication channel between the client and server. The principal endpoints include:

- **`createTask`:**  
  - **Function:** Initiates the creation of a new task.
  - **Validation:** Uses Zod schemas to enforce input integrity.
  - **Business Logic:** Integrates domain-specific rules to ensure the task conforms to defined invariants prior to persistence.

- **`listTasks`:**  
  - **Function:** Retrieves a comprehensive list of tasks.
  - **Optimization:** Architected to support future enhancements such as pagination, filtering, and sorting.

- **`updateTask`:**  
  - **Function:** Updates an existing task.
  - **Validation:** Ensures that the target task exists and that incoming modifications satisfy all business rules.

- **`deleteTask`:**  
  - **Function:** Removes a task.
  - **Verification:** Confirms task existence and validates that deletion criteria are met.

Centralizing business logic in dedicated use cases isolates domain rules from presentation concerns, simplifying maintenance and facilitating thorough unit testing.

### Validation and Error Handling <a name="backend-validation"></a>

Robust validation and error management are essential for ensuring system integrity:

- **Input Validation:**  
  The Zod library is employed to perform runtime type-checking and schema validation, ensuring that only data compliant with predefined contracts is processed.
  
- **Custom Error Classes:**  
  Tailored error classes distinguish between client-side and server-side errors, streamlining debugging and error resolution.

- **Centralized Error Middleware:**  
  A dedicated middleware intercepts all exceptions, logs errors with detailed contextual information, and returns standardized error responses to the client. This mechanism is designed for extensibility, allowing integration with external monitoring and alerting systems.

### Technology Stack & Rationale <a name="backend-technology"></a>

The backend leverages a carefully selected suite of technologies designed for performance, reliability, and maintainability:

- **Node.js (v18+):**  
  Provides a non-blocking, event-driven runtime ideal for high-concurrency environments. Its asynchronous I/O model is critical for managing the demands of a task management system.

- **Express.js (v4+):**  
  A minimalist framework that streamlines the development of RESTful APIs. Its middleware-centric design simplifies request processing and error handling.

- **tRPC (v10+):**  
  Ensures end-to-end type safety by synchronizing types between the backend and frontend. This eliminates discrepancies in API contracts and minimizes runtime errors.

- **Zod (v3+):**  
  Serves as a robust, TypeScript-first schema validation library. Zod not only guarantees data integrity but also serves as inline documentation for data contracts.

- **TypeScript (v5+):**  
  Introduces static type checking, which catches errors at compile time. The use of TypeScript improves code maintainability, reduces runtime errors, and facilitates a self-documenting codebase.

### Workflow <a name="backend-workflow"></a>

1. **Request Handling:**  
   Incoming HTTP requests are processed by the Presentation Layer.

2. **Business Logic Execution:**  
   Requests are translated into commands that invoke use cases within the Application Layer.

3. **Domain Processing:**  
   The Application Layer interacts with Domain Entities to enforce business invariants and process data.

4. **Response Formation:**  
   The processed data is formatted and returned to the client as a response.

5. **Error Management:**  
   Any exceptions trigger the centralized error middleware, ensuring consistent and informative error responses.

---

## Frontend

### Software Architecture <a name="frontend-architecture"></a>

The frontend is developed using Next.js, a framework renowned for its hybrid rendering capabilities that combine server-side rendering (SSR) and static site generation (SSG) for optimal performance and SEO. The architecture is designed to be modular, scalable, and maintainable.

 ```bash
📦 frontend  
 ┣ 📂 src                        # Main source code directory 
 ┃ ┣ 📂 assets                   # Static assets (images, icons, etc.) 
 ┃ ┣ 📂 components               # Reusable UI components (e.g., Button, Input, Modal, TaskList, TaskForm)  
 ┃ ┣ 📂 hooks                    # Custom React hooks (e.g., useTarefas.ts)  
 ┃ ┣ 📂 models                   # Domain models representing frontend data (e.g., Tarefa.ts)  
 ┃ ┣ 📂 pages                    # Next.js pages (e.g., _app.tsx, _document.tsx, tasks-list/index.tsx)  
 ┃ ┣ 📂 services                 # API service calls & business logic wrappers (e.g., tarefaService.ts)  
 ┃ ┣ 📂 styles                   # Global styles, themes, and style configurations (e.g., globalStyles.ts, theme.ts)  
 ┃ ┣ 📂 utils                    # Utility functions (e.g., dateUtils.ts, validators.ts)  
 ┃ ┗ 📜 next-env.d.ts            # TypeScript definitions for Next.js environment  
 ┣ 📂 .next                      # Auto-generated build artifacts and cache (Next.js output)  
 ┣ 📜 next.config.js             # Next.js configuration file for advanced customization  
 ┣ 📜 package.json               # NPM configuration with frontend-specific dependencies & scripts  
 ┣ 📜 tsConfig.json              # TypeScript configuration ensuring strict type-safety  
```

- **Page-Based Routing:**  
  Next.js leverages file-based routing to dynamically generate pages, ensuring that both SSR and SSG can be seamlessly integrated.

- **Component-Driven Design:**  
  The design follows principles of atomic design, where UI elements are decomposed into reusable and testable components. This promotes consistency and simplifies both development and maintenance.

- **Context & Hooks:**  
  The application uses React’s Context API alongside custom hooks to manage global and local state, thus reducing prop drilling and ensuring a more maintainable state management strategy.

### Component Structure <a name="frontend-components"></a>

The frontend is composed of modular components that promote reusability and adhere to design consistency:

- **`TaskList`:**  
  Displays a list of tasks in an organized manner. It is engineered to support future enhancements such as sorting, filtering, and real-time updates.

- **`TaskForm`:**  
  A form component used for both creating and updating tasks. It integrates inline validation (using libraries or custom validators) and dynamic feedback to enhance user interaction.

- **`Header` and `Layout`:**  
  These components provide a consistent navigational structure and visual framework across the application. They ensure that branding and styling remain uniform throughout.

- **Atomic Components:**  
  Smaller, reusable components such as `Button.tsx`, `Input.tsx`, and `Modal.tsx` follow the Atomic Design methodology. This approach facilitates high cohesion and low coupling, allowing components to be easily maintained and extended.

### State Management <a name="frontend-state"></a>

State management is implemented using a combination of React Context and hooks, with the flexibility to integrate advanced state management libraries (e.g., Zustand) in subsequent iterations. This strategy provides:

- **Centralized State Store:**  
  A global state that minimizes prop drilling, promotes data consistency, and streamlines state updates across the application.
  
- **Optimistic UI Updates:**  
  Future plans include implementing real-time data synchronization and optimistic rendering to enhance responsiveness and user experience.

### User Interface & Experience <a name="frontend-ui"></a>

The user interface is designed to be intuitive, responsive, and accessible:

- **Minimalistic and Intuitive Layout:**  
The design prioritizes clarity and ease of navigation, enabling users to manage tasks effortlessly. By adopting atomic design principles, every UI element—from buttons to complex modals—is constructed as a reusable component. This modular approach not only streamlines development but also enhances consistency, ensuring that users encounter a predictable and coherent interface throughout the application.
  
- **Responsive Design:**  
Optimized for an array of devices—ranging from desktops to tablets and mobile phones—the interface utilizes responsive design techniques integrated with styled-components. This ensures that the layout dynamically adjusts to varying screen sizes and resolutions, providing a seamless and consistent experience regardless of the device.
  
- **Dynamic Theming and Visual Consistency:**  
A sophisticated dual-theme system is implemented using styled-components, enabling runtime switching between Light Mode and Dark Mode. This dynamic theming is achieved through JavaScript-driven style encapsulation and CSS custom properties, ensuring high contrast ratios and adherence to accessibility standards. The visual consistency across themes reinforces usability, while the minimalistic aesthetic minimizes cognitive load, allowing users to focus on their tasks.
  
- **Modal Dialogs and Interaction Design:**
 Critical user interactions, such as editing and deleting tasks, are managed via meticulously designed modal dialogs. These modals are not only responsive but are also tightly integrated with the application’s state management system to ensure context-aware interactions. Inline validation is a key feature—error messages are conspicuously displayed in a contrasting red immediately beneath the relevant input fields. This immediate feedback facilitates prompt error correction, thereby enhancing overall usability.
 
-  **Accessibility and Feedback Mechanisms:**
Accessibility is a cornerstone of the UI design. The interface incorporates ARIA roles, keyboard navigability, and high-contrast themes to meet stringent accessibility standards. Immediate visual feedback, including real-time form validations and notifications (e.g., via React Toastify), is provided to inform users about the outcomes of their actions, thereby reducing errors and streamlining the interaction flow.

-  **Advanced Micro-interactions and Animation:**
To further enrich the user experience, subtle animations and micro-interactions are integrated throughout the interface. These enhancements—such as smooth transitions, hover effects, and responsive feedback cues—add an additional layer of intuitiveness and engagement without detracting from the functional clarity of the design.

-  **Visual Artifacts**

    The following visual artifacts illustrate key aspects of the UI design and interaction paradigms:

    Task Listing Screen (Light Mode):

   ![image](https://github.com/user-attachments/assets/f353bfeb-d435-4ced-a6e7-8658a56a503a)
   
    Figure 1: Task Listing Screen in Light Mode
    
    Task Listing Screen (Dark Mode):

    ![image](https://github.com/user-attachments/assets/9bac42fe-57fa-4315-a5ed-cd01b5d9eef9)
   
    Figure 2: Task Listing Screen in Dark Mode
    
    Edit Task Modal:

    ![image](https://github.com/user-attachments/assets/5908ed4a-828d-46f1-8382-67caac86f810)
   
    Figure 3: Edit Task Modal
    
    Edit Task Modal with Inline Error Messages:

   ![image](https://github.com/user-attachments/assets/193305c5-c100-4fcd-893a-a45e41fa91c0)
   
    Figure 4: Edit Task Modal Displaying Inline Error Messages
    
    Delete Task Modal:

   ![image](https://github.com/user-attachments/assets/27d40177-0ad0-407c-8c53-078cd4570e43)
   
    Figure 5: Delete Task Modal

In conclusion, the integration of minimalistic design, responsive layouts, dynamic theming, and robust accessibility features culminates in an exceptional user experience. This comprehensive approach not only meets but exceeds modern UX/UI standards, ensuring that the Task Management Application remains both aesthetically appealing and functionally robust.

### Technology Stack & Rationale <a name="frontend-technology"></a>

The frontend leverages modern frameworks and libraries to create a robust, high-performance user interface:

- **Next.js (v15+):**  
  Combines SSR and SSG to deliver fast, SEO-optimized pages. The framework’s robust routing and file-system based configuration simplify development while offering extensive customization options.

- **React (v18+):**  
  Provides a component-based architecture that enhances modularity and reusability. Its declarative programming model simplifies the development of interactive UIs.

- **TypeScript (v5+):**  
  Ensures type safety across the codebase, reducing runtime errors and improving maintainability. TypeScript’s static analysis capabilities contribute to a more robust and self-documenting codebase.

- **Advanced State Management:**  
  While React Context and hooks provide sufficient state management for the initial version, the architecture is designed to incorporate libraries such as Zustand for more complex state scenarios in the future.

- **UI Libraries (e.g., Material UI, Chakra UI):**  
  Pre-designed component libraries are considered to accelerate development, ensure visual consistency, and adhere to modern design standards.

---

## Project Structure & File Organization <a name="project-structure"></a>

The project is organized as a monorepo, which enhances consistency and simplifies dependency management between the backend and frontend. Key files and directories include:

- **Root Files:**  
  - `.gitignore` and `lista_arquivos.txt` – These files outline the project’s file inclusion rules and document the file structure.
  - `package.json` and `package-lock.json` – Define project-level dependencies and lockfile configurations.

- **Backend Directory:**  
  - Contains both source (`src`) and compiled (`dist`) files, including configuration (`tsconfig.json`, `env.ts/js`), domain models (`Tarefa.ts/js`), use cases (`TarefaUseCases.ts/js`), presentation layers (routers such as `TarefaRouter.ts/js`), and utilities (error handling, logging).
  - The separation of `src` and `dist` ensures that the production code is clean and optimized while the source remains fully annotated and modular.

- **Frontend Directory:**  
  - Houses Next.js configurations (`next.config.js`, `next-env.d.ts`), source code (components, hooks, models, pages, styles), and build artifacts (`.next` directory). 
  - The component structure (e.g., `TaskList`, `TaskForm`, atomic components like `Button` and `Input`) adheres to a standardized pattern using the Portuguese language for commit messages, variable naming, and documentation. This consistency reinforces internal communication and aligns with organizational standards.

This rigorous file organization underscores the project’s commitment to maintainability, scalability, and ease of onboarding for new developers.

---

## Running the Application <a name="running-app"></a>

To set up and run the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/task-management-app.git
   cd task-management-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   
   Backend: Navigate to the backend directory and execute:
   
   ```bash
   npm run dev
   ```
   
   Frontend: In a separate terminal, navigate to the frontend directory and execute:
   ```bash
   npm run dev
   ```
   
This dual-run configuration ensures that both the backend and frontend are started simultaneously, thereby supporting rapid development cycles, continuous integration, and agile iterations.

---
## Testing backend with Postman <a name="testing-backend-with-postman"></a>

For comprehensive API testing, I have integrated Postman as an automated testing tool. Its advanced setup includes the following features:

### Postman Environment Configuration:
An environment file has been pre-configured to store the base URL (BASE_URL) along with other relevant variables such as authentication tokens or default headers. This configuration allows for seamless switching between local, staging, and production environments.

### Predefined Postman Collection:
A fully automated Postman collection has been created which encompasses all tRPC endpoints. Each request in the collection is designed to mimic real-world API calls to our backend. For example, endpoints are structured as:

 ```bash
{{baseUrl}}/trpc/[endpointName]
```

where [endpointName] corresponds to operations such as createTask, listTasks, updateTask, and deleteTask.

### Automated Process Workflows:
To streamline testing, scripts within Postman are set to automatically extract and store response data (e.g., the id of a created task) into environment variables. This facilitates subsequent requests such as updating or deleting a task by reusing the stored task ID.

### Technical Details on tRPC Integration:
The API utilizes tRPC to enforce strict type safety and runtime validation. Each tRPC endpoint is mapped to a corresponding use case in the backend, ensuring that all business logic is executed consistently. The Postman collection is designed to validate the complete flow—from data validation via Zod to the invocation of business logic—and returns standardized error responses in case of failures.

For your convenience, please find the links to the pre-configured Postman environment and collection below:

🔗 [Postman Collection](https://app.getpostman.com/join-team?invite_code=bf2218af4b1e017aef65cb2aa2bf14fc691028db216e436c06eef2a25e6e665e&target_code=72cc7c16264c4baa124b568840d153b9)

🔗 [Postman Environment](https://interstellar-shuttle-703014.postman.co/workspace/My-Workspace~f245e760-a491-4601-88ad-9b7386da9e6a/environment/42482615-015b3a3a-71fe-48f4-a8a4-6b2ac8478ccd?action=share&creator=42482615)
  
These resources are provided to facilitate rapid, consistent, and reproducible testing of all backend routes locally via Postman.

### Alternative Setup: Importing Postman Files Manually
If you are unable to access the direct links, you can manually import the Postman Collection and Environment files, which are stored in the backend repository inside the postman/ folder.

#### Importing the Postman Collection
- Open Postman.
- Click "File" > "Import" (or click the "Import" button in the top-left corner).
- Select the file: postman/Artefact.postman_collection.json
- Click "Open", and the collection will be added to your Postman workspace.

#### Importing the Postman Environment
- In Postman, go to the "Environments" tab.
- Click on "Import".
- Select the file: postman/Artefact.postman_environment.json
- Click "Open", and the environment will be added.

Make sure to activate the environment before making API requests.

Once imported, you will have access to all pre-configured routes, including variables such as API base URL and task IDs, making testing faster and more reliable.

---

## Future Enhancements <a name="future-enhancements"></a>

Future improvements planned for the project include:

- **Authentication & Authorization:**  
  Implement secure user authentication and role-based access control.

- **Persistent Storage:**  
  Integrate a robust database solution to replace current in-memory or file-based storage.

- **Real-Time Synchronization:**  
  Enhance collaboration features by incorporating WebSockets or similar technologies.

- **Enhanced Filtering & Sorting:**  
  Develop advanced query capabilities to improve task management and usability.

- **CI/CD Pipeline Integration:**  
  Establish continuous integration and deployment pipelines to automate testing, linting, and deployment processes.

- **Expanded Testing Strategies:**  
  Broaden the testing strategy to include comprehensive unit, integration, and end-to-end tests using frameworks such as Jest, Testing Library, and Cypress.

---

## Conclusion

This Task Management Application embodies advanced software engineering principles through its robust architecture, deliberate technology choices, and rigorous adherence to best practices. The backend leverages Node.js, Express, tRPC, Zod, and TypeScript to deliver a highly scalable, type-safe API, while the frontend utilizes Next.js, React, and TypeScript to create a performant, maintainable, and responsive user interface. Furthermore, the monorepo structure and consistent file organization—reinforced by standardized naming in Portuguese—facilitate seamless collaboration and maintainability.

The strategic decisions detailed herein, from the adoption of Clean Architecture to the use of atomic design for UI components, demonstrate a deep technical acumen and a forward-thinking approach that ensures the system’s adaptability and scalability. This document serves not only as a guide for current development but also as a robust foundation for future enhancements, ensuring that the application remains at the forefront of modern software engineering practices.
