
var mapHandler = new MapHandler(new Coord(49.01402868891351, 8.40428765576787));
var locationHandler = new LocationHandler();
var todoHandler = new TodoHandler();


window.onload = function() {
    // initMap(new Coord(49.01402868891351, 8.40428765576787));
    locationHandler.getLocation(getPositionSuccess);
    var todos = todoHandler.getTodoList();
    for (let i = 0; i < todos.length; i++) {
        mapHandler.addTodoMarker(todos[i]);
    }
};

function getPositionSuccess(position) {
    var coord = new Coord(position.coords.latitude, position.coords.longitude);
    mapHandler.setMapFocus(coord);
    mapHandler.showLocationMarker(coord);

}

function addTodoItemCallback(coord) {
    // console.log(coord);

    $('<form id="addItemForm"><div><b>Title</b></div><input type="text" size="39" required="required" value="New Title"style="z-index:10000" name="title"><br><br><div><b>Description</b></div><textarea name="description" cols="40" rows="5" required="required">New Description</textarea><br></form>')
    // .data('coord', coord)
    .dialog({
        modal: true,
        width: 430,
        height: 310,
        buttons: {
          'OK': function () {
            var title = $('input[name="title"]').val();
            var description = $('textarea[name="description"]').val();
            // var coord = $("#addItemForm").data('coord');
            // console.log(coord);

            if(title != "" && description != "") {
                storeData(title, description, coord);
                $(this).dialog('close');
            }
          },
          'Cancel': function () {
            $(this).dialog('close');
          }
        }
      });



}

function storeData(title, description, coord) {
    // console.log(coord);
    var todo = todoHandler.addTodo(title, description, coord);
    mapHandler.addTodoMarker(todo);
    $( "#list" ).accordion("refresh");
    $("#list").accordion("option", "active", todoHandler.getTodoCount()-1);
}

function listItemClickCallback(item) {
    mapHandler.focusID(item.id);
}

function deleteTodoItemButtonCallback(item) {
    // var activeIndex = 1;
    // console.log(activeIndex);
    // var todos = todoHandler.getTodoList();
    // if(todoHandler == 0) {
    //     return;
    // }
    // var activeIndex = jQuery("#list").accordion('option', 'active');
    // var toDelete = todos[activeIndex];
    mapHandler.deleteID(item.id);
    todoHandler.deleteID(item.id);

    if (todoHandler.getTodoCount() > 0) {
        var firstId = todoHandler.getTodoList()[0].id;
        // console.log(firstId);
        mapHandler.focusID(firstId);
        $("#list").accordion("option", "active", 0);
    }
    $( "#list" ).accordion("refresh");

}

function mapMarkerClick(id) {
    var todos = todoHandler.getTodoList();
    for (let i = 0; i < todos.length; ++i) {
        if (todos[i].id == id) {
            $("#list").accordion("option", "active", i);
            break;
        }
    }
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