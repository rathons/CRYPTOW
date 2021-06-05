require('dotenv').config({path:'./config.env'});
const express = require('express');
// var cors = require('cors');
const connectDB = require('./db/db');
const errorHandler = require('./middleware/errorHandler');

connectDB(); //Connecting to MongoDB atlas  

const app = express();
app.use(express.json());


// app.use(cors());
app.use('/api/auth', require('./routes/auth')); //route
app.use('/api/private', require('./routes/private')); //access return

app.use(errorHandler); //Error Handling Middleware(Message Constructor inside utils)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=> console.log(`Server running on port:${PORT}`));

process.on("unhandledRejection", (err, promise)=> {
    console.log(`An error occured -> ${err}`);
    server.close(() => process.exit(1));
}) //Closing Server safely during error

