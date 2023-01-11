//Creating a simple node.js web server

const http = require('http');

http.createServer((req, res) => {
    
    if(req.url == '/'){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('Created!');
    } else {
        res.write(`
        <h1>404</h1>
        `);
    }
    
    res.end();
}).listen(5000);

