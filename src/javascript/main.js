'use strict';

var container = document.getElementById('container');

function loadJavascript(name) {
    import (`./${name}/${name}.js`).then((module) => {module.main()});
}

function route() {
    let hash = window.location.hash;
    hash = hash ? hash : '#home';
    name = hash.slice(1, hash.length);
    let url = `../templates/${name}.html`;
    fetch(url)
        .then((response) => { return response.text() })
        .then((text) => { 
            container.innerHTML = text;
            loadJavascript(name);
        });
}

window.onhashchange = route;
route();
