require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const userRoutes = require('./routes/users');
const classRoutes = require('./routes/Classes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'ArnoldWasHere',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);

// Main Page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Main Page</h1>');
  });
  
// 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


