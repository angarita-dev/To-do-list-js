import ToDo from '../to-do/to-do';

class ToDoManager {
  sortToDos() {
    const toDoContainers = Array.from(document.getElementById('to-do-container').children);
    const modelPriority = ['uh-priority', 'high-priority', 'medium-priority', 'low-priority'];

    const getPriorityIndex = (priority) => modelPriority.indexOf(priority);
    const sortToDo = (a, b) => {
      if (a.checked && !b.checked) return 1;
      if (a.checked && b.checked) return 0;
      if (!a.checked && b.checked) return -1;

      const aPriorityIndex = getPriorityIndex(a.priority);
      const bPriorityIndex = getPriorityIndex(b.priority);

      if (aPriorityIndex < bPriorityIndex) return -1;
      if (aPriorityIndex > bPriorityIndex) return 1;
      return 0;
    };

    this.toDoList.sort(sortToDo);
  }

  saveToDos() {
    this.toDoList.forEach(toDo => toDo.saveToDo());
  }

  displayToDos() {
    const toDoContainer = document.getElementById("to-do-container");
    toDoContainer.innerHTML = '';
    this.saveToDos();
    this.toDoList.forEach(toDo => toDo.displayToDo());
  }

  reDisplayToDos() {
    this.sortToDos();
    this.displayToDos();
  }

  addToDo() {
    this.toDoIndex += 1;
    const newToDo = new ToDo(this.projectIndex, this.toDoIndex, this.reDisplayToDos.bind(this)); 
    this.toDoList.unshift(newToDo);
    this.displayToDos();
    newToDo.selectAndEdit();
  }

  loadNewToDo() {
    const addToDoIcon = document.getElementById('add-to-do-icon');

    addToDoIcon.onclick = () => this.addToDo();
  }

  constructor(projectIndex, toDoListData) {
    this.projectIndex = projectIndex;
    const toDoList = toDoListData.map((data, index) => {
      return new ToDo(this.projectIndex,
        index,
        this.reDisplayToDos.bind(this),
        data.name,
        data.description,
        data.priority,
        data.dueDate,
        data.checked)
    });
    this.toDoList = toDoList;
    this.toDoIndex = toDoList.length - 1;
    this.sortToDos();
    this.displayToDos();
    this.loadNewToDo(); 
  }
}

export default ToDoManager;
