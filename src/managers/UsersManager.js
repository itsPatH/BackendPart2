import usersModel from "./models/user.model.js";

export default class UsersManager {

    async getUsers() {
        try {
            return await usersModel.find();
        } catch (error) {
            console.error("Error getting users:", error);
            throw new Error("Could not retrieve users");
        }
    }

    async getUserById(userId) {
        try {
            const user = await usersModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error getting user by ID:", error);
            throw new Error("Could not retrieve user");
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const user = await usersModel.findOne({ email: userEmail });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error getting user by email:", error);
            throw new Error("Could not retrieve user");
        }
    }

    async createUser(user) {
        try {
            const newUser = await usersModel.create(user);
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Could not create user");
        }
    }

    async updateUser(userId, user) {
        try {
            const updatedUser = await usersModel.updateOne({ _id: userId }, { $set: user });
            if (updatedUser.matchedCount === 0) {
                throw new Error("User not found");
            }
            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Could not update user");
        }
    }
}