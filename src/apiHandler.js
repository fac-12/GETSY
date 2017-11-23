const request = require('request');
const apiKey = require('./key')

const url = `https://openapi.etsy.com/v2/listings/active?limit=2&location=United+Kingdom&min_price=1000&category=69150359&api_key=${apiKey}`

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
  function listingCall(json, imgObj, response, cb, i) {
    const id = json.results[i].listing_id;
    request.get(`https://openapi.etsy.com/v2/listings/${id}?api_key=${apiKey}`, (err, res, body) => {
      if (err) {
        process.stdout.write(`error ${err.message}`);
      }
      const listing = JSON.parse(body);
      const title = listing.results[0].title;
      const listingUrl = listing.results[0].url;
      imgObj[i].push(title);
      imgObj[i].push(listingUrl);
    });
  } let count = 0;
  for (let i = 0; i < json.results.length; i += 1) {
    listingCall(json, imgObj, response, cb, i)
    count += 1;
    if (count === 2) {
      cb(imgObj, response);
    }
  }
}

function apiRequest(response) {
  request.get(url, (err, res, body) => {
    if (err) {
      process.stdout.write(`error ${err.message}`);
    }
    const json = JSON.parse(body);
    imageApi(json, response);
  });
}

function imageApi(json, response) {
  const imgObj = {};
  for (let i = 0; i < json.results.length; i += 1) {
    const id = json.results[i].listing_id;
    request.get(`https://openapi.etsy.com/v2/listings/${id}/images?api_key=cpi30a11murm055e04i2s9w0`, (err, res, body) => {
      if (err) {
        process.stdout.write(`error ${err.message}`);
      }
      const img = JSON.parse(body);
      // console.log(`image ${i} ${img.results[0].url_fullxfull}`);
      imgObj[i] = [img.results[0].url_fullxfull];
      listingUrl(json, imgObj, response, cb);
    });
  }
}

module.exports = apiRequest;
