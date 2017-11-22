const request = require('request');

const url = 'https://openapi.etsy.com/v2/listings/active?limit=5&location=United+Kingdom&max_price=10&category=69150359&api_key=cpi30a11murm055e04i2s9w0'


function apiRequest() {
  request.get(url, (err, res, body) => {
    if (err) {
      process.stdout.write(`error ${err.message}`);
    }
    const json = JSON.parse(body);
    console.log(json);
  });
}

// const image
//
// function imageApi(){
//
// }

apiRequest();
