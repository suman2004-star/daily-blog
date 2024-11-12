import { app } from "../../app.js";
import connectdb from "../../src/db/connectdb.js";

export default async function handler(req, res) {
  // Handle preflight CORS request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "https://daily-blog-buv5.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(204).end();
    return;
  }

  // Connect to the database
  await connectdb();

  // Pass the request to your Express app
  app(req, res);
}
