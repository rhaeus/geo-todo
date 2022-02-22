class Todo {
    constructor(id, title, description, coord) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.coord = coord;
    }
}

var IDGenerator = (function() {
    var id = 0;
  
    return { // public interface
      getID: function () {
        return id++;
      }
    };
  })();

class TodoHandler {
    constructor() {
        this.initTodos();
    }

    loadTodos() {
        this.todoList.push(new Todo(IDGenerator.getID(), "OneTitle", "OneDescription", new Coord(49.2320461231584, 9.164004935327187)));
        this.todoList.push(new Todo(IDGenerator.getID(), "TwoTitle", "TwoDescription", new Coord(49.23899815777546, 9.09671165040421)));
        this.todoList.push(new Todo(IDGenerator.getID(), "ThreeTitle", "ThreeDescription", new Coord(49.25176067682491, 9.039397436437302)));
    }

    addTodo(title, description, coord) {
        this.todoList.push(new Todo(title, description, coord));
    }

    initTodos() {
        this.todoList = [];
        this.loadTodos();
        this.showTodosInList();
    }

    getTodoList() {
        return this.todoList;
    }


    showTodosInList() {
        this.todoList.forEach(function (item) {

            let h3 = document.createElement('h3');
            // let a = document.createElement('a');
            h3.id = "item_"+ item.id;
            // h3.appendChild(a);
            let div = document.createElement('div');
            let p = document.createElement('p');
            div.appendChild(p);

            document.getElementById('list').appendChild(h3);
            document.getElementById('list').appendChild(div);
        
            p.innerHTML += item.description;
            h3.innerHTML += item.title;


            $("#item_" + item.id).click(function() {
                // alert("test");
                // console.log("mdkjskh");
                listItemClickCallback(item);
            });
        });
    }
}


