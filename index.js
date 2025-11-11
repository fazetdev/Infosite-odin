// index.js
// Basic Node.js server for the Odin Project static site

// 1. Import built-in modules
const http = require('http');   // creates the web server
const fs = require('fs');       // reads files from your folder
const path = require('path');   // builds file paths safely

// 2. Define the port number (use 8080)
const port = 8080;

// 3. Helper function to send files to the browser
function sendFile(res, filePath, status = 200) {
  // detect file extension
  const ext = path.extname(filePath).toLowerCase();

  // decide content type header
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  const contentType = types[ext] || 'application/octet-stream';

  // read and send file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // if something goes wrong reading the file
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('500 - Internal Server Error');
    }
    // success: send data to browser
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(data);
  });
}

// 4. Create the web server
const server = http.createServer((req, res) => {
  // remove query strings and trailing slashes
  const url = req.url.split('?')[0].replace(/\/+$/, '') || '/';

  // serve static CSS file
  if (url === '/styles.css') {
    return sendFile(res, path.join(__dirname, 'styles.css'));
  }

  // 5. Match route to HTML file
  let file;
  if (url === '/' || url === '/index') file = 'index.html';
  else if (url === '/about') file = 'about.html';
  else if (url === '/contact-me') file = 'contact-me.html';
  else file = '404.html'; // anything else

  const filePath = path.join(__dirname, file);

  // 6. Check file and send it
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err && file === '404.html') {
      // if even 404.html missing
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Page not found');
    } else if (err) {
      // missing normal file
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 - Required file missing on server');
    } else {
      // found file, send it
      const status = file === '404.html' ? 404 : 200;
      sendFile(res, filePath, status);
    }
  });
});

// 7. Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
