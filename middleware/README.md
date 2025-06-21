# Student Support App Backend

A Node.js/Express/MongoDB backend for the Student Support App, providing APIs for mental health, academic, financial, and community support for students.

## 🚀 Features
- User authentication (JWT)
- Mental health resources and AI chat
- Academic tutoring and resources
- Financial aid, scholarships, and job board
- Community events, forums, and volunteer opportunities
- **Swagger API docs** at `/api-docs`

## 📦 Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- JWT for authentication
- Swagger for API documentation

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Create a `.env` file in `backend/`
```
MONGODB_URI=mongodb://localhost:27017/student-support
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
OPENAI_API_KEY=your-openai-api-key
```

### 4. Start MongoDB
- Locally: `mongod --dbpath /data/db`
- Or use MongoDB Atlas

### 5. Run the backend server
```bash
npm run dev
```

Server will run at [http://localhost:3000](http://localhost:3000)

### 6. API Documentation
Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive Swagger docs.

## 📋 Project Structure
```
backend/
  models/         # Mongoose models (User, Post, Event)
  routes/         # Express route modules
  middleware/     # Custom middleware (auth)
  server.js       # Main server file
  package.json    # Backend dependencies
  .env            # Environment variables (not committed)
```

## 🧪 Testing
- Use Postman or Swagger UI to test endpoints
- All major endpoints are documented in Swagger

## 🛡️ Security Notes
- Never commit `.env` to git
- Change `JWT_SECRET` in production
- Use HTTPS in production

## 📄 License
MIT 