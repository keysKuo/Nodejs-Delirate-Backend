import express from 'express';
import cookie from 'cookie-parser';
import session from 'express-session';
// import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './config/database.js';
import router from './resources/index.js';
dotenv.config();


const app = express();
const PORT = process.env.SERVER_PORT || 8080;
database.connect();

app.use(cors());
app.use(express.urlencoded());
app.use(express.static('src/public'));
app.use(express.json());
app.use(cookie('Origin'));
app.use(session({
    secret: 'nkeyskuo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000000 }
}))

router(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})