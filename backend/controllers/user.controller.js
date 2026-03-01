import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail,sendWelcomeEmail } from "../mailtrap/email.js"

const registerUser = asyncHandler(async (req,res)=>{
    
    const {name,email,password} = req.body
    if (!email || !password || !name) {
        throw new ApiError(400,"all fields are required")
    }
    const existedUser = await User.findOne({
        $or:[{ email },{ name }]
    })
    if (existedUser) {
        throw new ApiError(409,"user with this email or username already exists ")
    }
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
        password,
        email,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    })
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email,verificationToken)
    const createdUser  = await User.findById(user._id).select(
        "-password"
    )
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
})
const verifyEmail = asyncHandler(async(req,res)=>{
    const {code}= req.body;
    
    const user = await User.findOne({
        verificationToken:code,
        verificationTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user){
        throw new ApiError(200,"Invalid or expired verification token")
    }
    user.isVerified = true;
	user.verificationToken = undefined;
	user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email,user.name)

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        "email verified successfully"
    ))
})
export {
    registerUser,
    verifyEmail
}