# Student Support App - API Documentation for Front-End Developers

## Introduction

Welcome to the Student Support App API. This document provides all the information you need to interact with the backend services. For a live, interactive version of this documentation where you can test endpoints directly, please run the application and navigate to [`/api-docs`](http://localhost:3000/api-docs).

The base URL for all API endpoints is `http://localhost:3000`.

## Authentication

Most of the API endpoints require authentication. The authentication process uses JSON Web Tokens (JWT).

**1. Register a New User**

First, a user must register an account.

*   **Endpoint**: `POST /api/auth/register`
*   **Request Body**:
    ```json
    {
      "name": "Test User",
      "email": "test.user@example.com",
      "password": "yourpassword",
      "studentId": "S12345"
    }
    ```
*   **Response (201 Created)**: On success, the API returns a JWT token.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "60c72b2f9b1d8c001f8e4cde",
        "name": "Test User",
        "email": "test.user@example.com",
        "role": "user"
      }
    }
    ```

**2. Log In**

*   **Endpoint**: `POST /api/auth/login`
*   **Request Body**:
    ```json
    {
      "email": "test.user@example.com",
      "password": "yourpassword"
    }
    ```
*   **Response (200 OK)**: On success, the API returns a new JWT token.

**3. Making Authenticated Requests**

For any endpoint that requires authentication, you must include the JWT token in the `Authorization` header of your request, prefixed with `Bearer `.

*   **Example Header**:
    ```
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ```

---

## API Endpoints

### Auth

#### `POST /api/auth/register`
Registers a new user. (See Authentication section above).

#### `POST /api/auth/login`
Logs in an existing user. (See Authentication section above).

---

### Academic

#### `GET /api/academic/tutoring`
Retrieves a list of available tutoring services.
*   **Auth Required**: No
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": 1,
        "subject": "Mathematics",
        "tutor": "Dr. Sarah Johnson",
        "availability": "Mon-Wed 2-4 PM",
        "location": "Library Room 101"
      }
    ]
    ```

#### `GET /api/academic/resources`
Retrieves a list of academic resources.
*   **Auth Required**: No
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": 1,
        "title": "Study Guides Library",
        "description": "Comprehensive study materials for all subjects",
        "link": "/study-guides"
      }
    ]
    ```

---

### Community

#### `GET /api/community/events`
Retrieves all community events.
*   **Auth Required**: No

#### `POST /api/community/events`
Creates a new community event.
*   **Auth Required**: Yes
*   **Request Body**:
    ```json
    {
        "title": "Finals Study Group",
        "description": "A study group for final exams.",
        "date": "2025-12-01T10:00:00Z",
        "location": "Library, Room 204",
        "category": "Academic"
    }
    ```

#### `PUT /api/community/events/:id`
Updates an existing community event.
*   **Auth Required**: Yes (must be the creator of the event or an admin)
*   **Request Body**:
    ```json
    {
        "title": "Updated Study Group",
        "description": "An updated study group for final exams.",
        "date": "2025-12-02T10:00:00Z",
        "location": "Library, Room 205",
        "category": "Academic"
    }
    ```

#### `DELETE /api/community/events/:id`
Deletes a community event.
*   **Auth Required**: Yes (must be the creator of the event or an admin)

#### `GET /api/community/posts`
Retrieves all community posts.
*   **Auth Required**: No

#### `POST /api/community/posts`
Creates a new community post.
*   **Auth Required**: Yes
*   **Request Body**:
    ```json
    {
        "title": "Need help with Calculus II",
        "content": "Can anyone explain integration by parts?",
        "category": "Academic"
    }
    ```

#### `PUT /api/community/posts/:id`
Updates an existing community post.
*   **Auth Required**: Yes (must be the creator of the post or an admin)
*   **Request Body**:
    ```json
    {
        "title": "Need urgent help with Calculus II",
        "content": "I really need someone to explain integration by parts.",
        "category": "Academic"
    }
    ```

#### `DELETE /api/community/posts/:id`
Deletes a community post.
*   **Auth Required**: Yes (must be the creator of the post or an admin)

#### `GET /api/community/volunteer`
Retrieves volunteer opportunities.
*   **Auth Required**: No

---

### Financial

#### `GET /api/financial/scholarships`
Retrieves scholarship information.
*   **Auth Required**: No

#### `GET /api/financial/jobs`
Retrieves job opportunities.
*   **Auth Required**: No

---

### Mental Health

#### `GET /api/mental-health/resources`
Retrieves all mental health resources.
*   **Auth Required**: No
*   **Response (200 OK)**: A list of resources.

#### `POST /api/mental-health/resources`
Creates a new mental health resource.
*   **Auth Required**: No
*   **Request Body**:
    ```json
    {
      "title": "New Resource",
      "description": "Description of the new resource.",
      "contact": "contact@info.com",
      "type": "wellness"
    }
    ```

#### `GET /api/mental-health/resources/:id`
Retrieves a single mental health resource by its ID.
*   **Auth Required**: No

#### `PUT /api/mental-health/resources/:id`
Updates a mental health resource.
*   **Auth Required**: No
*   **Request Body**:
    ```json
    {
      "title": "Updated Resource Title"
    }
    ```

#### `DELETE /api/mental-health/resources/:id`
Deletes a mental health resource.
*   **Auth Required**: No

#### `POST /api/mental-health/chat`
Get an AI-powered mental health chat response.
*   **Auth Required**: No
*   **Request Body**:
    ```json
    {
      "message": "I am feeling very stressed about my exams."
    }
    ```

---

## Error Responses

The API uses standard HTTP status codes for errors.

*   **`400 Bad Request`**: The request was invalid (e.g., missing a required field). The response body will contain a `message` explaining the error.
    ```json
    {
      "message": "An account with this email already exists."
    }
    ```
*   **`401 Unauthorized`**: The request is missing a valid authentication token.
    ```json
    {
      "message": "Access denied, no token provided"
    }
    ```
*   **`500 Internal Server Error`**: A generic error for an unexpected issue on the server.
    ```json
    {
      "message": "Server error",
      "error": "Details about the error."
    }
    ``` 