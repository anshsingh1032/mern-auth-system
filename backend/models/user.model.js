import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
        verificationToken:{
            type:String
        },
        verificationTokenExpiresAt:{
            type:Date
        },
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
	},
	{ timestamps: true }
);
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    

})
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}



export const User = mongoose.model("User", userSchema);