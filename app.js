// Kumpulkan Semua Element

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

//Ini adalah Kumpulan Event Listener

immediateEventListener();

function immediateEventListener(){

    //Menambahkan todo dari local storage dan render di Browser
    document.addEventListener("DOMContentLoaded", getTodos)

    // Event untuk menambahkan todo
    todoForm.addEventListener("submit", addTodo);

    //Event untuk menghapus satu todo
    todoList.addEventListener("click", deleteTodo);
    
    //EVenet untuk menghapus semua todo
    clearButton.addEventListener("click", clearTodos);
    
    // Event untuk memfilter todos
    filterInput.addEventListener("keyup", filterTodos);
}
//Reusable Codes

function createTodoElement(value){
    // Membuat li element
    const li = document.createElement("li");
        
    //Menambahkan Class pada ELelemnt li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1"
    
    //Menambah child pada elemen li
    li.appendChild(document.createTextNode(value));
    
    //Membuat Delete Button
    const a = document.createElement("a");
    
    //Membrei Properti Untuk Element
    a.href = "#";
    a.className = "badge badge-danger delete-todo";
    
    //Menambah child bisa dengan ini
    a.innerHTML = "Delete";
    
    //Menyalinkan elemen a kedalam elemen li
    li.appendChild(a);
    
    //Memasukan elemen li yang telah dibuat di js kedalam ?//element todoList
    
    todoList.appendChild(li)
}

function getItemFromLocalStorage(){
    let todos;

    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos;
}

// INi adalah DOM Function

function getTodos(){

    const todos = getItemFromLocalStorage();

    todos.forEach((todo) => {
         createTodoElement(todo);
    })
}

function addTodo(e){
    e.preventDefault(); // agar tidak terefresh

    if(todoInput.value){
        
        createTodoElement(todoInput.value);
        
        addTodoLocalStorage(todoInput.value);
        
        todoInput.value = "";// agar kosong kembali 
    }else{
        alert("Tidak Boleh Kosong");
    }

}

function addTodoLocalStorage(todoInputValue){
    const todos = getItemFromLocalStorage();

    todos.push(todoInputValue);

    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteTodo(e){
    e.preventDefault();

    // e.target // e sebagai event dan target sesuai yang diklik

    if(e.target.classList.contains("delete-todo")){
        if(confirm("Akan Menghapus")){
            const parent = e.target.parentElement;
            
            parent.remove();// API yang bisa meremove sebuah element

            deleteTodoFromLocalStorage(parent);
        }
        
    }
}

function deleteTodoFromLocalStorage(deletedElement){
    const todos = getItemFromLocalStorage(); // Akan menghapus element parent todo 4

    todos.forEach((todo, index) => {
        if(deletedElement.firstChild.textContent === todo){
            todos.splice(index, 1)
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}


function clearTodos(){
    todoList.innerHTML = ""; //Takon Akbar iki seng diselect ul e

    clearTodosLocalStorage();
}

function clearTodosLocalStorage(){
    localStorage.clear();
}

// HighLights
function filterTodos(e){
    const filterText = e.target.value.toLowerCase(); //takon akbar

    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(filterText) !== -1){
            item.setAttribute("style", "display : block;");
        }else{
            item.setAttribute("style", "display : none !important;")
        }
    });
}


