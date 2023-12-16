var map, direction_plugin;
function initMap1() {
  map = new mappls.Map("map", {
    center: [28.09, 78.3],
    zoom: 5,
  });
  map.addListener("load", function () {
    /*direction plugin initialization*/
    var direction_option = {
      map: map,
      divWidth: "350px",
      isDraggable: false,
      end: { label: "India Gate", geoposition: "28.612964,77.229463" },
      Profile: ["driving", "biking", "trucking", "walking"],
    };
    mappls.direction(direction_option, function (data) {
      direction_plugin = data;
      console.log(direction_plugin);
    });
  });
}