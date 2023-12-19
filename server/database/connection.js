const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/Aplicacion';

const connectDB = async () => {
    try {
        // mongodb connection string
        const con = await mongoose.connect(mongoURI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;

// Call the connectDB function
connectDB();
