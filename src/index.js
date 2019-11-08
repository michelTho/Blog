'use strict';

var modules = {
    home: require('./javascript/home/home.js'),
    about: require('./javascript/about/about.js'),
    firstGame: require('./javascript/firstGame/firstGame.js'),
    secondGame: require('./javascript/secondGame/secondGame.js'),
    thirdGame: require('./javascript/thirdGame/thirdGame.js')
}

var container = document.getElementById('container');

function route() {
    let hash = window.location.hash;
    hash = hash ? hash : '#home';
    name = hash.slice(1, hash.length);
    let url = `src/templates/${name}.html`;
    fetch(url)
        .then((response) => { return response.text() })
        .then((text) => {
            container.innerHTML = text;
            modules[name].main();
        });
}

window.onhashchange = route;
route();
