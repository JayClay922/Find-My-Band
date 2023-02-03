let userLong = -0.3758;
let userLat = 51.51237;
let eventLong = -4.2055;
let eventLat = 55.8497;

var map = new maplibregl.Map({
    container: 'my-map',
    style:
    'https://api.maptiler.com/maps/streets/style.json?key=' + mapKey,
    center: [userLong, userLat],
    zoom: 11
});

map.addControl(new maplibregl.NavigationControl());

const popup = new maplibregl.Popup();

const fromWaypoint = [userLong, userLat]; // longitude, latutude
const fromWaypointMarker = new maplibregl.Marker().setLngLat(fromWaypoint)
  .setPopup(new maplibregl.Popup().setText()).addTo(map);

const toWaypoint = [eventLong, eventLat]; // longitude, latutude
const toWaypointMarker = new maplibregl.Marker().setLngLat(toWaypoint)
  .setPopup(new maplibregl.Popup().setText()).addTo(map);

let routeData;
let routeStepsData;
let journeyObjData;
let instructionsData = [];
let journeyObj = [];

fetch(`https://api.geoapify.com/v1/routing?waypoints=lonlat:${fromWaypoint.join(",")}|lonlat:${toWaypoint.join(",")}&mode=drive&details=route_details&apiKey=${geoapifyKey}`).then(res => res.json()).then(routeResult => {
    routeData = routeResult;
    console.log(routeData);
    const steps = [];
    const instructions = [];
  
    routeData.features[0].properties.legs.forEach((leg, legIndex) => {
      const legGeometry = routeData.features[0].geometry.coordinates[legIndex];
      leg.steps.forEach((step, index) => {
        if (step.instruction) {
          journeyObj.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": legGeometry[step.from_index]
            },
            properties: {
                text: step.instruction.text
            }
          });
        }
      });
    });
    routeInfo(journeyObj);
});

function routeInfo() {
    console.log(journeyObj);
    for (let i = 0; i < journeyObj.length; i++) {
      instructionsData.push(journeyObj[i].properties.text);
    }
  
    let routeInfoHeader = $(` <h3 class="px-3 w-100 text-center"> Route Information </h3> `);
    $('#routeInfo').append(routeInfoHeader) 
  
    for (let i = 0; i < instructionsData.length; i++) {
      let routeInfoCard = $(
      `
        <p class="card-text"> ${i+1}. ${instructionsData[i]}</p>
      `
    );
    $('#routeInfo').append(routeInfoCard) 
    }
  }