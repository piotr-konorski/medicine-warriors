var map;
var geocoder;
// var markers;


// Red circle -https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0
// Blue circle - https://storage.googleapis.com/support-kms-prod/SNP_2752068_en_v0
// Pink circle - https://storage.googleapis.com/support-kms-prod/SNP_2752264_en_v0
// Yellow circle - https://storage.googleapis.com/support-kms-prod/SNP_2752063_en_v0
// Green circle - https://storage.googleapis.com/support-kms-prod/SNP_2752129_en_v0

const iconBase = "https://storage.googleapis.com/support-kms-prod/";
// const iconBase = "http://maps.google.com/mapfiles/ms/icons/";
const icons = {
  pharmacy: {
    // icon: iconBase + "blue-dot.png",
    icon: iconBase + "SNP_2752068_en_v0",
  },
  storage: {
    icon: iconBase + "SNP_2752125_en_v0",
    // icon: iconBase + "red-dot.png",
  }
};


function dictGet(object, key, default_value) {
  var result = object[key];
  return (typeof result !== "undefined") ? result : default_value;
}


function initMap() {
  const kiev = { lat: 50.4021368, lng: 30.2525061 };
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: kiev,
  });
  
  geocoder = new google.maps.Geocoder();
}

function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function setPharmacies(pharmacies) {
  console.log('pharmacies:' + pharmacies.length)

  var infowindow = new google.maps.InfoWindow();

  for (let i=0; i<pharmacies.length; i++) {
    let pharmacy = pharmacies[i];

    var marker = new google.maps.Marker({
      position: pharmacy.position,
      map: map,
      title: pharmacy.name,
      icon: icons[pharmacy.type].icon
    });
    makeInfoWindowEvent(map, infowindow, pharmacy.info, marker);

  }
}


async function getPharmacies() {
  const response = await fetch('/pharmacies');
  const pharmacies = await response.json();
  return pharmacies;
}


async function updatePharmacies() {
  const pharmacies = await getPharmacies();
  setPharmacies(pharmacies);
}