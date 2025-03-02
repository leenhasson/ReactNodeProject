const express = require('express');
const dbSingleton = require('../config/dbSingleton');
const router = express.Router();
const db = dbSingleton.getConnection();

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        return res.status(500).json({"error": 'Cant send contact us message'});

    const query = 'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error sending message.' });
        }
        return res.json({"message": "Thank you for sending a message" });
    })
})


module.exports = router;
