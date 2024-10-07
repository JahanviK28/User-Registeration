const { logger } = require("../configurations/logger.config");
const User = require("../models/user.model");
const { errorMessage } = require("../enums/response-message.enum");
const { error } = require("winston");
const mongoose = require("mongoose");

/**
 * Helper function to create a user
 * @param {*} bodyData - request body data
 * @param {*} filePath - file path of the profile picture
 */
async function createUser(bodyData, filePath) {
  try {
    const { name, email, username, contactInfo, password } = bodyData;
    if (!name || !email || !username || !contactInfo || !password) {
      throw new Error("Missing required fields");
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = new User({
      name,
      email,
      username,
      contactInfo,
      password,
      profilePicture: filePath || null,
    });

    await newUser.save();
  } catch (error) {
    logger.error(errorMessage.USER_REGISTERATION_FAILURE, {
      error: error?.message,
    });
    throw new Error(error.message);
  }
}

/**
 * Helper function to get all users
 */
async function getUsers() {
  try {
    const users = await User.find(
      {},
      { name: 1, email: 1, username: 1, contactInfo: 1, profilePicture: 1 }
    ).exec();
    return users;
  } catch (error) {
    logger.error(errorMessage.GET_USER_LIST_FUNCTION_FAILURE, {
      error: error?.message,
    });
    throw new Error(error.message);
  }
}

/**
 * Helper function to update the user
 * @param {*} userId - user id to update the user
 * @param {*} filePath - file path to update profile picture
 * @param {*} bodyData - body data to update
 */
async function updateUser(userId, filePath, bodyData) {
  try {
    const updates = {};
    bodyData?.name ? (updates.name = bodyData.name) : null;
    bodyData?.email ? (updates.email = bodyData.email) : null;
    bodyData?.password ? (updates.password = bodyData.password) : null;
    bodyData?.contactInfo ? (updates.contactInfo = bodyData.contactInfo) : null;
    filePath ? (updates.profilePicture = filePath) : null;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId},
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
  } catch (error) {
    logger.error(errorMessage.USER_UPDATE_FAILURE, {
      error: error?.message,
    });
    throw new Error(error.message);
  }
}

/**
 * Helper function to delete the user
 * @param {*} userId - user id to delet the user
 */
async function deleteUser(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new error("User not found");
    }
  } catch (error) {
    logger.error(errorMessage.USER_DELETION_FAILURE, {
      error: error?.message,
    });
    throw new Error(error.message);
  }
}

/**
 * Helper function to get user data
 * @param {*} userId - user id to get the user
 */
async function getUserData(userId) {
  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user
  } catch (error) {
    logger.error(errorMessage.GET_USER_FAILURE, {
      error: error?.message,
    });
    throw new Error(error.message);
  }
}

module.exports = { createUser, getUsers, deleteUser, updateUser, getUserData};
