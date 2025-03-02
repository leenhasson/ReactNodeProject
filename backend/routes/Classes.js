const express = require("express");
const router = express.Router();
const dbSingleton = require("../config/dbSingleton");
const db = dbSingleton.getConnection();
const multer = require("multer");
const path = require("path");

const { isLoggedIn, isAdmin } = require('../config/permissions');

// Configuring storage for multer uploads
const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ex: 131247128952.png
  },
});

const upload = multer({ storage });

// GET api/classes
// Returns list of all Pilates classes in the database
router.get("/", isLoggedIn, (req, res) => {
  const query = "SELECT * FROM classes";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }
    res.json(results);
  });
});

// GET api/classes/:id
// Returns info about pilates class by id
router.get("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM classes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    const classDetail = results[0];

    // If we have an image, save its url
    if (classDetail.image) {
      classDetail.image = `${req.protocol}://${req.get("host")}${classDetail.image}`;
    }

    res.json(classDetail);
  });
});

// POST api/classes
// Adding a new pilates class
router.post("/", isAdmin, upload.single("image"), (req, res) => {
  const { name, instructor, level, duration, description } = req.body;

 // Check if all values are available
  if (!name || !instructor || !level || !duration || !description) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // If we have an image, get its local path
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const query = "INSERT INTO classes (name, instructor, level, duration, description, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, instructor, level, duration, description, imageUrl], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Class added successfully!",
      id: results.insertId,
      class: {
        name,
        instructor,
        level,
        duration,
        description,
        image: imageUrl,
      },
    });
  });
});

// PUT api/classes/:id
// Updates an existing pilates class by id
router.put("/:id", isAdmin, upload.single("image"), (req, res) => {
  const { name, instructor, level, duration, description } = req.body;
  const { id } = req.params;

  // Check if all values exist
  if (!name || !instructor || !level || !duration || !description) {
    return res.status(400).json({ error: "All fields are required for update!" });
  }

  // If we have an image, get its path
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  let query, params;
  if (imageUrl) {
    query = "UPDATE classes SET name=?, instructor=?, level=?, duration=?, description=?, image=? WHERE id=?";
    params = [name, instructor, level, duration, description, imageUrl, id];
  } else {
    query = "UPDATE classes SET name=?, instructor=?, level=?, duration=?, description=? WHERE id=?";
    params = [name, instructor, level, duration, description, id];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Class updated successfully!" });
  });
});

// DEL api/classes/:id
// Deletes an existing pilates class
router.delete("/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM classes WHERE id=?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows == 0) {
        return res.status(404).json({ error: "No class found for delete."});
    }
    res.json({ message: "Class deleted successfully!" });
  });
});


module.exports = router;
