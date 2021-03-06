const fs = require('fs');
const path = require('path');
const queryString = require('querystring');
const apiRequest = require('./apiHandler')

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

const apiHandler = (request, response) => {
  const keyword = request.url;
  const parsed = queryString.parse(keyword);
  const word = parsed['/api'];
  const searchWord = encodeURIComponent(word);
  apiRequest(response, searchWord);
}

module.exports = {
  homeHandler,
  staticFileHandler,
  apiHandler,
};
