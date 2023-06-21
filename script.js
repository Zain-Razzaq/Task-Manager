
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
    checkBox.onclick=function() {
        if (this.checked) {
            this.parentElement.classList.add("completed-task");
            let taskToComplete=this.parentElement.firstChild.textContent;
            listOfAllTasks.forEach(element => {
                if (element.taskName==taskToComplete) {
                    element.taskStatus="Completed";
                }
            });
            // console.log(listOfAllTasks);

        } else {
            this.parentElement.classList.remove("completed-task");
            let taskToComplete=this.parentElement.firstChild.textContent;
            listOfAllTasks.forEach(element => {
                if (element.taskName==taskToComplete) {
                    element.taskStatus="Active";
                }
            });
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
    //  check box status code will be here


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
