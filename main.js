const addForm=document.querySelector('.add');
const search=document.querySelector('.search input');
const list=document.querySelector(".todos");
const tasks=localStorage.getItem("tasks")?
JSON.parse(localStorage.getItem("tasks")):[];
showTasks(tasks);

function generateTemplate(todo){
    const html=`
    <li
    class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>`;
    list.innerHTML+=html;//adds the todo provided by user and append it to the ul.
};


function showTasks(tasks){
    tasks.forEach((todo)=>{
        generateTemplate(todo);
    })
}

function upload(){
addForm.addEventListener('submit',e=>{
e.preventDefault();
const todo=addForm.add.value.trim();// to remove all those extra spaces before and after the text.
if(todo.length){
    generateTemplate(todo);
    addForm.reset();//clears the content inside the input after submit.
    tasks.push(todo);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}// helps to avoid submitting an empty todo.
});
}
function removeTasks(target){
    const index=tasks.indexOf(target);
    if(index!=-1){
        tasks.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
}

//delete todos
//method of event delegation
//we will find trash icon in the complete ul.
list.addEventListener('click',(e)=>{
if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();// the li tag will get removed.
    removeTasks(e.target.parentElement.querySelector("span").innerText);
}
})

const filterTodos=(term)=>{
    Array.from(list.children)
    .filter((todo)=> !todo.textContent.toLowerCase().includes(term))//array of todos which don't contain the term so we can hide them.
    .forEach((todo)=>
        todo.classList.add('filtered'))//the common class of filtered is applied now on the todos that don't match the search input.    
    Array.from(list.children)
    .filter((todo)=>todo.textContent.toLowerCase().includes(term))
    .forEach((todo)=>
    todo.classList.remove('filtered'));//to not hide the todos which match now with the input.
};//filtering through the todos

//search todos
search.addEventListener('keyup',()=>{
    const term=search.value.trim().toLowerCase();//storing the text user types in the search field.
    filterTodos(term);
});