const form = document.querySelector('#task-form');
const todoList = document.querySelector('#todo-lane');
const tasks = document.querySelectorAll('.task');

const taskLanes = document.querySelectorAll('.task-lanes');
const saveBtn = document.querySelector("#save");
const syncBtn = document.querySelector('#sync');

 let todoItems = [];
 let doingItems = [];
 let doneItems = [];
 
 let source = null;
 let target = null;




form.addEventListener('submit', (event) =>{
    // Preveting by default refreshing page 
    event.preventDefault();

    //capturing the user input
    const task = event.target[0].value;

    if(task.length && task.length <=30){

    // Making div and paragraph tag
    const div = document.createElement('div');
    const para = document.createElement('p');
    
    // Our input and paragraph inside the task should be same 
    para.innerText = task;

    // Adding the class name to the div 
    div.classList.add('task');
    div.setAttribute('draggable',true);

    div.addEventListener('dragstart', (e) =>{
         div.classList.add('is-dragging');
         source = e.target.parentNode.id;
    });

    div.addEventListener('dragend', (e) =>{
        div.classList.remove('is-dragging');
        target = e.target.parentNode.id;
        recalculateTaskArr(task);
   });

   //todoItems.push(task);

    //  appending the para graph inside the div
    div.appendChild(para);

    // Finaly add the div to the TODO list lane 
    todoList.appendChild(div);
    
    // remove the task name inside the input field
    event.target[0].value = "";

    }
    else{
        alert("Your task cannot be the empty or not exceed above 30 character");
        event.target[0].value = "";
    }

  
});

taskLanes.forEach(phase => {
    phase.addEventListener('dragover', (e) => {

        e.preventDefault();
        const currentTask = document.querySelector('.is-dragging');
        phase.appendChild(currentTask)
      
    })
});

saveBtn.addEventListener('click', () => {
    const tasks = JSON.stringify({
        todo: todoItems,
        doing: doingItems,
        done: doneItems
    });
    localStorage.setItem('tasks', tasks);
    alert('Sucessfully saved')
});


function recalculateTaskArr(task){

    let sourceArr = [];
    let targetArr = [];

    if(source === 'todo-lane'){
        sourceArr = [...todoItems];
    }else if (source === 'doing-lane'){
        sourceArr = [...doingItems];    
    } else{
        sourceArr = [...doneItems];
    }

     if(target === 'todo-lane'){
        targetArr = [...todoItems];
    }else if (target === 'doing-lane'){
        targetArr = [...doingItems];    
    } else{
        targetArr = [...doneItems];
    }
   
    const taskIndex = sourceArr.findIndex((el) => el === task );
    sourceArr.splice(taskIndex,1);
    targetArr.push(task);
    

    if(source == 'todo-lane'){
          todoItems = sourceArr;
    }else if (source == 'doing-lane'){
          doingItems = sourceArr;    
    } else{
          doneItems = sourceArr;
    }
    
      if(target === 'todo-lane'){
          todoItems = targetArr;
    }else if (target == 'doing-lane'){
          doingItems = targetArr;    
    } else{
          doneItems = targetArr;
    }
    
   

    console.log(todoItems, doingItems, doneItems);
    }



