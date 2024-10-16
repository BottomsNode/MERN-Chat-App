const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request, response) {
    try {
        // Retrieve the token from cookies
        const token = request.cookies.token || "";

        // Extract user details from the token
        const user = await getUserDetailsFromToken(token);

        // Check if the user is found
        if (!user || !user._id) {
            return response.status(401).json({
                message: "Unauthorized: User not found",
                success: false,
            });
        }

        // Destructure name and profile_pic from the request body
        const { name, profile_pic } = request.body;

        console.log("Updating user:", { name, profile_pic }); // Log the incoming data

        // Update user details in the database
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { name, profile_pic }
        );

        // Check if the update was acknowledged
        if (updateResult.modifiedCount === 0) {
            return response.status(400).json({
                message: "No changes made to user details",
                success: false,
            });
        }

        // Retrieve updated user information
        const userInformation = await UserModel.findById(user._id);

        // Send back a success response
        return response.json({
            message: "User updated successfully",
            data: userInformation,
            success: true,
        });
    } catch (error) {
        console.error("Error updating user:", error); // Log error for debugging
        return response.status(500).json({
            message: error.message || "An error occurred while updating user details",
            success: false,
        });
    }
}

module.exports = updateUserDetails;