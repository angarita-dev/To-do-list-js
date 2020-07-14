import ProjectStorage from './storage';
import ProjectDisplay from './display';
import ToDoManager from './to-do-manager';

class Project {
  constructor(name = 'To-do Project', priority = 'low-priority', toDos = [], index = -1) {
    this.name = name;
    this.priority = priority;
    this.index = index;
    this.toDoManager = new ToDoManager(index, toDos);
  }

  handleProjectEdit() {
    const exitEdit = (name, priority) => {
      this.name = name;
      this.priority = priority;

      this.display.changeTitle(this.name);
      this.display.changePriority(this.priority);
      ProjectStorage.saveProject(this.name, this.priority, this.index);
    };

    this.display.editProject(exitEdit);
  }

  handleProjectDelete() {
    this.display.removeElement();

    ProjectStorage.deleteProject(this.index);
  }

  displayProject() {
    this.display = new ProjectDisplay(this.name,
      this.priority,
      this.handleProjectEdit.bind(this),
      this.handleProjectDelete.bind(this));
  }
}

export default Project;
