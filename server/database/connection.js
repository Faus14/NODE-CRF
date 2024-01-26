const mongoose = require('mongoose');
// Utiliza las variables de entorno proporcionadas por Railway
const mongoURI = process.env.MONGO_URL || 'mongodb://mongo:e3-C2EH4Bca-fGEfHdde4a1-DGfBFbH2@172.26.0.2:27017/Aplicacion';

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
