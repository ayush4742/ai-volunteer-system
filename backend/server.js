require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const problemRoutes = require("./routes/problemRoutes");
const matchRoutes = require("./routes/matchRoutes");
const bulkRoutes = require("./routes/bulkRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// 🔥 CREATE HTTP SERVER
const server = http.createServer(app);

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 🔥 CONNECT DATABASE
connectDB();

// 🔥 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/bulk", bulkRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 🔹 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// 🔥 REAL-TIME TRACKING LOGIC
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  let lat = 12.9716;
  let lng = 77.5946;

  const interval = setInterval(() => {
    // 🔥 simulate movement
    lat += (Math.random() - 0.5) * 0.001;
    lng += (Math.random() - 0.5) * 0.001;

    socket.emit("locationUpdate", {
      lat,
      lng,
    });

  }, 2000);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
    clearInterval(interval);
  });
});


// ✅ IMPORTANT (FOR RENDER / DEPLOY)
const PORT = process.env.PORT || 5000;


// ❗ IMPORTANT: use server.listen NOT app.listen
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});