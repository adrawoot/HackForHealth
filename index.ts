//import { createInfoWindow } from './info';
let map: google.maps.Map;
let featureLayer;
let infoWindow;
let lastInteractedFeatureIds = [];
let lastClickedFeatureIds = [];

function handleClick(/* MouseEvent */ e) {
  lastClickedFeatureIds = e.features.map(f => f.placeId);
  lastInteractedFeatureIds = [];
  featureLayer.style = applyStyle;
  createInfoWindow(e);
}

function handleMouseMove(/* MouseEvent */ e) {
  lastInteractedFeatureIds = e.features.map(f => f.placeId);
  featureLayer.style = applyStyle;
}

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

  map = new Map(document.getElementById('map') as HTMLElement, {
    center: {lat: 39.23, lng: -105.73},
    zoom: 5,
    // In the cloud console, configure your Map ID with a style that enables the
    // 'Administrative Area Level 2' Data Driven Styling type.
    mapId: 'c58fbe5558f591c8', // Substitute your own map ID.
    mapTypeControl: false,
  });

  // Add the feature layer.
  //@ts-ignore
  featureLayer = map.getFeatureLayer('COUNTRY');

  // Add the event listeners for the feature layer.
  featureLayer.addListener('click', handleClick);
  featureLayer.addListener('mousemove', handleMouseMove);

  // Map event listener.
  map.addListener('mousemove', () => {
    // If the map gets a mousemove, that means there are no feature layers
    // with listeners registered under the mouse, so we clear the last
    // interacted feature ids.
    if (lastInteractedFeatureIds?.length) {
      lastInteractedFeatureIds = [];
      featureLayer.style = applyStyle;
    }
  });

  // Create the infowindow.
  infoWindow = new InfoWindow({});
  // Apply style on load, to enable clicking.
  featureLayer.style = applyStyle;
}

// Helper function to create an info window.
function updateInfoWindow(content, center) {
  infoWindow.setContent(content);
  infoWindow.setPosition(center);
  infoWindow.open({
    map,
    shouldFocus: false,
  });
}

// Helper function for the infowindow.
export async function createInfoWindow(event) {
  let feature = event.features[0];
  if (!feature.placeId) return;

  // Update the infowindow.
  const place = await feature.fetchPlace();
  let content = '<b>' + place.displayName + '</b>' + '<br><br>Routine Vaccines:' +
  '<ul>' +
      '<li>Chickenpox (Varicella)</li>' +
      '<li>Diphtheria-Tetanus-Pertussis</li>' +
      '<li>Flu (Influenza)</li>' +
      '<li>Measles-Mumps-Rubella (MMR)</li>' +
      '<li>Polio</li>' +
      '<li>Shingles</li>' +
  '</ul>';
  if(place.displayName == "Canada" || place.displayName == "Mexico" || place.displayName == "Greenland") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Brazil" || place.displayName == "Venezuela" || place.displayName == "Colombia" || place.displayName == "Ecuador" ||  place.displayName == "Peru" ||  place.displayName == "Bolivia" ||  place.displayName == "") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +
        '<lin>Malaria</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Syria" ||  place.displayName == "Iraq") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<lin>Cholera</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Saudi Arabia" ||  place.displayName == "Iraq") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<lin>Malaria</li>' +
        '<li>Meningitis (Meningococcal disease)</li>' +
        '<li>Yellow Fever</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Haiti" || place.displayName == "Dominican Republic") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +
        '<lin>Malaria</li>' +
        '<lin>Cholera</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Cuba" || place.displayName == "Puerto Rico" || place.displayName == "Chile" || place.displayName == "Uruguay" || place.displayName == "Uzbekistan" || place.displayName == "Turkmenistan") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Ireland" || place.displayName == "Spain" || place.displayName == "Portugal") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "United Kingdom" || place.displayName == "France" || place.displayName == "Germany" || place.displayName == "Belgium" || place.displayName == "Netherlands" || place.displayName == "Switzerland" || place.displayName == "Italy" || place.displayName == "Slovenia" || place.displayName == "Czechia" || place.displayName == "Austria" || place.displayName == "Croatia" || place.displayName == "Bosnia and Herzegovina") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Tick-borne Encephalitis</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Argentina" || place.displayName == "Paraguay" || place.displayName == "Chile" || place.displayName == "Singapore"|| place.displayName == "Iran" || place.displayName == "Oman" || place.displayName == "United Arab Emirates" || place.displayName == "Columbia") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +
        '<li>Rabies</li>' +
        '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "India"  || place.displayName == "Bangladesh"|| place.displayName == "Thailand" ||place.displayName == "Philippines"||place.displayName == "Malaysia" ||place.displayName == "Nepal"  ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "Pakistan" || place.displayName == "Indonesia") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Polio</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }

else if(place.displayName == "South Korea") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
         '<li>Tick-borne Encephalitis</li>' +
         '<li>Typhoid</li>' +
         '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "Russia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Tick-borne Encephalitis</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "Sri Lanka" || place.displayName == "Japan" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "China" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Tick-borne Encephalitis</li>' +
         '<li>Typhoid</li>' +
         '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "Vietnam" || place.displayName == "Laos" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
         '<li>Typhoid</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Kazakhstan" || place.displayName == "Mongolia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Polio</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
         '<li>Typhoid</li>' +
         '<li>Cholera</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Yemen" || place.displayName == "" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Polio</li>' +
        '<li>Measles</li>' +
        '<li>Malaria</li>' +
        '<li>Rabies</li>' +
         '<li>Typhoid</li>' +
         '<li>Cholera</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Kazakhstan" || place.displayName == "Mongolia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Tick-borne Encephalitis</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
         '<li>Typhoid</li>' +
    '</ul>' +
'</span>';
  }
  else if(place.displayName == "Algeria" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Polio</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Egypt" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Polio</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Madagascar" ||place.displayName == "Zambia") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Polio</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }




