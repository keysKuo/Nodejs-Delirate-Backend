import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.ATLAS_URL || 'mongodb://127.0.0.1:27017/Delirate';
async function connect() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to database');
    } 
    catch (error) {
        console.log('Error connecting to database');
    }
}

export default { connect };