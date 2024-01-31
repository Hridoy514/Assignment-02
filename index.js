let http = require('http');
let url = require('url');
let fs = require('fs');
let multer = require('multer');
let upload = multer({ destination: 'uploads/' });

let server = http.createServer( function (req, res){

let parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home Page');
  } else if (parsedUrl.pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is About Page');
  } else if (parsedUrl.pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Contact Page');
  } else if (parsedUrl.pathname === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', function (error){
      if (error) throw error;
      console.log('File created and text written to demo.txt');
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('File created and text written to demo.txt');
  } else if (parsedUrl.pathname === '/upload-file' && req.method === 'POST') {
    // Example for file upload using multer
    upload.single('file')(req, res, function (err){
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error uploading file');
        return res.end();
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('File uploaded successfully');
      return res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
  }

  // End the response
  res.end();
});

// Listen on port 5500
server.listen(5500);

// Log a message when the server starts listening
console.log('Server is listening on port 5500');