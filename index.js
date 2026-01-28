const express = require("express");
const cors = require("cors");
require("dotenv").config();

const main = require("./db/connection");

const app = express();
const taskRouter = require("./routes/tasks.route");


// Serve static files from public folder
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());


// routes
app.use("/api/v1/tasks", taskRouter);


const port = process.env.PORT || 3000


// Connect to MongoDB and start server
main().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
