const mongoose = require('mongoose');

// Schema for user information
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."], // Ensure name is provided
    },
    email: {
        type: String,
        required: [true, "Please provide an email."], // Ensure email is provided
        unique: true, // Email must be unique across users
        lowercase: true, // Store email in lowercase for consistency
        trim: true, // Remove whitespace from both ends of the string
    },
    password: {
        type: String,
        required: [true, "Please provide a password."], // Ensure password is provided
        minlength: [6, "Password must be at least 6 characters long."], // Optional: enforce a minimum length for security
    },
    profile_pic: {
        type: String,
        default: "", // Default to an empty string if no profile picture is provided
    },
}, {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
});

// Creating the User model based on the user schema
const UserModel = mongoose.model('User', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = UserModel;