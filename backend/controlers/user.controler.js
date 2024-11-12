import bcrypt from 'bcryptjs'; // Correct import
import { user as UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from '../utils/AsyncHandler.js';
import jwt from 'jsonwebtoken';

const registeruser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if ([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await UserModel.findOne({
        $or: [{ username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with this username already exists");
    }

    const createdUser = await UserModel.create({
        username,
        password: hashedPassword
    });

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    res.status(200).json({ message: "User created" });
});

const loginuser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const user = await UserModel.findOne({
        $or: [{ username }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token ,user,message:"login succes"});
});

export { registeruser, loginuser };
