let form = document.querySelector('.todo__form');
let newTodo = document.querySelector('.todo__add');
let todo__list =document.querySelector('.todo__list');
let clear = document.querySelector('.todo__clear');
let editWrapper = document.querySelector('.edit__wrapper');
let editFrom = document.querySelector('.edit__form');
let editInput = document.querySelector('.edit__input')
//todoBody
let todoList = JSON.parse(window.localStorage.getItem('todos')) || [];
render(todoList, todo__list)

form.addEventListener('submit', event =>{
    todoList = JSON.parse(window.localStorage.getItem('todos')) || [];
    event.preventDefault();
    if(!todoList.length==0){

        let todoObj={
            id:todoList[todoList.length-1].id+1,
            body : newTodo.value,
            isCompleted : false
        }
        todoList.unshift(todoObj)
        window.localStorage.setItem('todos',JSON.stringify(todoList))
    } else{
        let todoObj={
            id:0,
            body : newTodo.value,
            isCompleted : false
        }
        todoList.unshift(todoObj)
        window.localStorage.setItem('todos',JSON.stringify(todoList))
    }
    render(JSON.parse(window.localStorage.getItem('todos')), todo__list)
})



function render(arr, parent){
    parent.innerHTML = null;
    count =1;
    arr.map(e=>{
        let newLi=document.createElement('li');
        newLi.setAttribute('class', 'todo__item')
        let newP = document.createElement('p');
        newP.setAttribute('class', 'todo__body');
        newP.textContent = e.body;
        newLi.textContent= `${count++}.`;
        let newCheck = document.createElement('input');
        newCheck.setAttribute('type', 'checkbox');
        newCheck.setAttribute('class', 'todo__check');
        newCheck.checked = e.isCompleted;
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'todo__wrapper');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('class', 'todo__delete');
        deleteBtn.addEventListener('click',()=>{
            deleteFunc(arr, e.id)
        })
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('class', 'todo__edit');
        editBtn.dataset.id =e.id;
        editBtn.addEventListener('click', ()=>{
            edit(arr, e.id)
        })
        wrapper.appendChild(editBtn);
        wrapper.appendChild(deleteBtn);
        
        newCheck.addEventListener('click', ()=>{
            e.isCompleted = !e.isCompleted;
            window.localStorage.setItem('todos', JSON.stringify(arr));

        })
        newLi.appendChild(newCheck);
        newLi.appendChild(newP);
        newLi.appendChild(wrapper);
        parent.appendChild(newLi)
    })
}
clear.addEventListener('click', ()=>{
    let arr = window.localStorage.getItem('todos');
    console.log('ok');
    arr =[];
    window.localStorage.setItem('todos', JSON.stringify(arr))
    render(arr, todo__list)
});

function deleteFunc(arr, id){
    let index = arr.findIndex(e=>e.id==id);
    arr.splice(index, 1);
    window.localStorage.setItem('todos', JSON.stringify(arr))
    render(arr, todo__list);
}
function edit(arr, id){
    let found = arr.find(e=>e.id==id);
    let index = arr.findIndex(e=>e.id==id)
    editWrapper.classList.add('active');
    editInput.value = found.body;
    editFrom.addEventListener('submit', (e)=>{
        let value = editInput.value;
        e.preventDefault();
        let todoObj={
            id:found.id,
            body : value,
            isCompleted :found.isCompleted
        }
        arr.splice(index, 1, todoObj)
        window.localStorage.setItem('todos', JSON.stringify(arr));
        render(arr, todo__list);
        editWrapper.classList.remove('active')

    })
    

}
