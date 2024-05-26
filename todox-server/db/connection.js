// const { MongoClient } = require('mongodb');

// const connectionString = 'mongodb+srv://vishwakarmabalram2:w1LX9Zwla9UrwhKv@todox.sxpkxq1.mongodb.net/?retryWrites=true&w=majority&appName=todox';

// const client = new MongoClient(connectionString);

// async function connectToDB() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//     }
// }



// module.exports.connectToDB = connectToDB

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
