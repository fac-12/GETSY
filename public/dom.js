var submitbutton = document.getElementById('submitbutton');
var image = document.getElementById('image');

submitbutton.addEventListener('click', onSubmit, false);

function onSubmit (event) {
  event.preventDefault();
  const search = inputfield.value;
  const searchTerm = search.split(" ").join("+");
  apiCall(searchTerm);
  inputfield.value = "";
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


function updateDom(resultObj) {
  const url = resultObj[0][0];
  image.src = url;
  const info = resultObj[0][1]
  const listingUrl = resultObj[0][2];
  const listingPrice = "£" + resultObj[0][3];
  const divElement = document.getElementById('listing');
  while (divElement.firstChild) {
    divElement.removeChild(divElement.firstChild);
  }
  const para = document.createElement('a');
  const infotext = document.createTextNode(info);
  para.appendChild(infotext);
  divElement.appendChild(para);
  para.href = listingUrl;
  const price = document.createElement('p');
  const infoPrice = document.createTextNode(listingPrice);
  price.appendChild(infoPrice);
  divElement.appendChild(price);
}
