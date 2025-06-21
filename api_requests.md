# Student Support App API cURL Requests

This file contains cURL commands for all the API endpoints in the Student Support App.

**Note:** For authenticated requests, replace `<YOUR_AUTH_TOKEN>` with a valid JWT token obtained from the login or register endpoint.

---

### Academic

**Get tutoring services**
```bash
curl -X GET http://localhost:3000/api/academic/tutoring
```

**Get academic resources**
```bash
curl -X GET http://localhost:3000/api/academic/resources
```

---

### Auth

**Register a new user**
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "studentId": "12345"
}'
```

**Login a user**
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123"
}'
```

---

### Community

**Get all community events**
```bash
curl -X GET http://localhost:3000/api/community/events
```

**Create a new event (auth required)**
```bash
curl -X POST http://localhost:3000/api/community/events \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_AUTH_TOKEN>" \
-d '{
  "title": "Study Group for Finals",
  "description": "A study group for the final exams.",
  "date": "2025-12-01T10:00:00Z"
}'
```

**Get all community posts**
```bash
curl -X GET http://localhost:3000/api/community/posts
```

**Create a new post (auth required)**
```bash
curl -X POST http://localhost:3000/api/community/posts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_AUTH_TOKEN>" \
-d '{
  "title": "Need help with Calculus",
  "content": "Can anyone help me with the chain rule?"
}'
```

**Get volunteer opportunities**
```bash
curl -X GET http://localhost:3000/api/community/volunteer
```

---

### Financial

**Get scholarship information**
```bash
curl -X GET http://localhost:3000/api/financial/scholarships
```

**Get job opportunities**
```bash
curl -X GET http://localhost:3000/api/financial/jobs
```

---

### Mental Health

**Get mental health resources**
```bash
curl -X GET http://localhost:3000/api/mental-health/resources
```

**Get AI-powered mental health chat response**
```bash
curl -X POST http://localhost:3000/api/mental-health/chat \
-H "Content-Type: application/json" \
-d '{
  "message": "I am feeling very stressed about my exams."
}'
``` 