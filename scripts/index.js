
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
    loadTheme();
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
        case "light":
          setLightTheme();
          autoTheme = false;
          break;
        case "dark":
          setDarkTheme();
          autoTheme = false;
          break;
        case "auto":
            autoTheme = true;
            break;
        default:
          setLightTheme(); //default to light theme
          autoTheme = false;
          break;
      }
      storeTheme(theme);
}

function storeTheme(theme) {
  if (typeof(Storage) !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(theme));
      // console.log("theme stored");

  } else {
    console.log("Sorry! No Web Storage support..");
  }
}

function loadTheme() {
  var theme = JSON.parse(localStorage.getItem("theme"));
  if (theme == null || !['light', 'dark', 'auto'].includes(theme)) { //no data stored
      theme = 'light';
  }
  
  isAmbientSensorAvailable().then(
    value => {
      // console.log("ambient sensor available");
      var radio = document.getElementById(`radio-${theme}-theme`);
      radio.checked = true;
      setTheme(theme);
    },
    reason => {
      // console.log("sensor not available");
      var radioAuto = document.getElementById(`radio-auto-theme`);
      radioAuto.disabled = true;
      if (theme == 'auto') {
        theme = 'light'; //default to white
      }
      var radio = document.getElementById(`radio-${theme}-theme`);
      radio.checked = true;
      setTheme(theme);
    }
  )


  // console.log("theme restored");
}


function toggleTheme() {
    const theme = document.querySelector("#theme-link");
    if (theme.getAttribute("href") == "styles/light-theme.css") {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

function openListSection() {
    document.getElementById("list-panel").style.width = "clamp(15em, 20%, 80%)";
    // var width = $("#list-panel").width();
    // var cwidth = $(".container").width();
    // console.log(width);
    // var mapWidth = cwidth-width;

    document.getElementById("map-panel").style.marginLeft = "max(21%, 16em)";
    // document.getElementById("map-panel").style.marginLeft = `${width}px`;
    // document.getElementById("map-panel").style.width = "min(79%, calc(100%-16em))";
    // document.getElementById("map-panel").style.width = `calc(100%-${width}px)`;
    document.getElementById("map-panel").style.width = `auto`;
    // document.getElementById("map-panel").style.width = `${mapWidth}px`;

  }
  
function closeListSection() {
    document.getElementById("list-panel").style.width = "0%";
    document.getElementById("map-panel").style.marginLeft = "0%";
    document.getElementById("map-panel").style.width = "100%";
}

function toggleListSection() {
    if (document.getElementById("list-panel").style.width == "0%") {
        openListSection();
    } else {
        closeListSection();
    }
    mapHandler.invalidate();
}



// var bigScreen=true;

const mediaQueryBigScreen = window.matchMedia('(min-width: 60rem)');

function handleBigScreen(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    // console.log('Media Query big Matched!');
    // bigScreen=true;
    openListSection();
  }
}

// Register event listener
mediaQueryBigScreen.addListener(handleBigScreen);

// Initial check
handleBigScreen(mediaQueryBigScreen);




const mediaQuerySmallScreen = window.matchMedia('(max-width: 60rem)');

function handleSmallScreen(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    // console.log('Media Query Small Matched!');
    // bigScreen=false;
    closeListSection();
  }
}

// Register event listener
mediaQuerySmallScreen.addListener(handleSmallScreen);

// Initial check
handleSmallScreen(mediaQuerySmallScreen);