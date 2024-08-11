
const form = document.getElementById('form')
const inputValue = document.getElementById('inputValue')
const ul = document.getElementById('todoList')


let editFlag = false

let lineThrough = false

let editElement  = null

let editID = null


document.addEventListener('DOMContentLoaded',function(e){
    todos = GetLocalStorage()

    todos.forEach(e => {
            
        createTodo(e.id,e.ToDo,e.lineThrough)
            
    });
})



form.addEventListener('submit',function(e){
    e.preventDefault()

    const id = randomID()

    const value = inputValue.value
    
    if (value !== '' && !editFlag) {
        
        createTodo(id,value,lineThrough)
        SetLocalStorage(id,value,lineThrough)
    }
    else if(value !=='' && editFlag){

        editElement.textContent = value

        updateLocalStorage(editID,value,lineThrough)

        resetEdit()

    }

})


function createTodo(id,todoText,lineThrough){
        const todoContainer = document.createElement('li');
        todoContainer.classList.add('list')

        
        todoContainer.innerHTML=` <p data-id="${id}" >${todoText}</p><i class="ri-pencil-fill"></i>`

        

        ul.appendChild(todoContainer)



        

        value = inputValue.value


        const Pel = todoContainer.querySelector('p')

        
        if (lineThrough) {
            Pel.classList.add('lineThrough')
        }


        const Iel = todoContainer.querySelector('i')
        Pel.addEventListener('click',function(e){
            
            Pel.classList.add('lineThrough')

            lineThrough = true

            console.log(id,value,lineThrough);

            updateLocalStorage(id,value,lineThrough)
            
        
            

            
        })

        todoContainer.addEventListener('contextmenu',function(e){
            
            e.preventDefault()
            todoContainer.remove()
            console.log(id);
            
            removeFromLocalStorage(Pel.dataset.id)
        
            // console.log(GetLocalStorage());
        })

        //edit button event listener
        Iel.addEventListener('click',function(e){

            
            inputValue.value  = Pel.textContent

            editFlag = true

            editElement = Pel
            
            editID = Pel.dataset.id


            console.log('editing');



            
            
        })
}


function SetLocalStorage(id,value,lineThrough){
   
    const todos = GetLocalStorage()
    todos.push({
        id:id,
        ToDo : value,
        lineThrough:lineThrough
    })
    localStorage.setItem('todo',JSON.stringify(todos))
}  

function GetLocalStorage(){
    return JSON.parse(localStorage.getItem('todo')) || [];
}

function removeFromLocalStorage(id){
    let todos = GetLocalStorage()

    todos = todos.filter(todo=> todo.id !== id)

    localStorage.setItem('todo',JSON.stringify(todos))
    
}

function updateLocalStorage(id, value, lineThrough) {
    let todos = GetLocalStorage();

    todos = todos.map(todo => 
        todo.id === id 
        ? { ...todo, ToDo: value, lineThrough: lineThrough } 
        : todo
    );

    localStorage.setItem('todo', JSON.stringify(todos));
}

function randomID(){
    return new Date().getTime().toString();
    
}

function resetEdit(){
    let editFlag = false

    let editElement  = null

    let editId = null

    let lineThrough = false

    inputValue.value =''
}





