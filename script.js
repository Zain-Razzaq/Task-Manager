
class task {
    taskName;
    taskDescription;
    taskStatus;
    dueDate;
}


let listOfAllTasks = [];


// Button to add a task
// let addTaskButton= document.getElementById("add-task-button");
// addTaskButton.addEventListener("click", ()=> {
let submitNewTask = (event) => {
    event.preventDefault();
    newTaskData = new task();
    newTaskData.taskName = document.getElementById("task-name").value;
    newTaskData.taskDescription = document.getElementById("task-description").value;
    newTaskData.taskStatus="Active";
    newTaskData.dueDate = document.getElementById("due-date").value;

    listOfAllTasks.push(newTaskData);

    let newTask=document.createElement("div");
    newTask.classList.add("task");

    checkBox=document.createElement("input");
    checkBox.type="checkbox";
    n=document.createElement("h3");
    d=document.createElement("p");
    date = document.createElement("p");
    b=document.createElement("button");

    n.textContent=document.getElementById("task-name").value;
    d.textContent=document.getElementById("task-description").value;
    date.textContent=document.getElementById("due-date").value;
    b.textContent="Delete";


    
    b.id=("delete-task-button");
    b.onclick= function() {
        let taskToDelete=this.parentElement.firstChild.textContent;
        for (let i=0; i<listOfAllTasks.length; i++) {
            if (listOfAllTasks[i].taskName==taskToDelete) {
                listOfAllTasks.splice(i,1);
            }
        }

        this.parentElement.remove();
    }

    newTask.appendChild(n);
    newTask.appendChild(d);
    newTask.appendChild(date);
    newTask.appendChild(checkBox);
    newTask.appendChild(b);

    document.getElementById("current-tasks").appendChild(newTask);

    document.getElementById("task-name").value="";
    document.getElementById("task-description").value="";
    document.getElementById("due-date").value="";
    console.log(listOfAllTasks);
}
