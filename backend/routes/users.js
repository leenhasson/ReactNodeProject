const express = require("express");
const router = express.Router();
const dbSingleton = require("../config/dbSingleton"); 
const bcrypt = require("bcrypt");

const db = dbSingleton.getConnection();

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(500).json({ error: 'Missing value for register.' });
    }

    try {
        const hashed_password = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
   
        const user_role = role || 'user';
        
        db.query(query, [username, email, hashed_password, user_role], (err, result) => {
            if (err) {
                 // If email or username already exist, error
                if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ error: 'User already exist.' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            req.session.user = { username, user_role: user_role };
            return res.status(201).json({ message: 'Succesfully registered!', user: req.session.user });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured during registration.' });
    }
});




router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing values for login' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        // results length 0 means user was not found
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Get the user information
        const user = result[0];
        try {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: 'Invalid login info' });
            }
            // Save username and user_role in session
            req.session.user = { username: user.username, user_role: user.role };
            return res.status(200).json({ message: 'Sucessfuly logged in', user: req.session.user });
        } catch (error) {
            return res.status(500).json({ error: 'Error during login.' });
        }
    });
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed.' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out.' });
    });
});


router.get('/current', (req, res) => {
    if (req.session && req.session.user) {
        return res.json(req.session.user);
    }
    else {
        return res.status(500).json({error: `No user is currently logged in.`});
    }
});

module.exports = router;