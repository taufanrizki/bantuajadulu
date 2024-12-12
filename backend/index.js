// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const donationRoutes = require("./routes/donations");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/donations", donationRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Donation API is running.");
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
}));

