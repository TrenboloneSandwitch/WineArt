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
    const lang = localStorage.getItem('language');
    console.log(lang);

    chooseLang();
    // initMap();
    createWinesGrid(`./data/supliers-${lang}.json`);
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
            ui.createOfferContent(data, _list, _tabContent);
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
        /** ABOUT **/
        'about': 'About Us',
        'about--text-one': 'Our philosophy is to expand something a little bit different and more exclusive among the wine lovers than what the current offer of big producers is. Everything we do is based on personal contact and approach. Our motto is that ',
        'about--text-two': 'life is too short to drink poor quality wine!',
        'about--text-three': 'We collaborate with small family wineries on a personal basis. As a part of our activities we often organize wine tasting events both at our place or directly at customers. We are trying there to spread ideas and thoughts from individual wineries and their approach to the wine production.',
        'about--text-fourth': 'If you have any questions or suggestions, don\'t hesitate to ',
        'about--text-fifth': 'contact us',
        'about--text-sixth': 'We are looking forward to enjoy a glass of our preeminent products together!',
        /** SERVICES **/
        'services': 'Services',
        'services--text-first': 'We offer the best services we possibly can - our purpose is not just to sell wines, but most importantly to make our customers happy and to increase their interest about wine as well. Thanks to that approach you can taste wines directly from ',
        'services--text-second': 'winemakers, who give 100% percent effort to their work ',
        'services--text-third': 'and that is the reason why their products have such a unique and outstanding character.',
        'services--text-fourth': ' Bottles are carefully stored, so we can guarantee the unprecedented quality, ',
        'services--text-fifth': 'besides we taste all of our products, several times a year. Based on that, you don\'t have to be afraid to ask for any help or recommendation. ',
        'services--text-sixth': 'Are you trying to come up with a special gift for your friends or loved ones? Combine one of our products with some delicacy of your choice and feel the luxury! It is an ideal birthday or wedding gift, that has to please everyone!',
        'services--deg-one': 'Wine Tasting',
        'services--deg-two': 'We organize wine tasting events with an expert commentary on a regular basis. Also all tasted bottles can be ordered directly at the event.',
        'services--vis-one': 'Visting The Vineyards',
        'services--vis-two': 'We are able to provide a tour of the vineyards on demand. It could be either one of our partners in Moravia or exclusively in the Champagne region as well.',
        'services--rec-one': 'Recommendation',
        'services--rec-two': 'It will be our pleasure to give you guidance whether you want to choose the right bottle to purchase or make a trip to the vineyards. Our main goal is your absolute happiness and enrichment of your knowledge.',
        'services--sell-one': 'Sale',
        'services--sell-two': 'We offer only the products with best customer experiences which are perfectly and carefully stored. Of course there is a personal approach for every purchase. Contact us and let us care.',
        /** Offer */
        'offer': 'Offer',
        'contact': 'Contact',
        'contact--text-one': 'Contact us by phone...',
        'contact--text-two': '...or use our contact form directly and we will contact you!',
        'contact--button-send': 'SEND',
        'map--heading': 'Where to find us?'

    },
    'cs': {
        /** About */
        'about': 'O nás',
        'about--text-one': 'Naší filosofií je dostat mezi milovníky vína něco trochu jiného a exluzivnějšího, než je aktuální nabídka velkoproducentů. Reprezentujeme pouze svá vína na webu nebo eshopu, vše je na bázi osobní spolupráce. Naše motto zní, že ',
        'about--text-two': 'život je příliš krátký na to, abychom pili nekvalitní víno.',
        'about--text-three': 'Spolupracujeme s malými rodinnými vinařstvími na osobní bázi. V rámci svých aktivit pořádáme často degustace jak u nás, tak přímo u zákazníků, kde se právě snažíme co nejvíce přiblížit myšlenky jednotlivých vinařství a jejich přístup k výrobě vína.',
        'about--text-fourth': 'V případě jakýchkoliv dotazů či podmětů nás neváhejte ',
        'about--text-fifth': 'kontaktovat',
        'about--text-sixth': 'Těšíme se až si společně vychutnáme sklenku našich prvotřídních produktů!',
        /** Services */
        'services': 'Služby',
        'services--text-first': 'Nabízíme jedinečné služby ve světě vína – smyslem není pouze prodej vína, ale hlavně spokojenost zákazníků a jejich rostoucí zájem o víno. Díky tomu můžete ochutnat vína přímo ',
        'services--text-second': 'od vinařů, kteří jeho výrobě dávají 100% úsilí',
        'services--text-third': ', a tím víno získává jedinečný charakter.',
        'services--text-fourth': 'Za kvalitou pečlivě uskladněných lahví si stojíme',
        'services--text-fifth': 'a vše několikrát ročně ochutnáváme, takže se nemusíte bát nechat si od nás poradit.',
        'services--text-sixth': 'Možná právě vymýšlíte originální dar pro přátelé či vaše blízké? Proč ne právě vínko s nějakou delikatesou! Ideální narozeninový nebo svatební dar, který musí potěšit každého!',
        /** icon description */
        'services--deg-one': 'Degustace',
        'services--deg-two': 'Pravidelně pořádáme soukromé degustace s odborným výkladem. Všechny ochutnané láhve je také možné na místě přímo objednat.',
        'services--vis-one': 'Návštěva vinic',
        'services--vis-two': 'Na přání jsme Vám schopni zajistit návštěvu u vinaře. Ať již u našich partnerů na Moravě, tak v i v oblasti Champagne.',
        'services--rec-one': 'Doporučení',
        'services--rec-two': 'Rádi poradíme ať již s výběrem té správné láhve nebo s výletem k vinaři, tak abyste si ho maximálně užili a obohatili svoje znalosti.',
        'services--sell-one': 'Prodej',
        'services--sell-two': 'Nabízíme pouze námi odzkoušené a pečlivě uskladněné láhve. Samozřejmostí je osobní přístup při každém nákupu. Ozvěte se a nechte starost na nás.',
        /** Offer */
        'offer': 'Nabídka',
        /** Contact */
        'contact': 'Kontakt',
        'contact--text-one': 'Kontaktujte nás telefonicky...',
        'contact--text-two': '...nebo využijte přímo našeho kontaktního formuláře a my se ozveme Vám!',
        'contact--button-send': 'ODESLAT',
        'map--heading': 'Kde Nás Najdete?'
    }
}




// LANG

function chooseLang() {
    const lang = localStorage.getItem('language');
    console.log(lang);

    (lang !== null) ? changeLang(lang): changeLang('cs');

};

document.querySelectorAll('.translate').forEach((langBTN) => {
    langBTN.addEventListener('click', (e) => {
        const lang = e.target.id;
        localStorage.setItem('language', lang);
        changeLang(lang);
        createWinesGrid(`./data/supliers-${lang}.json`);

    });

});




function changeLang(lang) {
    document.querySelectorAll('.lang').forEach((element) => {
        const key = element.getAttribute('lang-key');
        element.innerText = arrLang[lang][key];
       // createWinesGrid(`./data/supliers-${lang}.json`);
    });


    const placholders = {
        'en' : ['John Doe', 'Subject', 'your@e-mail.com', 'Current Year', 'Text of your message...'],
        'cs' : ['Karel Novák', 'Předmět', 'vas@e-mail.cz', 'Aktuální Rok', 'Text Vaší zprávy...']
    }
    
    document.querySelectorAll('.form-grp').forEach((formElement, index) => {
        formElement.setAttribute('placeholder', placholders[lang][index]);
    });

}