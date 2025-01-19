const mongoose = require('mongoose');
require('dotenv').config(); // To load environment variables

const connectToMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from .env
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToMongo;