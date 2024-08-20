import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoute from './routes/posts.js';
import dotenv  from 'dotenv';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// --
app.use('/uploads', express.static('uploads'));

app.use('/posts', postRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err.message);
    });