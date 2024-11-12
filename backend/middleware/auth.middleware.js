import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) return res.status(400).json({ error: 'Invalid Access token' });
  
    try {
      const verified = jwt.verify(token, "suman");
      req.user = verified;
      console.log("Token verified, User ID:", req.user.id);
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid token' });
    }
  };

export {auth}