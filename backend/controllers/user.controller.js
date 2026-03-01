import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"

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
    const createdUser  = await User.findById(user._id).select(
        "-password"
    )
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
})
export {
    registerUser,
}