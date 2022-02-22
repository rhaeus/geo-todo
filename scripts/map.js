class Coord {
    constructor(lat, long) {
        this.lat = lat;
        this.long = long;
    }
};

class TodoMarker {
    constructor(id, marker) {
        this.marker = marker;
        this.id = id;
    }
};
class MapHandler {

    constructor (coord){
        this.initMap(coord);
    };

    initMap(coord) {
        this.map = L.map('map');
        this.map.setView([coord.lat, coord.long], 13);
    
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZmF2ZW4iLCJhIjoiY2t6eTQ1bTcxMDdpeDJvcDdyMXpsdWY2eSJ9.WOT1zI_rz4ESogcJYieYMQ'
        }).addTo(this.map);

        this.map.on('click', this.onMapClick, this);

        this.todoMarkers = [];
    }

    addTodoMarker(todo) {
        var markerOptions = {
            title: todo.title,
            riseOnHover: 'true',
        };
        
        var marker = L.marker([todo.coord.lat, todo.coord.long], markerOptions);
        marker.bindPopup("<b>"+ todo.title + "</b><br>" + todo.description).openPopup();
        marker.addTo(this.map);

        this.todoMarkers.push(new TodoMarker(todo.id, marker));
    }



    setMapFocus(coord) {
        this.map.setView([coord.lat, coord.long], 13);
    }

    focusID(id) {
        for (let i = 0; i < this.todoMarkers.length; i++) {
            if (this.todoMarkers[i].id == id) {
                var latlng = this.todoMarkers[i].marker.getLatLng();
                var lat = latlng.lat;
                var lng = latlng.lng;
                var coord = new Coord(lat, lng);
                this.setMapFocus(coord);
                this.todoMarkers[i].marker.togglePopup();
            }
        }
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


    onMapClick(e) {
        this.lastClickedMapPosition = new Coord(e.lat, e.long);
        var domelem = document.createElement('button');
        domelem.innerHTML = "Add ToDo Item";
        domelem.onclick = function() {
            popupCallback();
        };

        L.popup()
            .setLatLng(e.latlng)
            .setContent(domelem)
            .openOn(this.map);
    }
};




