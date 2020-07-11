import ToDoDisplay from './display';
import ToDoStorage from './storage';

class ToDo {
  constructor(name = 'To-do',
    description = 'To-do description',
    priority = 'low-priority',
    dueDate = new Date(),
    toDoIndex,
    projectIndex) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.toDoIndex = toDoIndex;
    this.projectIndex = projectIndex;
    this.checked = false;
  }

  handleToDoEdit() {
    const exitEdit = (name, description, priority, dueDate) => {
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.dueDate = dueDate;

      this.display.changeData(name, description, priority, dueDate);
      ToDoStorage.saveToDo(name,
        description,
        priority,
        dueDate,
        this.projectIndex,
        this.toDoIndex);
    };
    this.display.editToDo(exitEdit);
  }

  handleToDoDelete() {
    this.display.removeToDo();
    ToDoStorage.removeToDo(this.projectIndex, this.toDoIndex);
  }

  handleCheckedToggle() {
    this.checked = !this.checked;

    this.display.displayChecked(this.checked);
    ToDoStorage.saveChecked(this.projectIndex,
      this.toDoIndex,
      this.checked);
  }

  displayToDo() {
    this.display = new ToDoDisplay(this.name,
      this.description,
      this.priority,
      this.dueDate,
      this.checked,
      this.handleToDoEdit.bind(this),
      this.handleToDoDelete.bind(this),
      this.handleCheckedToggle.bind(this));
  }
}

export default ToDo;
