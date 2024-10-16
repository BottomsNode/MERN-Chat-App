const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
async function connectToDatabase() {
    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const databaseConnection = mongoose.connection;

        // Event listener for successful connection
        databaseConnection.on('connected', () => {
            console.log("Successfully connected to the MongoDB database.");
        });

        // Event listener for connection errors
        databaseConnection.on('error', (error) => {
            console.error("Error occurred while connecting to the MongoDB database: ", error);
            process.exit(1); // Exit the application on MongoDB error
        });
    } catch (connectionError) {
        // Catch any errors during the initial connection attempt
        console.error("Failed to connect to the MongoDB database: ", connectionError);
        process.exit(1); // Exit the application on connection failure
    }
}

module.exports = connectToDatabase;