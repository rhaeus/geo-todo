class Test {
    testMethod() {
        console.log("Helooooo");
        // alert("Hello");
    }
}

// class LocationHandler {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFail);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    function getPositionSuccess(position) {
        var coord = new Coord(position.coords.latitude, position.coords.longitude)
        setMapFocus(coord);
        showLocationMarker(coord);
    }

    function getPositionFail(error) {
        showError(error);
    }
    
    // showPosition(position) {
    //     showPositionOnMap(position.coords.latitude, position.coords.longitude)
    // }
    
    // showPositionOnMap(lat, long) {
    //     setMapFocus(lat, long);
    //     showLocationMarker(lat, long);
    // }
    
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

// }


