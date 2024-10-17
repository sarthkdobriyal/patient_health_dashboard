
# Patient Health Dashboard

This project aims to create a comprehensive patient health dashboard that allows healthcare providers to manage patient data and handle prior authorization requests efficiently. The frontend is built using React, while the backend is powered by Node.js, Express, and MongoDB. The project is structured to ensure a seamless integration between the frontend and backend, providing a responsive and user-friendly interface for healthcare providers.

## Steps to Run the Project

### Clone the Project:
```bash
git clone <repository-url>
cd <repository-directory>
```

### Project Structure:
- **Client-side code**: Located in the `client` folder.
- **Server-side code**: Located in the `server` folder.

### Install Dependencies:
```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

### Create Environment Variables:
- **Client Environment Variables (.env)**:
    ```plaintext
    VITE_API_URL=<your-api-url>
    ```

- **Server Environment Variables (.env)**:
    ```plaintext
    PORT=<your-port>
    DATABASE_URL=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

### Run the Project:
```bash
# Run client
cd client
npm start

# Run server
cd ../server
npm run dev
```

## API Documentation

### Authorization API

#### Create Authorization Request
- **Endpoint**: `POST /api/authorization/create`
- **Middleware**: `authMiddleware`
- **Controller**: `createAuthorizationRequest`
- **Description**: Creates a new authorization request.
- **Request Body**:
    ```json
    {
        "patientId": "string",
        "requestDetails": "string"
    }
    ```

#### Get All Authorization Requests
- **Endpoint**: `GET /api/authorization/all`
- **Middleware**: `authMiddleware`
- **Controller**: `getAllAuthorizationRequests`
- **Description**: Retrieves all authorization requests.

### Patient API

#### Get All Patients
- **Endpoint**: `GET /api/patients/all`
- **Middleware**: `authMiddleware`
- **Controller**: `getAllPatients`
- **Description**: Retrieves a list of all patients.

#### Get Patient by ID
- **Endpoint**: `GET /api/patients/:id`
- **Middleware**: `authMiddleware`
- **Controller**: `getPatient`
- **Description**: Retrieves details of a specific patient by ID.

#### Create Patient
- **Endpoint**: `POST /api/patients/create`
- **Middleware**: `authMiddleware`
- **Controller**: `createPatient`
- **Description**: Creates a new patient record.
- **Request Body**:
    ```json
    {
        "name": "string",
        "age": "number",
        "address": "string",
        "medicalHistory": "string"
    }
    ```

    ### Authorization API

    #### Create Authorization Request
    - **Endpoint**: `POST /api/authorization/create`
    - **Middleware**: `authMiddleware`
    - **Controller**: `createAuthorizationRequest`
    - **Description**: Creates a new authorization request.
    - **Request Body**:
        ```json
        {
            "patientId": "string",
            "requestDetails": "string"
        }
        ```

    #### Get All Authorization Requests
    - **Endpoint**: `GET /api/authorization/all`
    - **Middleware**: `authMiddleware`
    - **Controller**: `getAllAuthorizationRequests`
    - **Description**: Retrieves all authorization requests.

## Packages and Libraries Used

### Frontend (Client)
- **React**: A JavaScript library for building user interfaces.
- **React-DOM**: Provides DOM-specific methods that can be used at the top level of a web app.
- **React-Hook-Form**: A performant, flexible, and extensible form library with easy-to-use validation.
- **React-Router-Dom**: Declarative routing for React applications.
- **React-Table**: A lightweight, fast, and extendable data grid built for React.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Tanstack React-Query**: Hooks for fetching, caching, and updating asynchronous data in React.
- **Lucide-React**: A library of icons for React.
- **Sonner**: A notification library for React.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend (Server)
- **Express**: A minimal and flexible Node.js web application framework.
- **Cors**: A package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Prisma**: An open-source database toolkit.
- **Bcryptjs**: A library to help you hash passwords.
- **Jsonwebtoken**: A library to create, sign, and verify JSON Web Tokens.
- **MongoDB**: A NoSQL database for modern applications.

### Development Tools
- **Typescript**: A strongly typed programming language that builds on JavaScript.
- **Nodemon**: A utility that will monitor for any changes in your source and automatically restart your server.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
