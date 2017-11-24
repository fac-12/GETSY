const request = require('request');
const apiKey = require('./key')


function cb(imgObj, response) {
  response.writeHead(200, { 'Content-Type': 'application/json'}, (error) => {
    if (error) {
      console.log(`apiHandler${error}`);
      return;
    }
  });
  response.end(JSON.stringify(imgObj));
}

function listingUrl(json, imgObj, response, cb) {
  function listingCall(json, imgObj, response, cb) {
    const id = json.results[0].listing_id;
    request.get(`https://openapi.etsy.com/v2/listings/${id}?api_key=${apiKey}`, (err, res, body) => {
      if (err) {
        process.stdout.write(`error ${err.message}`);
      }
      const listing = JSON.parse(body);
      const title = listing.results[0].title;
      const listingUrl = listing.results[0].url;
      imgObj[0].push(title);
      imgObj[0].push(listingUrl);
      cb(imgObj, response);
    });
  }
  listingCall(json, imgObj, response, cb)
}

function apiRequest(response, searchWord) {
  request.get(`https://openapi.etsy.com/v2/listings/active?keywords=${searchWord}&limit=1&location=United+Kingdom&max_price=10&api_key=${apiKey}`, (err, res, body) => {
    if (err) {
      process.stdout.write(`error ${err.message}`);
    }
    const json = JSON.parse(body);
    imageApi(json, response);
  });
}

function imageApi(json, response) {
  const imgObj = {};
  const id = json.results[0].listing_id;
  request.get(`https://openapi.etsy.com/v2/listings/${id}/images?api_key=cpi30a11murm055e04i2s9w0`, (err, res, body) => {
    if (err) {
      process.stdout.write(`error ${err.message}`);
    }
    const img = JSON.parse(body);
    imgObj[0] = [img.results[0].url_fullxfull];
    listingUrl(json, imgObj, response, cb);
  });
}

module.exports = apiRequest;
