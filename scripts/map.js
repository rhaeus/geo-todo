// class MapHandler {

    // constructor (){
    //     this.initMap();
    // };
    var map;
    var todoMarkers = [];

    function initMap(location) {
        map = L.map('map').setView(location, 13);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZmF2ZW4iLCJhIjoiY2t6eTQ1bTcxMDdpeDJvcDdyMXpsdWY2eSJ9.WOT1zI_rz4ESogcJYieYMQ'
        }).addTo(map);
    }

    function addTodoMarker(todo) {
        var markerOptions = {
            title: todo.title,
            riseOnHover: 'true',
        };
        
        var marker = L.marker([todo.latitude, todo.longitude], markerOptions);
        todoMarkers.push(todo.id, marker);

        marker.addTo(map);
    }


    function setMapFocus(coord) {
        map.setView(coord, 13);
    }

    function showLocationMarker(coord) {
        var markerOptions = {
            color: 'black',
            fillColor: 'red',
            opacity: 1,
            fillOpacity: 1
        };

        var marker = L.circleMarker(coord, markerOptions);
        marker.addTo(map);
}

// }


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
}

