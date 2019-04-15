class UiHandler {
    toggleMainLogoAndMenuIcon(mainLogo, menuButton) {
        mainLogo.classList.toggle('slideOutDown');
        mainLogo.classList.toggle('zoomIn');
        menuButton.classList.toggle('active');
    }

    toggleNavbarColor(navbar, navbarBrand) {
        let cols;
        if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
            cols = ['#cdb877', 'white'];
            navbarBrand.innerHTML = this.customizeBrandTextForWindowWidth();
        } else {
            cols = ['transparent', 'transparent'];
        }
        navbar.style.backgroundColor = cols[0];
        navbarBrand.style.color = cols[1];
    }

    customizeBrandTextForWindowWidth() {
        let brandText;
        if (window.innerWidth > 310) { //CHANGE BRAND TEXT DEPENDS ON WINDOW WIDTH
            brandText = "Wine & Art";
        } else {
            (window.innerWidth > 215) ? brandText = "W&A": brandText = "";
        }
        return brandText;
    }

    smoothScroll() {
        $(".smooth-scroll a").on("click", function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                $("html, body").animate({
                    scrollTop: $(hash).offset().top
                }, 800, () => window.location.hash = hash);
            }
        });
    }

    createOfferContent(data, _list, _tabContent) {
        this.makeList(data, _list);
        this.createSupplierInfo(data, _tabContent);        
        this.createWinesGrid(data);
        this.correctProportions();
    }

    makeList(data, list) {
        
        let html = '';
        (Object.keys(data)).forEach(key => {
            // Create html fo ul
            html += `
            <li class="nav-item aos-init aos-animated m-1" data-aos-once="true" data-aos="fade-down" data-aos-duration="1000">
            <a class="nav-link js-tilt" id="${data[key].hr}-tab" data-toggle="pill" href="#${data[key].hr}" role="tab"
             aria-controls="${data[key].hr}" aria-selected="true" >
             <span class="tilti-img">
                 <img alt="${data[key].name}" src="${data[key].img}">
                </span>
                <span class="tilt-inner">
                        <span class="supplier__nationality">
                                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6IzQxNDc5QjsiIGQ9Ik0xNzAuNjY3LDQyMy43MjFIOC44MjhjLTQuODc1LDAtOC44MjgtMy45NTMtOC44MjgtOC44MjhWOTcuMWMwLTQuODc1LDMuOTUzLTguODI4LDguODI4LTguODI4ICBoMTYxLjgzOVY0MjMuNzIxeiIvPgo8cmVjdCB4PSIxNzAuNjciIHk9Ijg4LjI3NyIgc3R5bGU9ImZpbGw6I0Y1RjVGNTsiIHdpZHRoPSIxNzAuNjciIGhlaWdodD0iMzM1LjQ1Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRjRCNTU7IiBkPSJNNTAzLjE3Miw0MjMuNzIxSDM0MS4zMzNWODguMjczaDE2MS44MzljNC44NzUsMCw4LjgyOCwzLjk1Myw4LjgyOCw4LjgyOHYzMTcuNzkzICBDNTEyLDQxOS43Nyw1MDguMDQ3LDQyMy43MjEsNTAzLjE3Miw0MjMuNzIxeiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                        </span>
                    <span class="supplier__name">${data[key].name}</span>
                    
                </span>							 
            </a>
        </li>
          `;
        });
        list.innerHTML = html;
        VanillaTilt.init(document.querySelectorAll('.js-tilt'), {
            max: 25,
		    speed: 10000
        });
    }

    createElement(type, classes, id) {
        const elm = document.createElement(type);
        if (classes !== undefined) elm.classList = `${classes}`;
        if (id !== undefined) elm.id = id;
        return elm;
    }

    createSupplierInfo(data, tabContent) {
        tabContent.innerHTML = '';
        
        let html = '';
        (Object.keys(data)).forEach(key => {
            const classes = 'tab-pane fade';

            const div = this.createElement('div', classes, data[key].hr);
            div.setAttribute('role', 'tabpanel');
            div.setAttribute('aria-labelledby', `${data[key].hr}-tab`);

            html = `
            <div class="col-sm-12 ">
              <div class="row text-center">
                <div class="col-sm-12 col-md-4 wineyard-image  aos-init aos-animated" data-aos-once="true" data-aos="fade-down"
                data-aos-duration="1000">
                  <img src="${data[key].logo}" alt="Logo společnosti ${data[key].name}">
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


    createWinesGrid(data) {
        // Loop through the all supliers
        (Object.keys(data)).forEach(key => {
            // Find div where to add which is different for all suppliers
            const container = document.querySelector(`#${key}-wines`);
            // Loop through all bottles of each supllier
            (data[key].bottles).forEach(bottle => {
                // Load all information about wine
                const name = bottle.name;
                const species = [];
                bottle.species.forEach((sp) => {
                    species.push(sp)
                });
                const dosage = bottle.dosage;
                const img = bottle.img;
                const description = [];
                bottle.description.forEach((d) => {
                    description.push(d)
                });

                const wineDiv = this.createElement('div', 'col-sm-12 col-md-6 col-lg-4 bottle-container-outer aos-init aos-animated', undefined)
                wineDiv.setAttribute('data-aos-once', 'true');
                wineDiv.setAttribute('data-aos', 'fade-down');
                wineDiv.setAttribute('data-aos-duration', '1000');

                let htmlWine = `
        <div class="bottle-container-inner">
           <table class="wine-table" class="wine-table">
             <thead class="wineHead">
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
                    for (let i = 1; i < species.length; i++) {
                        htmlWine += `
            <div class="row">
              <div class="col-3"></div>
              <div class="col-9">
                <h6>${species[i]}</h6>
              </div>
            </div>`;
                    }
                };

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
            <td valign="top" class="imagetd" rowspan="2">
              <img src="${img}">
         </td>
         </tr>
            <tr>
              <td valign="top">
                <ul style="padding-bottom:10px;">`

                description.forEach((li) => {
                    htmlWine += `<li>${li}</li>`;
                });

                htmlWine += `</ul>
              </td>
            </tr>
         </tbody >
         </table >
       </div > `;

                wineDiv.innerHTML = htmlWine;
                container.appendChild(wineDiv);
                
            });
        });
    }

    correctProportions() {
        const heights = [];
        const divs = document.querySelector('.bottle-container-inner');
        const tables = document.querySelector('.wine-table');

        for (let index = 0; index < tables.length; index++) {
            tables[index].style.height = "auto";
        }
        for (let index = 0; index < divs.length; index++) {
            heights[index] = divs[index].height;
            tables[index].style.height = heights[index];
        }
    }

}