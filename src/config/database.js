import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Delirate', {
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