// import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
const google = window.google;
export const mapOptions = {
    zoom: 10,
    styles: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#365DD6"
              },
              {
                  "visibility": "on"
              }
          ]
      }
  ]
  }
export function initMapWithHooks(mapDiv, userLocation) {
    mapDiv.style.right = "0vw";
    mapDiv.style.top = "0vh";
    new google.maps.Map(mapDiv, {...mapOptions, center: {lat: userLocation.lat, lng: userLocation.lng}})
}
export function initMap (mapDiv, userLocation) {
        this.map = new google.maps.Map(mapDiv, {...mapOptions, center: {lat: userLocation.lat, lng: userLocation.lng}});
            mapDiv.style.right = "0vw";
            mapDiv.style.top = "0vh";
            // mapDiv.style.height = '80vh';
            // mapDiv.style.window = '80vw';
    
    }
    export function setMarkers (mapDiv, array) {
        let scrollevents = scroller
       return array.forEach((cur, ind) => {
            var self = this;
            var marker = new google.maps.Marker({
                map: mapDiv,
                position: {lat:cur.lat, lng:cur.lng},
                id: cur.id
            })
            let infowindow = new google.maps.InfoWindow;
            let infowindowContent = `
                <div> <a class="infowindow-link" href="https://www.google.com/maps/search/?api=1&query=${cur.restaurant.name.split(' ').join('+')}&query_place_id=${cur.placeID}" >${cur.restaurant.name} for ${cur.title} </a></div>
            `
            infowindow.setContent(infowindowContent);
            marker.addListener('mouseover', function() {
                infowindow.open(self.map, marker)
            })
            marker.addListener('mouseout', function() {
                infowindow.close(self.map, marker)
            })
            marker.addListener('click', function() {
                self.map.setZoom(15)
                self.map.setCenter({
                    lat: cur.lat,
                    lng: cur.lng
                })
                scrollevents.scrollTo(marker.id , {
                    duration:800,
                    delay: 0,
                    smooth: true,
                    containerId: 'deal-list',
                    offset: -100
                })
                // function to set selected deal in store
                let selected = self.props.store.deals.find(x => x.id == marker.id)
               self.props.store.setSelected(selected)
            })
        })
    }
    export function updateDeals(arr, userLoc) {
        console.log(userLoc)
        let newDeals = arr.map((cur, ind) => {
            return new Promise (function(resolve, reject) {
                var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [{lat: userLoc.latitude, lng: userLoc.longitude}],
                            destinations: [cur.location],
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: 'DRIVING'
                        }, (response, status) => {
                            if (status == 'OK') {
                                cur.distance = response.rows[0].elements[0].distance.text;
                            }
                        }
                    ) 
            }).then((obj) => {
                cur.distance = obj
                console.log(cur)
                return cur;
            })
                console.log(cur)
                return cur;
        })
        Promise.all(newDeals).then(results => results)
    }
