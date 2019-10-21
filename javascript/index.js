var container = document.getElementById('container');

console.log(window.location.hash);

function route(){
    let hash = window.location.hash;
    hash = hash.slice(1, hash.length);
    let url = `../templates/${hash}.html`;
    console.log(url);
    fetch(url).then((response) => {return response.text()}).then((text) => {container.innerHTML = text});
}

window.onhashchange = route;
route();