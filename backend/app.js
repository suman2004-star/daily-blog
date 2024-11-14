import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: 'https://daily-blog-blush.vercel.app', // Allow only your frontend domain
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import userrouter from "./routers/user.route.js"
import postrouter from "./routers/post.route.js"

app.use("/api/v1/users", userrouter);
app.use("/api/v1/posts",postrouter)

export {app}