else if(place.displayName == "Gabon" ||place.displayName == "Rwanda"||place.displayName == "Sierra Leone" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Ethiopia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Meningitis (Meningococcal disease)</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Côte d'Ivoire (Ivory Coast)" ||place.displayName == "Uganda") {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Meningitis (Meningococcal disease)</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "South Africa"|| place.displayName == "Zimbabwe" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }


else if(place.displayName == "Mali" || place.displayName == "Niger"||place.displayName == "Senegal" ||place.displayName == "Somalia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Meningitis (Meningococcal disease)</li>' +
        '<li>Polio</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }


else if(place.displayName == "Ghana" ||place.displayName == "Kenya" ||place.displayName == "Sudan"  ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
  '<li>Cholera</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Malaria</li>' +
        '<li>Measles</li>' +
        '<li>Meningitis (Meningococcal disease)</li>' +
        '<li>Polio</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +
        '<li>Yellow Fever</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Libya" || place.displayName == "Morocco"||place.displayName == "Tunisia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Typhoid</li>' +


    '</ul>' +
'</span>';
  }
else if(place.displayName == "Toga" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis A</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Measles</li>' +
        '<li>Typhoid</li>' +


    '</ul>' +
'</span>';
  }



  else {
    content += "N/A"
  }

  updateInfoWindow(content, event.latLng);

}



// Define styles.
// Stroke and fill with minimum opacity value.
const styleDefault = {
  strokeColor: '#8b0000',
  strokeOpacity: 1.0,
  strokeWeight: 1.0,
  fillColor: 'white',
  fillOpacity: 0.1,  // Polygons must be visible to receive events.
};
// Style for the clicked polygon.
const styleClicked = {
  ...styleDefault,
  fillColor: '#8b0000',
  fillOpacity: 0.5,
};
// Style for polygon on mouse move.
const styleMouseMove = {
  ...styleDefault,
  strokeWeight: 4.0,
};

// Apply styles using a feature style function.
function applyStyle(/* FeatureStyleFunctionOptions */ params) {
  const placeId = params.feature.placeId;
  //@ts-ignore
  if (lastClickedFeatureIds.includes(placeId)) {
    return styleClicked;
  }
  //@ts-ignore
  if (lastInteractedFeatureIds.includes(placeId)) {
    return styleMouseMove;
  }
  return styleDefault;
}



initMap();