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
      },
      init: function(startValue) {
        id = startValue;
      }
    };
  })();

class TodoHandler {
    constructor() {
        this.todoList = [];
        this.initTodos();
    }


    addTodo(title, description, coord) {
        var item = new Todo(IDGenerator.getID(),title, description, coord);
        this.todoList.push(item);
        this.addItemToDocument(item);
        this.storeData();
        return item;
    }

    initTodos() {
        this.todoList = [];
        this.loadData();
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
                this.storeData();
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
        console.log(item.id);
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
        btn.classList.add("deleteButton");
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

    storeData() {
        if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem("todos", JSON.stringify(this.todoList));
        console.log("data stored");

        } else {
        console.log("Sorry! No Web Storage support..");
        }
    }

    loadData() {
        this.todoList = [];
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        var startID = 0;
        for (let i = 0; i < this.todoList.length; ++i) {
            if (this.todoList[i].id > startID) {
                startID = this.todoList[i].id;
            }
        }
        IDGenerator.init(startID+1);
        console.log("data restored");
    }
}


