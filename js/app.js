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
   // initMap();
};

document.addEventListener('DOMContentLoaded', () => {
    chooseLang();
   // initMap();
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


let arrLang = {
    'en': {
        'about' : 'About Us',
        'services' : 'Services',
        'offer' : 'Offer',
        'contact': 'Contact',
        /** ABOUT **/
        'about--text-one':'Our philosophy is to expand among the wine lovers a something little bit different and more exlusive than is the current offer from big producers. Everything is based on personal contact and cooperation. Our motto says that ',
        'about--text-two':'life is too short to drink poor wine!',
        'about--text-three':'We collaborate with small family wineries on a personal basis. As a part of our activities we often organize wine tasting. Both in our place or directly at customers, where we are trying to spread ideas from individual wineris and their approach to the wine production.',
        'about--text-fourth':'If you have any questions or suggestions, don\'t hesitate to ',
        'about--text-fifth':'contact us', 
        'about--text-sixth':'We are looking forward to enjoy a glass of our preeminent products together!'
        /** SERVICES **/
    },
    'cs': {
        'about' : 'O nás',
        'services' : 'Služby',
        'offer' : 'Nabídka',
        'contact': 'Kontakt',
        'about--text-one':'Naší filosofií je dostat mezi milovníky vína něco trochu jiného a exluzivnějšího, než je aktuální nabídka velkoproducentů. Reprezentujeme pouze svá vína na webu nebo eshopu, vše je na bázi osobní spolupráce. Naše motto zní, že ',
        'about--text-two':'život je příliš krátký na to, abychom pili nekvalitní víno.',
        'about--text-three':'Spolupracujeme s malými rodinnými vinařstvími na osobní bázi. V rámci svých aktivit pořádáme často degustace jak u nás, tak přímo u zákazníků, kde se právě snažíme co nejvíce přiblížit myšlenky jednotlivých vinařství a jejich přístup k výrobě vína.',
        'about--text-fourth':'V případě jakýchkoliv dotazů či podmětů nás neváhejte ',
        'about--text-fifth':'kontaktovat', 
        'about--text-sixth':'Těšíme se až si společně vychutnáme sklenku našich prvotřídních produktů!'
    }
}




// LANG

function chooseLang() {
    const lang =localStorage.getItem('language');
    console.log(lang);
    
    if (lang !== null) {
        changeLang(lang);
    }

};

document.querySelectorAll('.translate').forEach((langBTN) => {
    langBTN.addEventListener('click', (e)=>{           
        localStorage.setItem('language', e.target.id);
        changeLang(e.target.id);
        
    });

});




function changeLang(lang) {
    document.querySelectorAll('.lang').forEach((element) => {
        const key = element.getAttribute('lang-key');
        element.innerText = arrLang[lang][key];
    });
}
