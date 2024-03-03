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
    zoom: 3,
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

// Define styles.
// Stroke and fill with minimum opacity value.
const styleDefault = {
  strokeColor: '#43466c',
  strokeOpacity: 1.0,
  strokeWeight: 1.0,
  fillColor: 'white',
  fillOpacity: 0.1,  // Polygons must be visible to receive events.
};
// Style for the clicked polygon.
const styleClicked = {
  ...styleDefault,
  fillColor: '#43466c',
  fillOpacity: 0.5,
};
// Style for polygon on mouse move.
const styleMouseMove = {
  ...styleDefault,
  strokeWeight: 0.5,
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
  else if(place.displayName == "Brazil" || place.displayName == "Venezuela" || place.displayName == "Mauritania" || place.displayName == "Panama" || place.displayName == "Colombia" ||place.displayName == "Aruba" || place.displayName == "Ecuador" ||  place.displayName == "Peru" ||  place.displayName == "Bolivia" ||  place.displayName == "Guatemala" || place.displayName == "Honduras" || place.displayName == "Costa Rica" || place.displayName == "Nicaragua") {
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
  else if(place.displayName == "Cuba" || place.displayName == "Puerto Rico" ||place.displayName == "Cayman Islands" ||place.displayName == "Jamaica" ||place.displayName == "Turks and Caicos Islands" ||place.displayName == "The Bahamas"||place.displayName == "Belize" || place.displayName == "Chile" || place.displayName == "Uruguay" || place.displayName == "Uzbekistan" ||place.displayName == "Kyrgyzstan" ||place.displayName == "Tajikistan" || place.displayName == "Turkmenistan") {
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
  else if(place.displayName == "Argentina" || place.displayName == "French Polynesia"|| place.displayName == "Soloman Islands"  ||place.displayName == "Cook Islands" ||place.displayName == "Tonga" ||place.displayName == "Fiji" || place.displayName == "Samoa" || place.displayName == "Paraguay" || place.displayName == "Chile" || place.displayName == "Singapore"|| place.displayName == "Iran" || place.displayName == "Oman" || place.displayName == "United Arab Emirates" ||place.displayName == "Qatar" || place.displayName == "Columbia") {
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
  else if(place.displayName == "India"  || place.displayName == "Bhutan" ||place.displayName == "Myanmar (Burma)" || place.displayName == "Cambodia" ||place.displayName == "North Korea" ||place.displayName == "Bangladesh"|| place.displayName == "Thailand" ||place.displayName == "Philippines"||place.displayName == "Malaysia" ||place.displayName == "Nepal"  ) {
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
else if(place.displayName == "Russia" || place.displayName == "Taiwan" ) {
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
else if(place.displayName == "Sri Lanka" || place.displayName == "Japan" || place.displayName == "Papua New Guinea" || place.displayName == "New Caledonia") {
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
  else if(place.displayName == "Yemen" || place.displayName == "Lebanon" || place.displayName == "Belarus" || place.displayName == "Kuwait" ) {
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
  else if(place.displayName == "Georgia" || place.displayName == "Armenia" || place.displayName == "Azerbaijan" ) {
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
  else if(place.displayName == "Algeria" || place.displayName == "Botswana" || place.displayName == "South Africa"|| place.displayName == "Lesotho" ||place.displayName == "Zimbabwe" ) {
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
else if(place.displayName == "Egypt" || place.displayName == "Israel" ) {
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
else if(place.displayName == "Ethiopia" ||place.displayName == "Malawi" ||place.displayName == "Comoros" || place.displayName == "Mayotte" ||place.displayName == "Burundi" ||place.displayName == "Eswatini" || place.displayName == "Eritrea" ) {
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


else if(place.displayName == "Mali" || place.displayName == "Niger" || place.displayName == "The Gambia" || place.displayName == "Guinea-Bissau" || place.displayName == "Côte d'Ivoire" || place.displayName == "Burkina Faso" ||place.displayName == "Senegal" ||place.displayName == "Somalia" || place.displayName == "Liberia" || place.displayName == "Guinea" ) {
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


else if(place.displayName == "Ghana" || place.displayName == "Republic of the Congo"  ||place.displayName == "Democratic Republic of the Congo" || place.displayName == "Kenya" || place.displayName == "South Sudan" || place.displayName == "Central African Republic" ||place.displayName == "Sudan" || place.displayName == "Chad" || place.displayName == "Cameroon") {
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
  else if(place.displayName == "Norway"|| place.displayName == "North Macedonia"|| place.displayName == "Belarus" || place.displayName == "Moldova" || place.displayName == "Sweden"||place.displayName == "Denamrk"||place.displayName == "Lithuania" ||place.displayName == "Montenegro" ||place.displayName == "Latvia"||place.displayName == "Albania"||place.displayName == "Serbia"||place.displayName == "Bulgaria"||place.displayName == "Finland"||place.displayName == "Romania"||place.displayName == "Poland" ||place.displayName == "Ukraine" ) {
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
else if(place.displayName == "Iceland" ||place.displayName == "Greece") {
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
else if(place.displayName == "Türkiye" ) {
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
else if(place.displayName == "Australia" ) {
    content +=
    '<p>Recommended Vaccines:</p>' +
    '<ul>' +
        '<li>COVID-19</li>' +
        '<li>Hepatitis B</li>' +
        '<li>Japanese Encephalitis</li>' +
        '<li>Measles</li>' +
        '<li>Rabies</li>' +
        '<li>Yellow Fever</li>' +
    '</ul>' +
'</span>';
  }
else if(place.displayName == "Afghanistan" || place.displayName == "Namibia" ||place.displayName == "Angola" ||place.displayName == "Uganda" ) {
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
        '<li>Polio</li>' +
        '<li>Typhoid</li>' +
    '</ul>' +
'</span>';
  }
  else {
    content += "Reccomended Vaccines:<br>N/A"
  }

  updateInfoWindow(content, event.latLng);

}


initMap();