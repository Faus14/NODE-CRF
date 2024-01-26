const mongoose = require('mongoose');

const mongoURI = 'mongodb://172.27.0.2:27017/Aplicacion';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
