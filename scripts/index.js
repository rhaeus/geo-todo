
var locationHandler = new LocationHandler();
var mapHandler = new MapHandler(new Coord(49.01402868891351, 8.40428765576787));
var todoHandler = new TodoHandler();


window.onload = function() {
    locationHandler.getLocation(getPositionSuccess);
    locationHandler.startLocationObserver(getPositionSuccess);

    var todos = todoHandler.getTodoList();
    mapHandler.clearMarkers();
    for (let i = 0; i < todos.length; i++) {
        mapHandler.addTodoMarker(todos[i]);
    }
    activateFirstTodo();
    ambientLight();
};

function getPositionSuccess(position) {
    var coord = new Coord(position.coords.latitude, position.coords.longitude);
    mapHandler.setMapFocus(coord);
    mapHandler.showLocationMarker(coord);
}

function addTodoItemCallback(coord) {
  var id = IDGenerator.getID();
  var titleID = "title" + id;
  var descriptionID = "description" + id;
  // style="width: 15em;"
  $(`<form id="dialogid"><div><b>Title</b></div><input type="text" size=20 onfocus="this.select();" required="required" value="New Title"style="z-index:10000" name=${titleID}><br><br><div><b>Description</b></div><textarea name=${descriptionID} cols="21" rows="5" style="resize: none;" onfocus="this.select();" required="required">New Description</textarea><br></form>`)
  .attr('title', 'New ToDo Item')
    .dialog({
        modal: true,
        resizable: false,
        width: 'auto',
        // maxWidth: 400,
        // minWidth: 250,
        height: 'auto',
        // maxHeight: 310,
        // minHeight: 310,
        buttons: {
          'OK': function () {
            var title = $(`input[name=${titleID}]`).val();
            var description = $(`textarea[name=${descriptionID}]`).val();
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
    var todo = todoHandler.addTodo(title, description, coord);
    mapHandler.addTodoMarker(todo);
    $( "#list" ).accordion("refresh");
    $("#list").accordion("option", "active", todoHandler.getTodoCount()-1);
}

function listItemClickCallback(item) {
    mapHandler.focusID(item.id);
}

function deleteTodoItemButtonCallback(item) {

    $('<form id="deleteItemForm">Do you really want to delete the item?</form>')
    .attr('title', 'Delete Item?')
    .dialog({
        modal: true,
        // width: 430,
        // height: 310,
        buttons: {
          'Yes': function () {
            mapHandler.deleteID(item.id);
            todoHandler.deleteID(item.id);
        
            activateFirstTodo();
            $("#list").accordion("option", "active", 0);
            $( "#list" ).accordion("refresh");
            $(this).dialog('close');
          },
          'No': function () {
            $(this).dialog('close');
          }
        }
      });

}

function activateFirstTodo() {
    if (todoHandler.getTodoCount() > 0) {
        var firstId = todoHandler.getTodoList()[0].id;
        mapHandler.focusID(firstId);
    }
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

function showPositionButtonCallback() {
    locationHandler.getLocation(getPositionSuccess);
}


function setDarkTheme()  {
    const theme = document.querySelector("#theme-link");
    const jqueryTheme = document.querySelector("#jquery-theme-link");
    jqueryTheme.href = "styles/jquery-ui-dark.css";
    theme.href = "styles/dark-theme.css";
}

function setLightTheme(){
    const theme = document.querySelector("#theme-link");
    const jqueryTheme = document.querySelector("#jquery-theme-link");
    jqueryTheme.href = "//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css";
    theme.href = "styles/light-theme.css";
}

var autoTheme = false;
function setTheme(theme) {
    switch(theme) {
        case "Light":
          setLightTheme();
          autoTheme = false;
          break;
        case "Dark":
          setDarkTheme();
          autoTheme = false;
          break;
        case "Auto":
            autoTheme = true;
            break;
        default:
          // code block
      }
}

function toggleTheme() {
    const theme = document.querySelector("#theme-link");
    const jqueryTheme = document.querySelector("#jquery-theme-link");
    if (theme.getAttribute("href") == "styles/light-theme.css") {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

function openListSection() {
    document.getElementById("list-panel").style.width = "20rem";
    document.getElementById("map-panel").style.marginLeft = "21rem";
    document.getElementById("map-panel").style.width = "calc(100% - 21rem)";

  }
  
function closeListSection() {
    document.getElementById("list-panel").style.width = "0rem";
    document.getElementById("map-panel").style.marginLeft = "0rem";
    document.getElementById("map-panel").style.width = "100%";
}

function toggleListSection() {
    if (document.getElementById("list-panel").style.width == "0rem") {
        openListSection();
    } else {
        closeListSection();
    }
    mapHandler.invalidate();
}




const mediaQueryBigScreen = window.matchMedia('(min-width: 60rem)');

function handleBigScreen(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    console.log('Media Query big Matched!');
    openListSection();
  }
}

// Register event listener
mediaQueryBigScreen.addListener(handleBigScreen);

// Initial check
// handleBigScreen(mediaQueryBigScreen);




const mediaQuerySmallScreen = window.matchMedia('(max-width: 60rem)');

function handleSmallScreen(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    console.log('Media Query Small Matched!');
    closeListSection();
  }
}

// Register event listener
mediaQuerySmallScreen.addListener(handleSmallScreen);

// Initial check
// handleSmallScreen(mediaQuerySmallScreen);