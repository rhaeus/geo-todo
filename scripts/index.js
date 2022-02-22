// var mapHandler;
// var locationHandler;

window.onload = function() {
    initMap([49.01402868891351, 8.40428765576787]);
    getLocation();
    initTodos();
};

function showLocation(position) {
    var lat = position.coords.latitude; 
    var long = position.coords.longitude;
    alert(mapHandler);
    mapHandler.setMapFocus([lat, long]);
    // this.mapHandler.showLocationMarker([lat, long]);
}



// function load(argument) {
// 	// body...
//         // alert("Hello");

// }

// window.onload = load;



// class Main {
//     constructor() {
//         this.locationHandler = new LocationHandler();
//         this.mapHandler = new MapHandler();
//         this.todoHandler = new TodoHandler();
//         // alert("Hello");
//         this.locationHandler.getLocation(this.showLocation);



//         // var lat = this.locationHandler.location;
//         // alert(lat);
//         // var long = this.locationHandler.location[1];

//         // this.mapHandler.setMapFocus(this.locationHandler.location);
//         // this.mapHandler.showLocationMarker(this.locationHandler.location);
//         // this.mapHandler.setMapFocus([49.2320461231584, 9.164004935327187]);
//         // this.mapHandler.showLocationMarker([49.2320461231584, 9.164004935327187]);
//     }

//     showLocation(position) {
//         var lat = position.coords.latitude; 
//         var long = position.coords.longitude;
//         // this.mapHandler.setMapFocus([lat, long]);
//         // this.mapHandler.showLocationMarker([lat, long]);
//     }
// }

//   function init() {
//     //    alert("Hello");
//     // mapHandler.setMapFocus(49.2320461231584, 9.164004935327187);
//     // mapHandler.showLocationMarker(49.2320461231584, 9.164004935327187);
//     //  var main = new Main();

//     //  locationHandler.getLocation();
//      // location = locationHandler.location;
//     //  alert("Hello");
 
//      // alert(location.lat);
//      // mapHandler.setMapFocus(location);
//      // mapHandler.showLocationMarker(location);
//   }