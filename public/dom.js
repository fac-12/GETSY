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
    if (this.readyState == 4 && this.status == 200) {
      var resultObj = JSON.parse(xhr.responseText);
      updateDom(resultObj);
    }
  };
xhr.open('GET', '/api' + "=" + searchTerm, true);
xhr.send();
};


function updateDom(resultObj){
  var url = resultObj[0][0];
  image.src = url;
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
