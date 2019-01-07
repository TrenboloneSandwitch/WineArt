const http = new easyHttp();

document.addEventListener('DOMContentLoaded', initMap);


/* //JSON handling
const requestURL = 'winesData.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
  const winesJSON = request.response;
  fillWines(winesJSON, 'pinot');
  fillWines(winesJSON, 'collet');
} */

$(document).ready(function () {
  handleNavbar();
  getHeight();
  smoothScroll();
});

window.onresize = function () {
  getHeight(), initMap();
};
window.onscroll = function () {
  handleNavbar();
};

function smoothScroll() {
  // Add smooth scrolling on all links inside the navbar
  $(".smooth-scroll a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate({
          scrollTop: $(hash).offset().top
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
}

function handleNavbar() {
  var navbar = getElmntByID("navbar-main");
  var navbarBrand = getElmntByID("navbar-brand-id");
  if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
    navbar.style.backgroundColor = "#cdb877";
    navbar.style.transition = "all 0.5s";
    navbarBrand.style.color = "white";

    if (window.innerWidth > 310) { //CHANGE BRAND TEXT DEPENDS ON WINDOW WIDTH
      navbarBrand.innerHTML = "Wine & Art";
    } else {
      if (window.innerWidth > 215) {
        navbarBrand.innerHTML = "W&A";
      } else {
        navbarBrand.innerHTML = "";
      }
    }
  } else {
    navbar.style.backgroundColor = "transparent";
    navbarBrand.style.color = "transparent";
  }
}


function logoSwitcher() {
  var menuButton = document.getElementsByClassName("ham4")[0];
  var logo = document.getElementsByClassName("logo")[0];
  var x = 0;
  if (menuButton.classList.contains("active")) {
    logo.classList.remove("slideOutDown");
    logo.classList.add("zoomIn");
    menuButton.classList.remove("active");
  } else {
    logo.classList.add("slideOutDown");
    menuButton.classList.add("active");
  }
}

function getHeight() {
  //handleLogo();
  var heights = {};
  var divs = getElmntByClass("bottle-container-inner");
  var tables = getElmntByClass("wine-table");
  for (let index = 0; index < tables.length; index++) {
    tables[index].style.height = "auto";
  }
  for (let index = 0; index < divs.length; index++) {
    heights[index] = divs[index].offsetHeight;
    tables[index].style.height = heights[index];
  }
}

function getElmntByClass(elm) {
  return document.getElementsByClassName(elm);
}

function getElmntByID(elm) {
  return document.getElementById(elm);
}

function createInfoWindow() {
  //info window contet
  var contentString =
    `
    <div style="width:350px; height:auto; background-color: white;text-align: center;">
      <h3 style="font-weight: 100;">WA Wine & ART s.r.o.</h3>
      <p style="text-align: left">
        Zde sídlíme, budeme moc rádi, když nás přijedete navštívit na jednu z námi konaných degustací.
      </p>
      <p style="text-align: left; font-weight:500;">
        Masarykova 577, 399 01 Milevsko
      </p>
      
      <button onclick="location.href=\'https://goo.gl/maps/Kbaabi23GLo\'" style="cursor:pointer;width: auto;font-size: 1.5em;font-weight: 100;padding: auto;border: 2px solid #154070;background-color: #154070;color: #cdb877;;">
        NAVIGOVAT
      </button>
    </div>`;

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  return infowindow;
}

function createMap(centerPosition, infowindow) {
  this.centerPosition = centerPosition;

  http.get('mapOptions.json')
    .then(data => {
      const mapOptionsData = data.options;

      // Načte a vytvoří stylovanou mapu uloženou v JSONu
      var styledMapType = new google.maps.StyledMapType(mapOptionsData, {
        name: "Styled Map"
      });

      var mapOption = {
        zoom: 16,
        center: centerPosition,
        disableDefaultUI: true,
        gestureHandling: "none",
        zoomControl: false
      };

      // The map, centered at WineArt
      var map = new google.maps.Map(document.getElementById("mapID"), mapOption);

      map.mapTypes.set("styled_map", styledMapType);
      map.setMapTypeId("styled_map");
      // The marker, positioned at WineArt
      var marker = createMarker(centerPosition, map, "img/wine-locator.png", "WA Wine & Art s.r.o.");
      const milPos = {
        lat: 49.4574,
        lng: 14.3633936
      };
      const markerMilevsko = createMarker(milPos, map, "img/mil_mark1.png", "Město kde se nacházíme")

      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
    })
    .catch(err => console.log(err));


}

function createMarker(centerPos, myMap, img, myTitle) {
  var markerOption = {
    position: centerPos,
    map: myMap,
    icon: img,
    title: myTitle
  };
  var marker = new google.maps.Marker(markerOption);

  return marker;
}

function initMap() {
  wineHandler();
  /*  // The location of WineArt
   var wineArtPos = {
     lat: 49.4558978,
     lng: 14.3633936
   };

   createInfoWindow();
   createMap(wineArtPos, createInfoWindow()); */
}

