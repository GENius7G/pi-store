const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(path.join(__dirname, 'index.html'), (e, d) => {
        res.end(d || 'Not found');
      });
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(PORT, () => console.log('Server running on port ' + PORT));
