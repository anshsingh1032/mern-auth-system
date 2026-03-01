import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail } from "../mailtrap/email.js"
import crypto from "crypto";

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
const login = asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        throw new ApiError(400,"password and email is required")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user does not exists")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }
    generateTokenAndSetCookie(res,user._id)
    user.lastLogin = new Date();
	await user.save();

    const loggedInUser = await User.findById(user._id).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser
            },
            "User logged in successfully"
        )
    )
})
const logout = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .clearCookie("token")
    .json(new ApiResponse(200 , {} , "User logged Out"))
})
const forgotPassword = asyncHandler(async(req,res)=>{
    const {email}=req.body;

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"user not found")
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
	user.resetPasswordExpiresAt = resetTokenExpiresAt;

	await user.save();
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    return res.status(200)
    .json(new ApiResponse(
        200,
        "Password reset link sent to your email"
    )
    )
})
const resetPassword = asyncHandler(async(req,res)=>{
    const {token}= req.params;
    const {password} = req.body
    const user = await User.findOne({
        resetPasswordToken:token,            
        resetPasswordExpiresAt:{$gt:Date.now()}
    })
    if(!user){
        throw new ApiError(200,"Invalid or expired reset token")
    }
    user.password=password
    user.resetPasswordToken = undefined;
	user.resetPasswordExpiresAt = undefined;
	await user.save();

    await sendResetSuccessEmail(user.email)

    return res.status(200)
    .json(new ApiResponse(200,
        "Password reset successful"
    ))
})
const checkAuth = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.userId).select("-password")
    if(!user){
        throw new ApiError(400,"User not found")
    }
    return res.status(200)
    .json(new ApiResponse(200,
        user,
        "User authenticated successfully"
    ))
})
export {
    registerUser,
    verifyEmail,
    logout,
    login,
    forgotPassword,
    resetPassword,
    checkAuth
}