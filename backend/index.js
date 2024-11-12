
import { app } from "./app.js";
import connectdb from "./src/db/connectdb.js";


connectdb()
  // Start the server
const PORT = 8000 || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
