let map: google.maps.Map;
let featureLayer;
let infoWindow;
let lastInteractedFeatureIds = [];
let lastClickedFeatureIds = [];

const countries_all = [
  "Chile", "Russia", "Argentina", "India", "Ukraine", "Canada","United States","Canada","Greenland","Iceland","Svalbard and Jan Mayen","Sweden","Finland","Norway","Svalbard and Jan Mayen","Canada","United States","Mexico","Ecuador","Guatemala","El Salvador","Kiribati","Canada","United States","Brazil","Algeria","Greenland","Mexico","Peru","Mali","Niger","Colombia","Mauritania","Venezuela","France","Spain","Morocco","Côte d'Ivoire","Burkina Faso","Ecuador","United Kingdom","Guinea","Ghana","Guyana","Senegal","Suriname","Nicaragua","Honduras","Cuba","Guatemala","Iceland","Liberia","Portugal","French Guiana","Panama","Sierra Leone","Ireland","Togo","Costa Rica","Dominican Republic","Guinea-Bissau","Haiti","Belize","El Salvador","The Bahamas","The Gambia","Jamaica","Puerto Rico","Trinidad and Tobago","Cape Verde","Guadeloupe","Faroe Islands","Martinique","Turks and Caicos Islands","Dominica","Saint Lucia","Isle of Man","Barbados","Curaçao","Antigua and Barbuda","Saint Vincent and the Grenadines","Grenada","U.S. Virgin Islands","Caribbean Netherlands","Saint Kitts and Nevis","Saint Pierre and Miquelon","Jersey","China","Kazakhstan","Democratic Republic of the Congo","Algeria","Saudi Arabia","Sudan","Iran","Libya","Mongolia","Chad","Mali","Niger","Ethiopia","Egypt","Nigeria","Pakistan","Turkey","Afghanistan","South Sudan","Somalia","Central African Republic","Kenya","France","Spain","Turkmenistan","Cameroon","Yemen","Uzbekistan","Sweden","Iraq","Germany","Republic of the Congo","Finland","Norway","Poland","Oman","Italy","Burkina Faso","Gabon","United Kingdom","Uganda","Ghana","Romania","Belarus","Kyrgyzstan","Syria","Tunisia","Nepal","Bangladesh","Tajikistan","Greece","Eritrea","Benin","Bulgaria","Hungary","Jordan","Austria","Czechia","Serbia","United Arab Emirates","Sri Lanka","Lithuania","Latvia","Georgia","Togo","Croatia","Bosnia and Herzegovina","Slovakia","Estonia","Denmark","Switzerland","Bhutan","Netherlands","Moldova","Belgium","Armenia","Albania","Equatorial Guinea","North Macedonia","Djibouti","Israel","Slovenia","Kuwait","Montenegro","Qatar","Lebanon","Cyprus","Luxembourg","Åland Islands","São Tomé and Príncipe","Bahrain","Andorra","Malta","Maldives","Liechtenstein","United States","China","Indonesia","Mongolia","Myanmar (Burma)","Thailand","Japan","Malaysia","Vietnam","Philippines","Laos","Cambodia","Bangladesh","North Korea","South Korea","Bhutan","Taiwan","Brunei","Hong Kong","Singapore","Federated States of Micronesia","Palau","Guam","Northern Mariana Islands","New Zealand","Ecuador","Fiji","French Polynesia","Samoa","Tonga","Niue","American Samoa","Tokelau","Antarctica","Brazil","Peru","Colombia","Bolivia","Paraguay","Ecuador","Uruguay","Falkland Islands (Islas Malvinas)","South Georgia and the South Sandwich Islands","Saint Helena, Ascension and Tristan da Cunha","Antarctica","Democratic Republic of the Congo","Angola","South Africa","Tanzania","Namibia","Mozambique","Zambia","Somalia","Madagascar","Kenya","Botswana","Zimbabwe","Republic of the Congo","Gabon","Uganda","Malawi","Lesotho","Burundi","Rwanda","Eswatini","French Southern and Antarctic Lands","Réunion","Mauritius","Comoros","São Tomé and Príncipe","Seychelles","Mayotte","Heard Island and McDonald Islands","Antarctica","Australia","Indonesia","Papua New Guinea","New Zealand","Solomon Islands","Fiji","New Caledonia","Timor-Leste","Vanuatu","Christmas Island","Antarctica","Antarctica","Antarctica","Antarctica"];



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
    zoom: 2,
    // In the cloud console, configure your Map ID with a style that enables the
    // 'Administrative Area Level 2' Data Driven Styling type.
    mapId: 'c58fbe5558f591c8', // Substitute your own map ID.
    mapTypeControl: false,
  });

  // Add the feature layer.
  //@ts-ignore
  featureLayer = map.getFeatureLayer('COUNTRY');

  featureLayer.style = (placeFeature) => {
      if (countries_all.includes(placeFeature.feature.displayName)) {
          return {fillColor: '#007DB3', fillOpacity: 0.8}
      }
  }

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

// Helper function for the infowindow.
async function createInfoWindow(event) {
  let feature = event.features[0];
  if (!feature.placeId) return;

  // Update the infowindow.
  const place = await feature.fetchPlace();
  let content =
      '<span style="font-size:small">Display name: ' + place.displayName +
      '<br/> Place ID: ' + feature.placeId +
      '<br/> Feature type: ' + feature.featureType + '</span>';

  updateInfoWindow(content, event.latLng);
}

// Define styles.
// Stroke and fill with minimum opacity value.
const styleDefault = {
  strokeColor: '#810FCB',
  strokeOpacity: 1.0,
  strokeWeight: 2.0,
  fillColor: 'white',
  fillOpacity: 0.1,  // Polygons must be visible to receive events.
};
// Style for the clicked polygon.
const styleClicked = {
  ...styleDefault,
  fillColor: '#810FCB',
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

// Helper function to create an info window.
function updateInfoWindow(content, center) {
  infoWindow.setContent(content);
  infoWindow.setPosition(center);
  infoWindow.open({
    map,
    shouldFocus: false,
  });
}

initMap();
