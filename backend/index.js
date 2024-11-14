import { app } from "./app.js";
import connectdb from "./src/db/connectdb.js";

// Connect to the database
connectdb();

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
