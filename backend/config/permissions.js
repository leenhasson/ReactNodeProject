// Check if a user is logged in by checking the session for "user"
function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).json({ error: "Please log in to view." });
    }
}

// Check if the user is an admin
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.user_role === 'admin' ) {
        return next();
    } else {
        return res.status(401).json({ error: "Invalid operation, you are not an admin!" });
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}