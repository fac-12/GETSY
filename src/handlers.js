const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type:text/plain');
      response.end('Error 500, server not found');
    }
    response.writeHead(200, 'Content-Type: text/html');
    response.end(file);
  });
};

const staticFileHandler = (request, response, url) => {
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    img: 'image/jpg',
  };
  const extension = url.split('.')[1];
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, 'Content-Type:text/plain');
      response.end('Error 404, content not found');
    } response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
    response.end(file);
  });
};

const apiHandler = (request, response, url) =>{
        // const keyword = request.url;
        // const parsedKeyword = queryString.parse(keyword);
        var result = apiRequest();
        response.writeHead(200,{'Content-Type': 'application/json'}, function (error){
        if (error){
            console.log('apiHandler ' + error);
            return;
            }
          });
        response.end(JSON.stringify(result));
    };


module.exports = {
  homeHandler,
  staticFileHandler,
  apiHandler,
};
