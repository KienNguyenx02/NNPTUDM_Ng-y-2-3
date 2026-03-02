require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api", roleRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});