const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const { img } = require("vamtec"); // Import the image upload setup
const pool = new Pool({
  user: "Sivasaran", host: "localhost", database: "Sivasaran", password: "password", port: 5432
});

const app = express();
app.use(cors(), express.static("uploads"));

app.post("/upload", img(["uploads", "original", "image1"]), async (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const { filename } = req.file;
    await pool.query("INSERT INTO images (image_name) VALUES ($1)", [filename]);
    res.json({ message: "Image uploaded", imageName: filename });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
});

// Fetch image names route
app.get("/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT image_name FROM images");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching images");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
