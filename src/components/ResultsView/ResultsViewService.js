// import * as Scroll from 'react-scroll';
// import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';
const google = window.google;

export function initMap (mapDiv, userLocation) {
        this.map = new google.maps.Map(mapDiv, {
            zoom: 10,
            center: {lat: userLocation.lat, lng: userLocation.lng},
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
          
          });
            mapDiv.style.right = "0vw";
            mapDiv.style.top = "0vh";
            // mapDiv.style.height = '80vh';
            // mapDiv.style.window = '80vw';
    
    }
    export function setMarkers (mapDiv, array) {
       return array.forEach((cur, ind) => {
            var self = this;
            console.log(cur)
            var marker = new google.maps.Marker({
                map: mapDiv,
                position: {lat:cur.location.lat, lng:cur.location.lng},
            })
           
        })
    }
