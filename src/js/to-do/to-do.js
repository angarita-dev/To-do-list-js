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

  constructor(projectIndex,
    toDoIndex,
    reDisplay,
    name = 'To-do',
    description = 'To-do description',
    priority = 'low-priority',
    dueDate = new Date(),
    checked = false) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = new Date(dueDate);
    this.toDoIndex = toDoIndex;
    this.projectIndex = projectIndex;
    this.checked = checked;
    this.reDisplay = reDisplay;
  }

  saveToDo() {
    ToDoStorage.saveToDo(this.name,
      this.description,
      this.priority,
      this.dueDate,
      this.checked,
      this.projectIndex,
      this.toDoIndex);
  }

  handleToDoEdit() {
    const exitEdit = (name, description, priority, dueDate) => {
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.dueDate = dueDate;

      this.display.reDisplayValues(name, description, priority, dueDate);
      this.saveToDo();
      this.reDisplay();
    };

    return exitEdit;
  }

  handleToDoDelete() {
    this.display.removeElement();
    ToDoStorage.removeToDo(this.projectIndex, this.toDoIndex);
  }

  handleCheckedToggle() {
    this.checked = !this.checked;

    ToDoStorage.saveChecked(this.projectIndex,
      this.toDoIndex,
      this.checked);
    this.reDisplay();
  }

  selectAndEdit() {
    this.display.selectToDo();
    this.display.editToDo(this.handleToDoEdit());
  }
}

export default ToDo;
