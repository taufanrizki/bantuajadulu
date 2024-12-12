// backend/routes/donations.js
const express = require("express");
const router = express.Router();
const connection = require("../db");

// GET: Ambil semua donasi
router.get("/", (req, res) => {
  const query = "SELECT * FROM donations";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching donations:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST: Tambah donasi baru
router.post("/", (req, res) => {
  const { name, imageSrc, target } = req.body;
  if (!name || !imageSrc || !target) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const query = "INSERT INTO donations (name, imageSrc, target) VALUES (?, ?, ?)";
  connection.query(query, [name, imageSrc, target], (err, results) => {
    if (err) {
      console.error("Error adding donation:", err);
      return res.status(500).json({ error: err.message });
    }
    const newDonation = { id: results.insertId, name, imageSrc, target, collected: 0 };
    res.status(201).json(newDonation);
  });
});

// POST: Tambah jumlah donasi
router.post("/:id/donate", (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0." });
  }
  // Update collected amount
  const updateQuery = "UPDATE donations SET collected = collected + ? WHERE id = ?";
  connection.query(updateQuery, [amount, id], (err, results) => {
    if (err) {
      console.error("Error updating donation:", err);
      return res.status(500).json({ error: err.message });
    }
    // Ambil data donasi yang diperbarui
    const selectQuery = "SELECT * FROM donations WHERE id = ?";
    connection.query(selectQuery, [id], (err, results) => {
      if (err) {
        console.error("Error fetching updated donation:", err);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Donation not found." });
      }
      res.json(results[0]);
    });
  });
});

module.exports = router;
