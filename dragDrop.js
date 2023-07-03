let dragedTask = null;

function dragStart(event) {
    dragedTask = this;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
}

function dragDrop(event) {
    event.stopPropagation();
    if (dragedTask != this) {
        // swaping the classes


        const classesOfThis =Array.from( this.classList);
        classesOfThis.forEach((className) => {
            this.classList.remove(className);
        });

        const classesOfDragedTask = Array.from(dragedTask.classList);
        classesOfDragedTask.forEach((className) => {
            dragedTask.classList.remove(className);
        });
        classesOfThis.forEach((className) => {
            dragedTask.classList.add(className);
        });
        classesOfDragedTask.forEach((className) => {
            this.classList.add(className);
        });

        // swaping the innerHTML
        dragedTask.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData("text/html");
    }
    return false;
}

export { dragStart, dragOver, dragDrop };
