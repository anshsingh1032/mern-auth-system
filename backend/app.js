import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path";

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}
))

app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,limit:"16kb"
}))

app.use(cookieParser())

const __dirname = path.resolve()

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend/dist")));

	app.use((req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

export { app }