class Coord {
    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
    }
};

class MapHandler {

    constructor (){
        this.initMap(new Coord(49.01402868891351, 8.40428765576787));
    };
    // var map;
    // var todoMarkers = [];

     initMap(coord) {
        this.map = L.map('map').setView([coord.lat, coord.long], 13);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZmF2ZW4iLCJhIjoiY2t6eTQ1bTcxMDdpeDJvcDdyMXpsdWY2eSJ9.WOT1zI_rz4ESogcJYieYMQ'
        }).addTo(this.map);

        // this.map.on('click', onMapClick);

        // lastClickedMapPosition = location
    }

    // function addTodoMarker(todo) {
    //     var markerOptions = {
    //         title: todo.title,
    //         riseOnHover: 'true',
    //     };
        
    //     var marker = L.marker([todo.coord.lat, todo.coord.long], markerOptions);


    //     marker.bindPopup("<b>"+ todo.title + "</b><br>" + todo.description).openPopup();
    //     marker.addTo(map);

    //     todoMarkers.push(todo.id, marker);
    // }


     setMapFocus(coord) {
        this.map.setView([coord.lat, coord.long], 13);
    }

    showLocationMarker(coord) {
        var markerOptions = {
            color: 'black',
            fillColor: 'red',
            opacity: 1,
            fillOpacity: 1
        };

        var marker = L.circleMarker([coord.lat, coord.long], markerOptions);
        marker.bindPopup("<b>You are here</b>").openPopup();
        marker.addTo(this.map);
}



// var lastClickedMapPosition = null;

// function onMapClick(e) {
//     lastClickedMapPosition = new Coord(e.lat, e.long);
//     L.popup()
//         .setLatLng(e.latlng)
//         .setContent("New ToDo Item here")
//         .openOn(map);
// }




};


// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// var popup = L.popup()
//     .setLatLng([51.513, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

class TodoMarker {
    constructor(id, marker) {
        this.marker = marker;
        this.id = id;
    }
};

