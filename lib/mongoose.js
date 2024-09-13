import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://newlookdeepthroat:LMnyBD8NaCLMTyRO@cluster0.2jm0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully'); // Log success
            return mongoose;
        }).catch(error => {
            console.error('MongoDB connection error:', error); // Log errors
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}


export default dbConnect;