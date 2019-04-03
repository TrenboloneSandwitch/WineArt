class mapHandler {
    constructor(centerPosition) {
        this.centerPosition = centerPosition;
    }

    createMap(infowindow) {
        http.get('../data/mapOptions.json')
            .then(data => {
                const mapOptionsData = data.options;
                // Načte a vytvoří stylovanou mapu uloženou v JSONu
                const styledMapType = new google.maps.StyledMapType(mapOptionsData, {
                    name: "Styled Map"
                });

                const mapOption = {
                    zoom: 16,
                    center: this.centerPosition,
                    disableDefaultUI: true,
                    gestureHandling: "none",
                    zoomControl: false
                };

                // The map, centered at WineArt
                const map = new google.maps.Map(document.getElementById("mapID"), mapOption);
                map.mapTypes.set("styled_map", styledMapType);
                map.setMapTypeId("styled_map");
                // The marker, positioned at WineArt
                const marker = this.createMarker(this.centerPosition, map, "img/wine-locator.png", "WA Wine & Art s.r.o.");
                const milPos = {
                    lat: 49.4574,
                    lng: 14.3633936
                };
                this.createMarker(milPos, map, "img/mil_mark1.png", "Město kde se nacházíme")

                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });
            })
            .catch(err => console.log(err));
    }

    createMarker(position, myMap, img, myTitle) {
        const markerOption = {
            position: position,
            map: myMap,
            icon: img,
            title: myTitle
        };
        const marker = new google.maps.Marker(markerOption);
        return marker;
    }

    createInfoWindow() {
        //info window contet
        const contentString =
            `
          <div style="width:auto; height:auto; background-color: white;text-align: center;">
            <h3 style="font-weight: 100;">WA Wine & ART s.r.o.</h3>
            <p style="text-align: left">
              Zde sídlíme, budeme moc rádi, když nás přijedete navštívit na jednu z námi konaných degustací.
            </p>
            <p style="text-align: left; font-weight:500;">
              Masarykova 577, 399 01 Milevsko
            </p>
            
            <button onclick="location.href='https://goo.gl/maps/Kbaabi23GLo'" style="cursor:pointer;width: auto;font-size: 1.5em;font-weight: 100;padding: auto;border: 2px solid #154070;background-color: #154070;color: #cdb877;;">
              NAVIGOVAT
            </button>
          </div>`;

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        return infowindow;
    }
}