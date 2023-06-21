
class task {
    taskName;
    taskDescription;
    taskStatus;
    dueDate;
}

let listOfAllTasks= localStorage.listOfAllTasks;

if (listOfAllTasks==undefined) {
    listOfAllTasks=[];
    localStorage.setItem("listOfAllTasks",JSON.stringify(listOfAllTasks));
    // console.log(listOfAllTasks);
}
else {
    listOfAllTasks=JSON.parse(listOfAllTasks);
    // console.log(listOfAllTasks);
    document.getElementById("current-tasks").innerHTML="";
    listOfAllTasks.forEach(element => {
        createNewTask(element,false);
    });
}


function createNewTask(Task, newItem=true){
    // newTaskData = new task();
    // newTaskData.taskName = name;
    // newTaskData.taskDescription = description;
    // newTaskData.taskStatus=status;
    // newTaskData.dueDate = dueDate;
    if (newItem) {
        previousList=JSON.parse(localStorage.listOfAllTasks);
        previousList.push(Task);
        localStorage.setItem("listOfAllTasks",JSON.stringify(previousList));
    }
    let newTask=document.createElement("div");
    newTask.classList.add("task");

    //Task name
    n=document.createElement("h3");
    // Task description
    d=document.createElement("p");
    d.contentEditable=true;
    // Task Due Date
    date = document.createElement("p");

    // Checkbox to mark a task as completed
    checkBox=document.createElement("input");
    checkBox.type="checkbox";

    if(Task.taskStatus=="Completed"){
        checkBox.checked=true;
        newTask.classList.add("completed-task");
    }
    else{
        checkBox.checked=false;
    }

    checkBox.onclick=function() {
        if (this.checked) {
            this.parentElement.classList.add("completed-task");
            let taskToComplete=this.parentElement.firstChild.textContent;
            listOfAllTasks=JSON.parse(localStorage.listOfAllTasks);
            listOfAllTasks.forEach(element => {
                if (element.taskName==taskToComplete) {
                    element.taskStatus="Completed";
                }
            });
            localStorage.setItem("listOfAllTasks",JSON.stringify(listOfAllTasks));
            // console.log(listOfAllTasks);

        } else {
            this.parentElement.classList.remove("completed-task");
            let taskToComplete=this.parentElement.firstChild.textContent;
            listOfAllTasks=JSON.parse(localStorage.listOfAllTasks);
            listOfAllTasks.forEach(element => {
                if (element.taskName==taskToComplete) {
                    element.taskStatus="Active";
                }
            });
            localStorage.setItem("listOfAllTasks",JSON.stringify(listOfAllTasks));
            // console.log(listOfAllTasks);
        }
    }
    checkBox.classList.add("task-checkbox");



    // Button to delete a task
    b=document.createElement("button");
    delImageStatic=document.createElement("img");
    delImage=document.createElement("img");
    delImageStatic.src="images/deleteIconStatic.png";
    delImageStatic.classList.add("static-delete-icon");
    delImage.src="images/deleteIcon.gif";
    delImage.classList.add("animated-delete-icon");
    b.appendChild(delImageStatic);
    b.appendChild(delImage);


    b.id=("delete-task-button");
    b.onclick= function() {
        let taskToDelete=this.parentElement.firstChild.textContent;

        previousList=JSON.parse(localStorage.listOfAllTasks);
        previousList.forEach((element,index) => {
            if (element.taskName==taskToDelete) {
                previousList.splice(index,1);
            }
        });

        localStorage.setItem("listOfAllTasks",JSON.stringify(previousList));
        this.parentElement.remove();
    }



    // Assigning values to the HTML elements
    n.textContent=Task.taskName;     
    d.textContent=Task.taskDescription;
    date.textContent=Task.dueDate;
    
    // Appending the elements to the task div
    newTask.appendChild(n);
    newTask.appendChild(d);
    newTask.appendChild(date);
    newTask.appendChild(checkBox);
    newTask.appendChild(b);

    // Appending the task div to the current tasks div
    document.getElementById("current-tasks").appendChild(newTask);
}


function submitNewTask(){
    newTask = new task();
    newTask.taskName = document.getElementById("task-name").value;
    newTask.taskDescription = document.getElementById("task-description").value;
    newTask.dueDate = document.getElementById("due-date").value;
    newTask.taskStatus = "Active";

    createNewTask(newTask);
    newTask.taskName="";
    newTask.taskDescription="";
    newTask.dueDate="";
}


 function filterTasks(how){
    tasks=document.getElementById("current-tasks");
    let children = tasks.children;
    if(how === "all"){
        for(let i=0;i<children.length;i++){
            children[i].style.display="flex";
        }
    }
    else if(how === "completed"){
        for(let i=0;i<children.length;i++){
            if(children[i].classList.contains("completed-task")){
                children[i].style.display="flex";
            }
            else{
                children[i].style.display="none";
            }
        }
    }
    else if(how === "active"){
        for(let i=0;i<children.length;i++){
            if(children[i].classList.contains("completed-task")){
                children[i].style.display="none";
            }
            else{
                children[i].style.display="flex";
            }
        }
    }
}

function sortTasks(how){
    tasks=document.getElementById("current-tasks").innerHTML="";
    listOfAllTasks=JSON.parse(localStorage.listOfAllTasks);
    if(how === "alphabetical"){
        listOfAllTasks.sort((a,b) => {
            return a.taskName < b.taskName ? -1 : 1;
        });
        listOfAllTasks.forEach(element => {
            createNewTask(element,false);
        });
    }
    else if(how === "due-date"){
        listOfAllTasks.sort((a,b) => {
            return a.dueDate < b.dueDate ? -1 : 1;
        });
        listOfAllTasks.forEach(element => {
            createNewTask(element,false);
        });
    }
}

function clearCompleted(){
    listOfAllTasks=JSON.parse(localStorage.listOfAllTasks);
    for (let i = listOfAllTasks.length-1; i >=0;i--) {
        if (listOfAllTasks[i].taskStatus==="Completed") {
            listOfAllTasks.splice(i,1);
        }
    }
    localStorage.setItem("listOfAllTasks",JSON.stringify(listOfAllTasks));
    tasks=document.getElementById("current-tasks");
    let children = tasks.children;
    for(let i=children.length-1;i>=0;i--){
        if(children[i].classList.contains("completed-task")){
            children[i].remove();
        }
    }
}