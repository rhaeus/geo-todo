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
        var item = new Todo(IDGenerator.getID(),title, description, coord);
        this.todoList.push(item);
        this.addItemToDocument(item);
        return item;
    }

    initTodos() {
        this.todoList = [];
        this.loadTodos();
        this.showTodosInList();
    }

    getTodoList() {
        return this.todoList;
    }

    getTodoCount() {
        return this.todoList.length;
    }

    deleteID(id) {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id == id) {
                this.removeItemFromDocument(this.todoList[i]);
                this.todoList.splice(i,1);
                break;
            }
        }
    }

    removeItemFromDocument(item) {
        var h3 = document.getElementById("item_h3_"+ item.id);
        var div = document.getElementById("item_div_"+ item.id);
        var list = document.getElementById('list');
        list.removeChild(h3);
        list.removeChild(div);
    }

    addItemToDocument(item) {
        let h3 = document.createElement('h3');
        // let a = document.createElement('a');
        h3.id = "item_h3_"+ item.id;
        // h3.appendChild(a);
        let div = document.createElement('div');
        div.id = "item_div_"+ item.id;
        let p = document.createElement('p');
        div.appendChild(p);

        let btn = document.createElement('button');
        btn.innerText = "Delete";
        btn.addEventListener("click", ()=>{
            deleteTodoItemButtonCallback(item);
        });
        div.appendChild(btn);

        document.getElementById('list').appendChild(h3);
        document.getElementById('list').appendChild(div);
    
        p.innerHTML += item.description;
        h3.innerHTML += item.title;

        $("#item_h3_" + item.id).click(function() {

            listItemClickCallback(item);
        });
    }


    showTodosInList() {
        for (let i = 0; i < this.todoList.length; i++) {
            this.addItemToDocument(this.todoList[i]);
        }

    }
}


