var container = document.getElementById('container');
var url = 'templates/home.html'
fetch(url).then((response) => {return response.text()}).then((text) => {container.innerHTML = text});