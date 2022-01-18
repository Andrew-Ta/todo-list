// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/todo-list', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Listener to see if mongodb connetion was made
        mongoose.connection.on('connected', () => {console.log('Mongoose is connected!!!!!')});
        mongoose.set('debug', true);
        // console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;