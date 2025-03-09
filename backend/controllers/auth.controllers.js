import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    // Check if all required fields are provided
    if (!first_name || !last_name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      role,
    });

    // Save the new user
    await newUser.save();

    // Generate a JWT token (use an environment variable for the secret)
    const token = newUser.createJWT();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = user.createJWT();

    res
      .status(200)
      .json({ user: { role: user.role, username: user.first_name }, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (without password_hash)
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password_hash");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password_hash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID (admin or authorized users)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    let user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;

    // If password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: "User profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user by ID (admin only)
export const deleteUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.remove();
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
