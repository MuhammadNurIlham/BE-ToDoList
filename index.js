import express from "express"; //import express and initialize
import mongoose from "mongoose"; //import mongoose and initialize
import cors from "cors"; //import cors (Cross Origin Resource Sharing)

import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";


// const router = require('./routes');
// use express in app variable
const app = express();

// define the server port
const port = 5000;

// connect to database mongoDB with mongoose
mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// define db varible with mongoose and handle success and error
const db = mongoose.connection;
db.on('error', (error) => console.log(error)); // if connected to database error
db.once('open', () => console.log('Database Connected...')); // if connected to database success

// middleware for cors
app.use(cors());

// use express json for receive data format json
app.use(express.json());

// create endpoint grouping and router
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', todoRoutes);
app.use('/api/v1/', categoryRoutes);
app.use('/api/v1/', authRoutes);

// When this nodeJs app executed, it will listen to defined port 
app.listen(port, () => console.log(`Server running on port ${port}!! and Happy Hacking!`));