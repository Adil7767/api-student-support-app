import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import authRoutes from '../routes/auth.js';
import mentalHealthRoutes from '../routes/mental-health.js';
import academicRoutes from '../routes/academic.js';
import financialRoutes from '../routes/financial.js';
import communityRoutes from '../routes/community.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (cache for serverless)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Student Support App API',
    version: '1.0.0',
    description: 'API documentation for the Student Support App backend',
  },
  servers: [
    { url: 'https://<your-vercel-domain>', description: 'Production server' }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/mental-health', mentalHealthRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/community', communityRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Student Support App Backend API' });
});

export default app; 