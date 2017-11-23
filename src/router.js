

var {staticFileHandler, homeHandler, apiHandler} = require('./handlers');

const router = (request, response) => {

let url = request.url;
if(url === '/') {
    homeHandler(request, response);
} else if (url.indexOf('/public/') !== -1) {
    staticFileHandler(request, response, url);
} else if (url.indexOf('/api') !== -1) {
    apiHandler(request, response, url);
  } else {
    response.writeHead(404);
    response.end('Page not found');
}
}

module.exports = router;











// var {staticFileHandler, homeHandler, endPointHandler, apiHandler} = require('./handlers.js');
//
//
// function router(request, response, url){
//   var url = request.url;
//   console.log(url + "URL");
//   if(url === '/'){
//     homeHandler(request, response);
//     }
//     else if (url.indexOf('/endpoint') !== -1){
//     endPointHandler(request, response);
//    }
//    else if(url === ('/wikiname')){
//      apiHandler(request, response);
//    } else {
//     staticFileHandler(request, response, url);
//    }
//
// };
//
// module.exports = router;
