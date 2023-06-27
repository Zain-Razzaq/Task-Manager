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
        const a = { ...this.classList };
        const b = { ...dragedTask.classList };
        console.log(a);
        console.log(b);
        this.classList = [];
        dragedTask.classList = [];
        this.classList = b;
        dragedTask.classList = a;

        // swaping the innerHTML
        dragedTask.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData("text/html");
    }
    return false;
}

export { dragStart, dragOver, dragDrop };
