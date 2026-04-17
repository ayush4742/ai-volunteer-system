require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const problemRoutes = require("./routes/problemRoutes");
const matchRoutes = require("./routes/matchRoutes");
const bulkRoutes = require("./routes/bulkRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/volunteer", volunteerRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/bulk", bulkRoutes);
app.use("/api/bulk", bulkRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});