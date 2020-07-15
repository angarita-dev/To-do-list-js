import ProjectStorage from './storage';
import ProjectDisplay from './display';
import ToDoManager from './to-do-manager';

class Project {
  constructor(reDisplay,
    deleteHandler,
    index,
    name = 'To-do Project',
    priority = 'low-priority',
    toDos = []) {
    this.name = name;
    this.priority = priority;
    this.index = index;
    this.deleteHandler = deleteHandler;
    this.reDisplay = reDisplay;
    this.toDoManager = new ToDoManager(index, toDos);
  }

  displayToDos() {
    this.toDoManager.displayToDos();
    this.toDoManager.loadNewToDo();
  }

  selectProject() {
    this.display.selectProject();
  }
  
  saveProject() {
    ProjectStorage.saveProject(this.name, this.priority, this.index);
  }

  selectAndEdit() {
    this.display.selectProject();
    this.display.editProject(this.handleProjectEdit());
  }

  handleProjectEdit() {
    const exitEdit = (name, priority) => {
      this.name = name;
      this.priority = priority;

      this.display.changeTitle(this.name);
      this.display.changePriority(this.priority);
      this.saveProject();
      this.reDisplay();
    };

    return exitEdit;
  }

  handleProjectDelete() {
    this.display.removeElement();
    this.deleteHandler(this.index);
  }

  displayProject() {
    this.display = new ProjectDisplay(this.name,
      this.priority,
      this.handleProjectEdit.bind(this),
      this.handleProjectDelete.bind(this));
  }

  setIndex(newIndex) {
    this.index = newIndex;
    this.toDoManager.reIndex(newIndex);
  }
}

export default Project;
