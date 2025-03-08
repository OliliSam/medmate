import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const registerUser = async(req, res) => {
    const { first_name, last_name, email, password, role} =req.body;
    try {
       const existingUser = await User.findOne({email});
       if (existingUser) {
        res.status(400).json({success: true, message: 'User already exists'
     });
       
    }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword =await bcrypt.hash(password, salt);

       const newUser =new User({
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        role,
       });

       await newUser.save();
       const token = jwt.sign(
        {userId: newUser._id, role: newUser.role},
        'your_jwt_secret',
        {expiresIn: '1hr'}
       );


        res.status(201).json({success: true, message: 'User registered successfully' });
    } catch (error) {
      console.log("Error in getting user:", error.message);
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try{
        const user= await User.findOne({email});
        if (!user) {
            return res.status(400).json({success:false, message: "User does not exist"});
        }

        const isMatch =await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({success:false, message: "Invalid credentials"});  
        }

        const token = jwt.sign({ userID: user._id, role: user.role},
            'your_jwt_secret', 
            {expiresIn: '1h'}
            );

            res.status(200).json({token});
        
    }
     
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
   

    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password_hash');
        if (!user) {
            res.status(404).json({ message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
       res.status(500).json({ message: 'Server error'}); 
    }
};

export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password_hash');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const updatedUserProfile = await UpdatedUserProfile.findByIdAndUpdate(req.params.id)
        if (!updatedUserProfile) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json(updatedUserProfile);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
    }
};     

export const deleteUserByID =async (req, res) => {
    try {
        const user = await User.findByID(req.params.id);
        if (!user) {
            res.status(404).json({success: false, message: 'User not found'});
        }

        await user.remove();
        res.status(200).json({ success: true, message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

