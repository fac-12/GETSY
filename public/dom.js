var submitbutton = document.getElementById('submitbutton');
var image = document.getElementById('image');
var inputfield = document.getElementById('inputfield');

submitbutton.addEventListener('click', onSubmit, false);

function isValid(search){
  if (/^[a-z ]+$/i.test(search)){
    const searchTerm = search.split(" ").join("+");
    apiCall(searchTerm)
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

function noItemsFound(res){
  alert(res);
}
