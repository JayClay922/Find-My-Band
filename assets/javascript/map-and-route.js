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