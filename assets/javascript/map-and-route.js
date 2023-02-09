var userLong = 0;
var userLat = 0;
var eventLong = 0;
var eventLat = 0;

function userCoord(){
  userLong = userLatLong[0];
  userLat = userLatLong[1];
}

function eventCoord(){
  eventLong = eventLatLong[1];
  eventLat = eventLatLong[0];
}

function generateMap() {
userCoord();
eventCoord();
console.log(userLong, userLat);
console.log(eventLong, eventLat);

var map = new maplibregl.Map({
  container: "my-map",
  style: "https://api.maptiler.com/maps/streets/style.json?key=" + mapKey,
  center: [userLong, userLat],
  zoom: 11,
});

map.addControl(new maplibregl.NavigationControl());

const popup = new maplibregl.Popup();

const fromWaypoint = [userLong, userLat]; // longitude, latutude
const fromWaypointMarker = new maplibregl.Marker()
  .setLngLat(fromWaypoint)
  .setPopup(new maplibregl.Popup().setText())
  .addTo(map);

const toWaypoint = [eventLong, eventLat]; // longitude, latutude
const toWaypointMarker = new maplibregl.Marker()
  .setLngLat(toWaypoint)
  .setPopup(new maplibregl.Popup().setText())
  .addTo(map);

let routeData;
let routeStepsData;
let instructionsData = [];
let journeyObj = [];

fetch(
  `https://api.geoapify.com/v1/routing?waypoints=lonlat:${fromWaypoint.join(
    ","
  )}|lonlat:${toWaypoint.join(
    ","
  )}&mode=drive&details=route_details&apiKey=${geoapifyKey}`
)
  .then((res) => res.json())
  .then(
    (routeResult) => {
      routeData = routeResult;
      console.log(routeData);

      routeData.features[0].properties.legs.forEach((leg, legIndex) => {
        const legGeometry =
          routeData.features[0].geometry.coordinates[legIndex];
        leg.steps.forEach((step, index) => {
          if (step.instruction) {
            journeyObj.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: legGeometry[step.from_index],
              },
              properties: {
                text: step.instruction.text,
              },
            });
          }
        });
      });

      routeStepsData = {
        type: "FeatureCollection",
        features: journeyObj,
      };

      map.addSource("route", {
        type: "geojson",
        data: routeData,
      });

      map.addSource("points", {
        type: "geojson",
        data: routeStepsData,
      });

      routeInfo(journeyObj);
      addLayerEvents();
      drawRoute();
      calcDistanceAndTime();
    },
    (err) => console.log(err)
  );

function routeInfo() {
  console.log(journeyObj);
  for (let i = 0; i < journeyObj.length; i++) {
    instructionsData.push(journeyObj[i].properties.text);
  }

  $("#routeInfo").empty();
  let routeInfoHeader = $(
    ` <h3 class="px-3 w-100 text-center"> Route Information </h3> `
  );
  $("#routeInfo").append(routeInfoHeader);

  for (let i = 0; i < instructionsData.length; i++) {
    let routeInfoCard = $(
      `
        <p class="card-text"> ${i + 1}. ${instructionsData[i]}</p>
      `
    );
    $("#routeInfo").append(routeInfoCard);
  }
}

function drawRoute() {
  if (!routeData) {
    return;
  }

  map.addLayer({
    id: "route-layer",
    type: "line",
    source: "route",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#6084eb",
      "line-width": 8,
    },
    filter: ["==", "$type", "LineString"],
  });

  map.addLayer({
    id: "points-layer",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff",
      "circle-stroke-color": "#aaa",
      "circle-stroke-width": 1,
    },
  });
}

function addLayerEvents() {
  map.on("click", "points-layer", (e) => {
    const properties = e.features[0].properties;
    const point = e.features[0].geometry.coordinates;
  });
}

if (routeData = undefined) {
  console.log('error');
} else {
function calcDistanceAndTime() {
    let distance = routeData.features[0].properties.distance;
    let displayDisatnce = (distance/1609.344).toFixed(2);
    console.log(`The disatnce is ${displayDisatnce} miles`);
    let time = routeData.features[0].properties.time;
    let timeInHours = (time*0.00027778).toFixed(2);
    let hours = Math.floor(timeInHours);
    let minutes = Math.round((timeInHours - hours) * 60);
    console.log(`The journey takes ${hours} hours and ${minutes} minutes.`);
    $("#route-modal").empty();
    $('#route-modal').removeClass('hide')
    $('#route-modal').addClass('distance')
    let modalContent = $(
      ` 
      <div class="flex">
      <button class="btn-close" onclick="closeModal()" >⨉</button>
      </div>
      <div>
      <h3>Route to concert</h3>
      <p>
      The distance from your address to the event is ${displayDisatnce} miles.
      </p>
      <p>
      The journey will take ${hours} hours and ${minutes} minutes.
      </p>
      </div>
      <button class="btn" onclick="displayMap()" >View Route</button>
      `
    );
    $('#route-modal').append(modalContent)
}
}
}

function closeModal() {
  $('#route-modal').removeClass('distance')
  $('#route-modal').addClass('hide')
}

function displayMap() {
  $('#my-map').removeClass('hide')
  $('#view-directions').removeClass('hide')
  $('#route-modal').removeClass('distance')
  $('#route-modal').addClass('hide')
}

