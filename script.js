
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
    console.log(listOfAllTasks);
}
else {
    listOfAllTasks=JSON.parse(listOfAllTasks);
    document.getElementById("current-tasks").innerHTML="";
    listOfAllTasks.forEach(element => {
        createNewTask(element.taskName,element.taskDescription,element.taskStatus,element.dueDate,false);
    });
}

function createNewTask(name,description,status="Active",dueDate,newItem=true){
    newTaskData = new task();
    newTaskData.taskName = name;
    newTaskData.taskDescription = description;
    newTaskData.taskStatus=status;
    newTaskData.dueDate = dueDate;

    if (newItem) {
        previousList=JSON.parse(localStorage.listOfAllTasks);
        previousList.push(newTaskData);
        localStorage.setItem("listOfAllTasks",JSON.stringify(previousList));
    }
    let newTask=document.createElement("div");
    newTask.classList.add("task");

    checkBox=document.createElement("input");
    checkBox.type="checkbox";

    if(newTaskData.taskStatus=="Completed"){
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
    n=document.createElement("h3");
    d=document.createElement("p");
    d.contentEditable=true;
    date = document.createElement("p");
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


    // b.textContent="Delete";


    n.textContent=newTaskData.taskName;     
    d.textContent=newTaskData.taskDescription;
    date.textContent=newTaskData.dueDate;
    


    b.id=("delete-task-button");
    b.onclick= function() {
        let taskToDelete=this.parentElement.firstChild.textContent;

        previousList=JSON.parse(localStorage.listOfAllTasks);
        previousList.forEach((element,index) => {
            if (element.taskName==taskToDelete) {
                previousList.splice(index,1);
            }
        });
        // console.log(previousList);

        localStorage.setItem("listOfAllTasks",JSON.stringify(previousList));
        this.parentElement.remove();
    }

    newTask.appendChild(n);
    newTask.appendChild(d);
    newTask.appendChild(date);
    newTask.appendChild(checkBox);
    newTask.appendChild(b);

    document.getElementById("current-tasks").appendChild(newTask);
}


let submitNewTask = (event) => {
    event.preventDefault();

    let name = document.getElementById("task-name").value;
    let description = document.getElementById("task-description").value;
    let dueDate = document.getElementById("due-date").value;

    createNewTask(name,description,"Active",dueDate);
    document.getElementById("task-name").value="";
    document.getElementById("task-description").value="";
    document.getElementById("due-date").value="";
    // console.log(localStorage.listOfAllTasks);
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
            if(a.taskName < b.taskName){
                return -1;
            }
            else if(a.taskName > b.taskName){
                return 1;
            }
            else{
                return 0;
            }
        });
        listOfAllTasks.forEach(element => {
            createNewTask(element.taskName,element.taskDescription,element.taskStatus,element.dueDate,false);
        });
    }
    else if(how === "due-date"){
        listOfAllTasks.sort((a,b) => {
            if(a.dueDate < b.dueDate){
                return -1;
            }
            else if(a.dueDate > b.dueDate){
                return 1;
            }
            else{
                return 0;
            }
        });
        listOfAllTasks.forEach(element => {
            createNewTask(element.taskName,element.taskDescription,element.taskStatus,element.dueDate,false);
        });
    }
}



function clearCompleted(){
    listOfAllTasks=JSON.parse(localStorage.listOfAllTasks);
    listOfAllTasks.forEach((element,index) => {
        if (element.taskStatus=="Completed") {
            listOfAllTasks.splice(index,1);
        }
    });
    localStorage.setItem("listOfAllTasks",JSON.stringify(listOfAllTasks));

    tasks=document.getElementById("current-tasks");
    let children = tasks.children;
    for(let i=0;i<children.length;i++){
        if(children[i].classList.contains("completed-task")){
            children[i].remove();
        }
    }
}