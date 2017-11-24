var submitbutton = document.getElementById('submitbutton');
var image = document.getElementById('image');
var inputfield = document.getElementById('inputfield');

submitbutton.addEventListener('click', onSubmit, false);

function isValid(search){
  if (/^[a-z ]+$/i.test(search)){
    const searchTerm = search.split(" ").join("+");
    apiCall(searchTerm);
    inputfield.value = "";
  } else{
    throw new Error('Please enter letters only')
  }
}

function onSubmit(event) {
  event.preventDefault();
  const search = inputfield.value;

  try {
    isValid(search);
  } catch (err) {
    alert(err);
  }
}

function apiCall(searchTerm) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      console.log(xhr.responseText);
      var resultObj = JSON.parse(xhr.responseText);
      updateDom(resultObj);
    } else if (this.readyState ==4 && this.status == 404){
      noItemsFound(xhr.responseText);
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
  para.className = 'listingTitle';
  para.target="_blank";
  const price = document.createElement('p');
  const infoPrice = document.createTextNode(listingPrice);
  price.appendChild(infoPrice);
  divElement.appendChild(price);
}


function noItemsFound(res){
  alert(res);
}

