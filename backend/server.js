// Leen Hasson - 212480438
// Adan Kayouf - 212743280

require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

const contactusRoutes = require('./routes/contactus');
const userRoutes = require('./routes/users');
const classRoutes = require('./routes/Classes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

app.use(cors({ 
    origin: "http://localhost:5000", // Frontend url
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    }
}));

// Routes
app.use("/api/contactus", contactusRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);

// Home Page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1>');
  });
  
// 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


