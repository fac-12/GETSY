const request = require('request');

const url = 'https://openapi.etsy.com/v2/listings/active?limit=5&location=United+Kingdom&max_price=10&category=69150359&api_key=cpi30a11murm055e04i2s9w0'

function imageApi(json) {
  for (let i = 0; i < json.results.length; i += 1) {
    const id = json.results[i].listing_id;
    request.get(`https://openapi.etsy.com/v2/listings/${id}/images?api_key=cpi30a11murm055e04i2s9w0`, (err, res, body) => {
      if (err) {
        process.stdout.write(`error ${err.message}`);
      }
      const img = JSON.parse(body);
      console.log(`image ${i} ${img.results[0].url_fullxfull}`);
    })
  }
}

function listingUrl(json) {
  for (let i = 0; i < json.results.length; i += 1) {
    const id = json.results[i].listing_id;
    request.get(`https://openapi.etsy.com/v2/listings/${id}?api_key=cpi30a11murm055e04i2s9w0`, (err, res, body) => {
      if (err) {
        process.stdout.write(`error ${err.message}`);
      }
      const listing = JSON.parse(body);
      console.log(`listing ${i} title ${listing.results[0].title}`);
      console.log(`listing ${i} url ${listing.results[0].url}`)
    });
  }
}

function apiRequest() {
  request.get(url, (err, res, body) => {
    if (err) {
      process.stdout.write(`error ${err.message}`);
    }
    const json = JSON.parse(body);
    imageApi(json);
    listingUrl(json);
    // const itemsObj = {
    //   description1: json.results[0].title,
    //   description2: json.results[1].title,
    // };
    // return itemsObj;
  });
}

module.exports = apiRequest;
