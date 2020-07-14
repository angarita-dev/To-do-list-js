import ToDoDisplay from './display';
import ToDoStorage from './storage';

class ToDo {
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

  constructor(name = 'To-do',
    description = 'To-do description',
    priority = 'low-priority',
    dueDate = new Date(),
    toDoIndex,
    projectIndex,
    checked) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = new Date(dueDate);
    this.toDoIndex = toDoIndex;
    this.projectIndex = projectIndex;
    this.checked = checked;
  }

  handleToDoEdit() {
    const exitEdit = (name, description, priority, dueDate) => {
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.dueDate = new Date(dueDate);

      this.display.reDisplayValues(name, description, priority, dueDate);
      ToDoStorage.saveToDo(name,
        description,
        priority,
        this.dueDate,
        this.checked,
        this.projectIndex,
        this.toDoIndex);
    };

    return exitEdit;
  }

  handleToDoDelete() {
    this.display.removeToDo();
    ToDoStorage.removeToDo(this.projectIndex, this.toDoIndex);
  }

  handleCheckedToggle() {
    this.checked = !this.checked;

    ToDoStorage.saveChecked(this.projectIndex,
      this.toDoIndex,
      this.checked);
  }

}

export default ToDo;
