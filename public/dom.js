var submitbutton = document.getElementById('submitbutton');
var image = document.getElementById('image');

submitbutton.addEventListener('click', onSubmit, false);

function onSubmit (event) {
  event.preventDefault();
  const search = inputfield.value;
  const searchTerm = search.split(" ").join("+");
  apiCall(searchTerm);
}

function apiCall(searchTerm) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var resultObj = JSON.parse(xhr.responseText);
      updateDom(resultObj);
    }
  };
xhr.open('GET', '/api' + "=" + searchTerm, true);
xhr.send();
};


function updateDom(resultObj){
  console.log(resultObj);
  var url = resultObj[0][0];
  image.src = url;
  var info = resultObj[0][1]
  var listingUrl = resultObj[0][2];
  var divElement = document.getElementById('listing');
  while(divElement.firstChild){
    divElement.removeChild(divElement.firstChild);
  }
  var para = document.createElement('p');
  var infotext = document.createTextNode(info);
  para.appendChild(infotext);
  divElement.appendChild(para);
  var urlElement = document.getElementById('listingUrl');
  while(urlElement.firstChild){
    urlElement.removeChild(urlElement.firstChild)
  }
  var paraUrl = document.createElement('p');
  var urltext = document.createTextNode(listingUrl);
  paraUrl.appendChild(urltext);
  urlElement.appendChild(paraUrl);
}


// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var name = JSON.parse(xhttp.responseText);
//     var finalNames = name.result;
//     updateDom(finalNames);
//   }
// };
// xhttp.open("GET", "/endpoint" + "=" + inputtext , true);
// xhttp.send(inputtext);
// }, false);
