import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoute from './routes/posts.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// --
app.use('/uploads', express.static('uploads'));

app.use('/posts', postRoute);

const CONNECTION_URL = "mongodb+srv://akleshyadav0408:akleshYadav998@cluster0.kad8qhs.mongodb.net/momentos?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err.message);
    });