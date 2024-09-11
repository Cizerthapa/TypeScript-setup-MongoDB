import express from 'express';
import './schema/user.schema'; // Import your models
import { authenticateToken, authorizeRole } from './middlewares/auth.middleware'; // Import your middleware
import userRouter from './routes/user.routes'; // Adjusted path for clarity
import fileRouter from './routes/file.routes'; //
import dotenv from 'dotenv'; 
import dbconnect from './config/database.config';
import env from './config/env'
import cors from 'cors';
import logger from './config/logger'
// import { S3 } from 'aws-sdk'; // Import S3Client from AWS SDK

// // Create an S3 client
// const s3 = new S3();

dotenv.config(); // Load environment variables from.env file

// // AWS credentials
// AWS.config.update({
//   accessKeyId: 'YOUR_ACCESS_KEY_ID',
//   secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//   region: 'YOUR_REGION'
// });

// // Create an S3 client
// const s3 = new AWS.S3();

// // List buckets in your S3 account
// s3.listBuckets((err: any, data: { Buckets: any; }) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to S3 successfully!');
//     console.log('Buckets:', data.Buckets);
//   }
// });

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

app.post('/presign',function(req, res) {
  res.send('index');
})

// Sample public route
app.get('/public', (req, res) => {
  res.send('This is a public route');
});

// Synchronize database and start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to the database

  ;(() => {
    logger.info(`Application Starting on process ID: ${process.pid}`)
  
    const server = app.listen(env.PORT, env.HOST, async () => {
      await dbconnect(process.env.DB_URL || 'mongodb://localhost:27017/carnew')
      .catch((err) => console.error('Failed to connect to the database:', err));
  
      logger.info(`
        ============================    
        -------Server Started!------
          Port:${env.PORT}    
          Host:${env.HOST}
          Environment: ${env.NODE_ENV}
        ============================
  `)
    })
  
    server.keepAliveTimeout = 70 * 1000 + 1000
    server.headersTimeout = 70 * 1000 + 2000
  
    const exit = async (code: 0 | 1) => {
      server.close()
      //await disconnectDb()
      process.exit(code)
    }
  
    // Handle termination signals (SIGTERM, SIGINT)
    ;['SIGTERM', 'SIGINT'].forEach((event) => {
      process.on(event, () => {
        logger.info(`Received ${event}. Shutting down gracefully...`)
        exit(0)
      })
    })
  
    // Handle uncaught exceptions and unhandled rejections
    ;['uncaughtException', 'unhandledRejection'].forEach((event) => {
      process.on(event, (error, source) => {
        logger.error(`${event}:`, error)
        logger.debug('Source:', source)
        exit(1)
      })
    })
  })()
  