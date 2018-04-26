const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

function parse_get_data_from_url(req_url) {
    return url.parse(req_url, true)
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  var response = ""
  response+="Method: "+req.method+"\n"
  switch (req.method) {
      case 'POST':
        console.log('Processing POST')
        var post = '';
        req.on('data', function(chunk){    
            post += chunk;
        });
        req.on('end', function(){
            post = querystring.parse(post);
            response+="id:"+post['id'];
        });
        req.on('end', function(){
            res.end(response)
        })
        break;
      case 'GET':
        console.log('Prosessing GET')
        var get = parse_get_data_from_url(req.url).query;
        response += "id: "+get['id']+"\n"
        res.end(response)
        break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});