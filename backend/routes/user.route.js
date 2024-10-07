// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { createUser, getUsers, deleteUser, updateUser, getUserData } = require("../helper/user.helper");
const { storage } = require("../configurations/multer.config");
const {
  successMessage,
  errorMessage,
} = require("../enums/response-message.enum");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const upload = multer({ storage: storage });

// @route   POST /api/register
// @desc    Register a new user
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    await createUser(req.body, req.file ? req.file.path : "");
    return res.status(201).send({
      success: true,
      message: successMessage.USER_REGISTRATION_SUCCESSFUL,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).send({ message: error.message, success: false });
  }
});

// @route GET /api/users/:id
// @desc Get specific user details
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ success: false, message: errorMessage.INVALID_DATA });
    }
    const user = await getUserData(userId);
    return res.status(200).send({
      success: true,
      message: successMessage.USER_LIST_FETCHED_SUCCESSFULLY,
      data: user,
    });  
  } catch (error) {
    
    }
})


// @route   GET /api/users
// @desc    Get all registered users
router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send({
      success: true,
      message: successMessage.USER_LIST_FETCHED_SUCCESSFULLY,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: error.messgae, success: false });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user data
router.put("/users/:id", upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ success: false, message: errorMessage.INVALID_DATA });
    }

    await updateUser(userId, req?.file?.path, req.body)
    return res
      .status(201)
      .send({
        success: true,
        message: successMessage.USER_UPDATED_SUCCESSFULLY,
      });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ success: false, message: errorMessage.INVALID_DATA });
    }
    await deleteUser(userId);
    return res.status(201).send({
      success: true,
      message: successMessage.USER_DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
