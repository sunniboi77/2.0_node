<<<<<<< HEAD
/*
http://127.0.0.1:8080
*/

=======
>>>>>>> 7a71c0e94e255eef918185ed3a5be65f51aedb71
const http = require('http'),
  fs = require('fs'),
  url = require('url');

  http.createServer((request, response) => {
        let addr = request.url,
        q = url.parse(addr, true),
        filePath = '';

        fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Added to log.');
            }
        });

        if (q.pathname.includes('documentation')) {
            
            filePath = (__dirname + '/documentation.html');
          } else {
            filePath = 'index.html';
          }

        
          fs.readFile(filePath, (err, data) => {
            if (err) {
              throw err;
            }
        

            
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        
          });
        
        }).listen(8080);
        console.log('My test server is running,and running on Port 8080.');
 
