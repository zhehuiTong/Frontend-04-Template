const http = require('http');

console.log(http)
http.createServer((request, response) => {
    let body = [];
    request.on("error", err => {
        console.log(err)
    }).on('data', chunk => {
        body.push(chunk.toString())
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end("hello world\n");
    })
}).listen(3001)