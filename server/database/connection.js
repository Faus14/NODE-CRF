const mongoose = require('mongoose');
// Cambia 'localhost' por el nombre del servicio de MongoDB definido en docker-compose.yml
const mongoURI = 'mongodb://mongodb:27017/Aplicacion';

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
