const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

// handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for some time");
    process.exit(1);
})



// config
dotenv.config({path: "backend/config/config.env"})

// connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// unhandeled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server for some time");

    // server.close(()=>{
        process.exit(1);
    // })
})