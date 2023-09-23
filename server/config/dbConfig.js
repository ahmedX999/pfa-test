const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

//for verifying connection
connection.on('connected' , ()=>{
    console.log('Mongo db connection successfull')
})

//for verifying connection error
connection.on('error' , (err)=>{
    console.log('Mongo db connection error',err)
})
