import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['caregiver', 'doctor', 'admin'],
        required: true 
    },
   
},{
  timestamps: true //createdAt, UpdatedAt
});

userSchema.methods.createJWT = function(){
    return jwt.sign(
        { userId: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
}

const Users = mongoose.model('User', userSchema);

export default Users;