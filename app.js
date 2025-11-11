// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Serve the home page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Informational Site</h1>
    <p>This is the home page.</p>
    <a href="/about">About</a> | <a href="/contact">Contact</a>
  `);
});

// Serve the About page
app.get('/about', (req, res) => {
  res.send(`
    <h1>About Us</h1>
    <p>This is the about page.</p>
    <a href="/">Home</a> | <a href="/contact">Contact</a>
  `);
});

// Serve the Contact page
app.get('/contact', (req, res) => {
  res.send(`
    <h1>Contact</h1>
    <p>Email us at contact@example.com</p>
    <a href="/">Home</a> | <a href="/about">About</a>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
