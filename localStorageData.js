import { getListOfAllTasks } from "./script.js";

function initializeDataFromLocalStorage() {
    let listOfAllTasks = localStorage.listOfAllTasks;
    if (listOfAllTasks) {
        try {
            listOfAllTasks = JSON.parse(listOfAllTasks);
        } catch (error) {
            listOfAllTasks = [];
            localStorage.setItem(
                "listOfAllTasks",
                JSON.stringify(listOfAllTasks)
            );
        }
    } else {
        listOfAllTasks = [];
        localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));
    }
    return listOfAllTasks;
}

function saveTasksInLocalStorage() {
    const listOfAllTasks = getListOfAllTasks();
    localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));
}

export { initializeDataFromLocalStorage , saveTasksInLocalStorage };