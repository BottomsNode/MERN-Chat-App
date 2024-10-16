const mongoose = require('mongoose');

// Schema for individual messages
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "", // Default to an empty string if no text is provided
    },
    imageUrl: {
        type: String,
        default: "", // Default to an empty string if no image URL is provided
    },
    videoUrl: {
        type: String,
        default: "", // Default to an empty string if no video URL is provided
    },
    seen: {
        type: Boolean,
        default: false, // Default to false, indicating the message has not been seen
    },
    msgByUserId: {
        type: mongoose.Schema.ObjectId,
        required: true, // Ensure a user ID is provided for who sent the message
        ref: 'User', // Reference to the User model
    },
}, {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
});

// Schema for conversations
const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true, // Ensure a sender ID is provided
        ref: 'User', // Reference to the User model
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true, // Ensure a receiver ID is provided
        ref: 'User', // Reference to the User model
    },
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Message', // Reference to the Message model
        },
    ],
}, {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
});

// Creating models for message and conversation
const MessageModel = mongoose.model('Message', messageSchema);
const ConversationModel = mongoose.model('Conversation', conversationSchema);

// Exporting the models for use in other parts of the application
module.exports = {
    MessageModel,
    ConversationModel,
};