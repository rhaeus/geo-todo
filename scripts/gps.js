class LocationHandler {
    constructor() {
        this.watcherID = null;
    }

    getLocation(successCallback, failCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, failCallback, {timeout:2000});
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    startLocationObserver(successCallback) {
        if (navigator.geolocation) {
            this.watcherID = navigator.geolocation.watchPosition(successCallback, this.getPositionFail, {timeout:300})
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    stopLocationObserver() {
        if (this.watcherID != null) {
            navigator.geolocation.clearWatch(this.watcherID);
            this.watcherID = null;
        }
    }


     getPositionFail(error) {
        this.showError(error);
    }
    
    
    showError(error) {
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

}


