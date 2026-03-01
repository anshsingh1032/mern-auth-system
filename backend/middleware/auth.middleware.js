import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyToken = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        if(!decodedToken){
            throw new ApiError(401,"Unauthorized-Invalid Token")
        }
        req.userId=decodedToken.userId
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Token")
    }
})