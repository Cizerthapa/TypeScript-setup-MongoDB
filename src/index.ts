import express from 'express';
import './models/user.model'; // Import your models
import { authenticateToken, authorizeRole } from './middlewares/auth.middleware'; // Import your middleware
import userRouter from './routes/user.routes'; // Adjusted path for clarity
import fileRouter from './routes/file.routes'; //
import dotenv from 'dotenv'; 
import dbconnect from './config/database.config';
import env from './config/env'
import cors from 'cors';
import logger from './config/logger'

dotenv.config(); // Load environment variables from.env file

const app = express();
const PORT = process.env.PORT;

() => {
  logger.info(`Application Starting on process ID: ${process.pid}`)

  const server = app.listen(env.PORT, env.HOST, async () => {
    logger.info(`
      ============================    
      -------Server Started!------
        Port:${env.PORT}    
        Host:${env.HOST}
        Environment: ${env.NODE_ENV}
      ============================`
    )
  })
};

app.use(
  cors({
    origin: '*', // Allow all origins
    credentials: true, // Send cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  })
);

// Middleware setup
app.use(express.json()); // For parsing JSON bodies


// Routes setup
app.use('/api/users', userRouter); // Use the user routes with a specific base path

app.use('/api/file', fileRouter);

// Sample route to test authentication and role authorization
app.get('/protected', authenticateToken, authorizeRole(['admin']), (req, res) => {
  res.send('This is a protected route');
});

// Sample public route
app.get('/public', (req, res) => {
  res.send('This is a public route');
});

// Synchronize database and start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
dbconnect(process.env.DB_URL || 'mongodb://localhost:27017/carnew')
  .catch((err) => console.error('Failed to connect to the database:', err));



