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
        this.map = L.map('map', {zoomControl: false});
        this.map.setView([coord.lat, coord.long], 13);
    
        this.layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            className: 'map-tiles',
            accessToken: 'pk.eyJ1IjoiZmF2ZW4iLCJhIjoiY2t6eTQ1bTcxMDdpeDJvcDdyMXpsdWY2eSJ9.WOT1zI_rz4ESogcJYieYMQ'
        }).addTo(this.map);

        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        this.map.on('click', this.onMapClick, this);

        this.todoMarkers = [];
        this.position_marker = null;

        var easyButton = L.easyButton('<i class="material-icons">gps_fixed </i>', function(btn, map){
            showPositionButtonCallback();
        }, {position: 'bottomright'}).addTo( this.map );
        // $(window).on("resize", function () { $("#map").height($(window).height()); this.map.invalidateSize(); }).trigger("resize");
        // $(window).on("resize", function () { this.map.invalidateSize(); }).trigger("resize");

        // map.invalidateSize()
    }

    invalidate() {
        this.map.invalidateSize();
        this.layer.redraw();
    }

    clearMarkers() {
        for (let i = 0; i < this.todoMarkers.length; i++) {
            this.map.removeLayer(this.todoMarkers[i].marker);
        }
        this.todoMarkers = [];
    }

    addTodoMarker(todo) {
        this.map.closePopup();
        var markerOptions = {
            title: todo.title,
            riseOnHover: 'true',
        };
        
        var marker = L.marker([todo.coord.lat, todo.coord.long], markerOptions);

        marker.on('click', ()=>{
            mapMarkerClick(todo.id);
        });

        var content = document.createElement('div');
        var title = document.createElement('div');
        title.innerHTML = "<b>"+ todo.title + "</b>";
        var description = document.createElement('div');
        description.innerHTML = todo.description;


        var deleteToDoButton = document.createElement('button');
        deleteToDoButton.classList.add("deleteButton");
        deleteToDoButton.innerHTML = "Delete";
        deleteToDoButton.onclick = function() {
            deleteTodoItemButtonCallback(todo)
        };

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(deleteToDoButton);

        marker.bindPopup(content);
        marker.addTo(this.map);
        if (!marker.isPopupOpen()) {
            marker.openPopup();
        }

        this.todoMarkers.push(new TodoMarker(todo.id, marker));
    }

    deleteID(id) {
        for (let i = 0; i < this.todoMarkers.length; i++) {
            if (this.todoMarkers[i].id == id) {
                this.map.removeLayer(this.todoMarkers[i].marker);
                break;
            }
        }
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
                if (!this.todoMarkers[i].marker.isPopupOpen()) {
                    this.todoMarkers[i].marker.openPopup();
                }
                break;
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

        if (this.position_marker != null) {
            //remove old position marker
            this.map.removeLayer(this.position_marker); 
        }
        //add new position marker
        this.position_marker = L.circleMarker([coord.lat, coord.long], markerOptions);
        this.position_marker.bindPopup("<b>You are here</b>").openPopup();
        this.position_marker.addTo(this.map);
    }


    onMapClick(e) {
        var coord = new Coord(e.latlng.lat, e.latlng.lng);

        var addToDoButton = document.createElement('button');
        addToDoButton.innerHTML = "Add ToDo Item";
        addToDoButton.onclick = function() {
            addTodoItemCallback(coord);
        };

        L.popup()
            .setLatLng(e.latlng)
            .setContent(addToDoButton)
            .openOn(this.map);
    }
};




