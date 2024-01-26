const mongoose = require('mongoose');
const mongoURI = 'mongodb://monorail.proxy.rlwy.net:24590:27017/Aplicacion';

const connectDB = async () => {
    try {
        const con = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

// Llama a la función connectDB
connectDB();
