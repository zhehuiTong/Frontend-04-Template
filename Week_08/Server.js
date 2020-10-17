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
        response.end(`
          <html mass=a >
            
            <head>
              <style>
                #container {
                  width: 500px;
                  height: 300px;
                  display: flex;
                  background-color: rgb(255, 255, 255)
                }
              </style>
            </head>
            <body>
              <div id="container"></div>
            </body>
          </html>
        `);
    })
}).listen(3001)