// Make tab-list
function makeList(data) {
  const list = document.querySelector('#pills-tab');

  let html = '';
  (Object.keys(data)).forEach(key => {
    // Make first supplier with active class
    let classes = '';
    if ((data[key].id) === 1) {
      classes = 'nav-link active';
    } else {
      classes = 'nav-link';
    }
    // Create html fo ul
    html += `
    <li class="nav-item aos-init aos-animated" data-aos-once="true" data-aos="fade-down" data-aos-duration="1000">
      <a class="${classes}" id="${data[key].hr}-tab" data-toggle="pill" href="#${data[key].hr}" role="tab" aria-controls="${data[key].hr}" aria-selected="true">${data[key].name}
      </a>
  </li>
    `;
  });

  list.innerHTML = html;
  // console.log(data.suppliers);
}
// Create information about each supplier
function createSupplierInfo(data) {
  const tabContent = document.querySelector('#pills-tabContent');

  let html = '';
  (Object.keys(data)).forEach(key => {
    // Make first supplier with active class
    let classes = '';
    if ((data[key].id) === 1) {
      classes = 'tab-pane fade show active';
    } else {
      classes = 'tab-pane fade';
    }

    const div = document.createElement('div');
    div.classList = `${classes}`;
    div.id = data[key].hr;
    div.setAttribute('role', 'tabpanel');
    div.setAttribute('aria-labelledby', `${data[key].hr}-tab`);

    html = `
      <div class="col-sm-12 ">
        <div class="row text-center">
          <div class="col-sm-12 col-md-4 wineyard-image  aos-init aos-animated" data-aos-once="true" data-aos="fade-down"
          data-aos-duration="1000">
            <img src="${data[key].img}" alt="Logo společnosti ${data[key].name}">
          </div>
          <p class="col-sm-12 col-md-8  wineyard-about-text  aos-init aos-animated" data-aos-once="true" data-aos="fade-up"
          data-aos-duration="1000">${data[key].text}</p>
        </div>
        <div class="row text-center">
          <hr style="margin: 20px auto">
        </div>
        <div class="row justify-content-center row-eq-height" id="${key}-wines">
        </div>
      </div>
    `;
    div.innerHTML = html;
    tabContent.appendChild(div);
  });
}

function wineHandler() {
  const suppliersData = http.get('winesData.1.json')
    .then(data => {

      console.log(data);

      // Make UL
      makeList(data);
      // Create info tab about supplier
      createSupplierInfo(data);
      // Create grid of wines
    })
    .catch(err => console.log(err));
}
/*
function fillWines(json, name) {
  const container = document.querySelector("#"+name+"-wines");

  json[name].forEach(function (obj) {
    const name = obj.name;
    const species = [];
    obj.species.forEach(function (sp) {
      species.push(sp);
    });
    const dosage = obj.dosage;
    const img = obj.img;
    const description = [];
    obj.description.forEach(function (d) {
      description.push(d);
    })
    

    const wine = document.createElement('div');
    wine.className = 'col-sm-12 col-md-6 col-lg-4 bottle-container-outer aos-init aos-animated';
    wine.setAttribute('data-aos-once', 'true');
    wine.setAttribute('data-aos', 'fade-down');
    wine.setAttribute('data-aos-duration', '1000');

    let htmlWine = `
  <div class="  bottle-container-inner">
     <table class="wine-table" class="wine-table">
       <thead>
         <tr>
           <th valign="center" align="center" colspan="2">
             <h3>${name}</h3>
           </th>
       </thead>
       </th>
       <tbody>
         <tr>
           <td valign="top">
             <div class="row" style="margin-top: 20px;">
               <div class="col-3 text-center">
                 <h6>
                   <span class="wine-infos">odrůda:</span>
                 </h6>
               </div>
               <div class="col-9">
                 <h6> ${species[0]},</h6>
               </div>
             </div>`;

    if (species[1] != null) {
      htmlWine += `
      <div class="row">
        <div class="col-3"></div>
        <div class="col-9">
          <h6>${species[1]}</h6>
        </div>
      </div>`;
    }

    if (species[2] != null) {
      htmlWine += `
      <div class="row">
        <div class="col-3"></div>
        <div class="col-9">
          <h6>${species[2]}</h6>
        </div>
      </div>`;
    }

    htmlWine += `
    <div class="row">
      <div class="col-3 text-center">
        <h6>
          <span class="wine-infos">dosage:</span>
        </h6>
      </div>
      <div class="col-9 nadpis6">
        <h6>${dosage} g/l</h6>
      </div>
    </div>
   </div >
   </td >
      <td valign="top" style="padding-top:15px;" rowspan="2">
        <img src="${img}">
   </td>
   </tr>
      <tr>
        <td valign="top">
          <ul style="padding-bottom:10px;">`

    description.forEach(function (li) {
      htmlWine += `<li>${li}</li>`;
    })

    htmlWine += `</ul>
        </td>
      </tr>
   </tbody >
   </table >
 </div > `;

    wine.innerHTML = htmlWine;
    container.appendChild(wine);

  });
}*/