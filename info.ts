let map: google.maps.Map;
let infoWindow;


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
    let content = '<b>' + place.displayName + '</b>';
  
    if(place.displayName == "Canada" || place.displayName == "Mexico" || place.displayName == "Greenland") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
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
    else if(place.displayName == "Haiti" || place.displayName == "Dominican Republic") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
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
    else if(place.displayName == "Cuba" || place.displayName == "Puerto Rico" || place.displayName == "Chile" || place.displayName == "Uruguay") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
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
    else if(place.displayName == "Argentina" || place.displayName == "Paraguay" || place.displayName == "Chile") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
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
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
  else if(place.displayName == "Pakistan") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
  else if(place.displayName == "Indonesia") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
      '<p>Recommended Vaccines:</p>' +
      '<ul>' +
          '<li>COVID-19</li>' +
    '<li>Cholera</li>' +
          '<li>Hepatitis A</li>' +
          '<li>Hepatitis B</li>' +
          '<li>Japanese Encephalitis</li>' +
          '<li>Malaria</li>' +
          '<li>Measles</li>' +
          '<li>Polio</li>' +
          '<li>Rabies</li>' +
          '<li>Polio</li>' +
          '<li>Typhoid</li>' +
          '<li>Yellow Fever</li>' +
      '</ul>' +
  '</span>';
    }
  
  
  else if(place.displayName == "South Korea") {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
  else if(place.displayName == "Singapore"|| place.displayName == "Iran" ) {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
      '<p>Recommended Vaccines:</p>' +
      '<ul>' +
          '<li>COVID-19</li>' +
          '<li>Hepatitis A</li>' +
          '<li>Hepatitis B</li>' +
          '<li>Measles</li>' +
          '<li>Rabies</li>' +
           '<li>Typhoid</li>' +
           '<li>Yellow Fever</li>' +
      '</ul>' +
  '</span>';
    }
  else if(place.displayName == "Vietnam" || place.displayName == "Laos" ) {
      content +=
      '<br><br>Routine Vaccines:' +
      '<ul>' +
          '<li>Chickenpox (Varicella)</li>' +
          '<li>Diphtheria-Tetanus-Pertussis</li>' +
          '<li>Flu (Influenza)</li>' +
          '<li>Measles-Mumps-Rubella (MMR)</li>' +
          '<li>Polio</li>' +
          '<li>Shingles</li>' +
      '</ul>' +
  
  
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
    else {
      content += "N/A"
    }

    updateInfoWindow(content, event.latLng);
  
  }