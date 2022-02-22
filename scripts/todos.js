class Todo {
    constructor(title, description, coord) {
        // this.id = id;
        this.title = title;
        this.description = description;
        this.coord = coord;
        // this.latitude = location[0];
        // this.longitude = location[1];
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
        todoList.push(new Todo("OneTitle", "OneDescription", new Coord(49.2320461231584, 9.164004935327187)));
        todoList.push(new Todo("TwoTitle", "TwoDescription", new Coord(49.23899815777546, 9.09671165040421)));
        todoList.push(new Todo("ThreeTitle", "ThreeDescription", new Coord(49.25176067682491, 9.039397436437302)));
    }

    function addTodo(title, description, coord) {
        todoList.push(new Todo(title, description, coord));
    }


    function initTodos() {
        todoList = [];
        loadTodos();
        showTodos();
    }

    function showTodos() {
        showTodosOnMap();
        showTodosInList();
    }

    function showTodosOnMap() {
        for (let i = 0; i < todoList.length; i++) {
            addTodoMarker(todoList[i]);
          }
    }

    function showTodosInList() {

        todoList.forEach(function (item) {

            let h3 = document.createElement('h3');
            let div = document.createElement('div');
            let p = document.createElement('p');
            div.appendChild(p);

            document.getElementById('list').appendChild(h3);
            document.getElementById('list').appendChild(div);
        
            p.innerHTML += item.description;
            h3.innerHTML += item.title;
        });


        // document.getElementById('list').appendChild(ul);

        
        // ul = document.createElement('ul');
    
        // document.getElementById('list').appendChild(ul);
        
        // todoList.forEach(function (item) {
        //     let li = document.createElement('li');
        //     ul.appendChild(li);
        
        //     li.innerHTML += item.title;
        // });
    }
// }


