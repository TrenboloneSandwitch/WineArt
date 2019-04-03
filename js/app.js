// Init variables
const _navbarButton = document.querySelector('#navbarBTN');
const _navbar = document.querySelector('#navbar-main');
const _navbarBrand = document.querySelector('#navbar-brand-id');
const _menuButton = document.getElementsByClassName("ham4")[0];
const _mainLogo = document.getElementsByClassName("logo")[0];
const _list = document.querySelector('#pills-tab');
const _tabContent = document.querySelector('#pills-tabContent');
const wineArtPos = {
    lat: 49.4558978,
    lng: 14.3633936
};

// INIT CLASSES
const ui = new UiHandler();
const http = new easyHttp();
const map = new mapHandler(wineArtPos);

// Event listeners
_navbarButton.addEventListener('click', toggleMainLogoAndMenuIcon);

window.onscroll = () => {
    ui.toggleNavbarColor(_navbar, _navbarBrand);
};

window.onresize = () => {
    ui.correctProportions();
    ui.toggleNavbarColor(_navbar, _navbarBrand);
    initMap();
};

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    createWinesGrid('./data/supliers.json');
    ui.smoothScroll();
});

// Toggle main logo and menu icon
function toggleMainLogoAndMenuIcon() {
    ui.toggleMainLogoAndMenuIcon(_mainLogo, _menuButton);
}

// Create offer page, load data from json and insert them
function createWinesGrid(url) {
    http.get(url)
        .then(data => {
            ui.makeList(data, _list);
            ui.createSupplierInfo(data, _tabContent);
            ui.createWinesGrid(data);
            ui.correctProportions();
        })
        .catch(err => console.log(err));
}

function initMap() {
    // The location of WineArt
    map.createInfoWindow();
    map.createMap(map.createInfoWindow());
}
