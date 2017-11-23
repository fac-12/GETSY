var submitbutton = document.getElementById('submitbutton');

submitbutton.addEventListener('click', onSubmit, false);

function onSubmit (event) {
  event.preventDefault();
  var searchTerm = inputfield.value;
  console.log(searchTerm);
  apiCall(searchTerm);
}

function apiCall(searchTerm){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var resultObj = JSON.parse(xhr.responseText);
      console.log(resultObj);
    }
  };
xhr.open('GET', '/api/', + "=" + searchTerm);
xhr.send();
};



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
