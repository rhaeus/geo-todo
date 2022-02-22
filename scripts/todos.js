class Todo {
    constructor(id, title, description, location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.latitude = location[0];
        this.longitude = location[1];
        // this.lat = lat;
        // this.long = long;
    }
}

// class TodoHandler {
    // var 
    // constructor() {
    //     this.initTodos();
    // }

    var todoList = [];

    function loadTodos() {
        this.todoList.push(new Todo(0, "OneTitle", "OneDescription", [49.2320461231584, 9.164004935327187]));
        this.todoList.push(new Todo(1, "TwoTitle", "TwoDescription", [49.23899815777546, 9.09671165040421]));
        this.todoList.push(new Todo(2, "ThreeTitle", "ThreeDescription", [49.25176067682491, 9.039397436437302]));
    }


    function initTodos() {
        todoList = [];
        loadTodos();
        showTodos();
    }

    function showTodos() {
        showTodosOnMap();
        // showTodosInList();
    }

    function showTodosOnMap() {
        for (let i = 0; i < todoList.length; i++) {
            addTodoMarker(todoList[i]);
          }

    }
// }


