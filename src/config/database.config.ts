import dotenv from 'dotenv';
import mongoose from 'mongoose';
import events from 'events';

dotenv.config();

// Increase the maximum number of listeners for EventEmitter to avoid warnings
events.EventEmitter.defaultMaxListeners = 20;

const connectDB = async (url: string) => {
    try {
        const uri: string = url;
        if (!uri) {
            throw new Error('MONGO_URL is not defined in .env file');
        }

        await mongoose.connect(uri);

        console.log('Database connected successfully');

        // Check if User collection is empty, then seed it

        // Check if Product collection is empty, then seed it

    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export default connectDB;