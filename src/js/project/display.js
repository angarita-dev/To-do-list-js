import * as Factory from './factory';

class Display {
  static removeSelected() {
    const projectsSelected = document.getElementsByClassName('selected');

    projectsSelected.forEach(project => project.classList.remove('selected'));
  }

  selectProject() {
    this.removeSelected();

    this.projectContainer.classList.add('selected');
  }

  editProject(handleFunction) {
    const editContainer = this.projectContainer.querySelector('.edit-container');
    const prioritySelectors = this.projectContainer.querySelector('.priority-selector');

    prioritySelectors.forEach(prioritySelector => {
      const projectName = editContainer.querySelector('#edit-project').value;
      const selectedPriority = Array.from(prioritySelector.classList)
        .filter(className => className.includes('-priority'))[0];

      this.projectContainer.classList.remove('to-do-edit');
      handleFunction(projectName, selectedPriority);
    });
  }

  static displayProject(title, priority) {
    const projectsContainer = document.getElementById('projects-container');
    const project = Factory.project(title, priority);

    projectsContainer.append(project);
    return project;
  }

  loaders(handleProjectEdit, handleProjectDelete) {
    const iconContainer = this.projectContainer.querySelector('.icon');

    const iconEdit = iconContainer.querySelector('.edit-icon');
    const iconDelete = iconContainer.querySelector('.delete-icon');

    this.projectContainer.onclick = () => { this.selectProject(); };
    iconEdit.onclick = () => {
      this.projectContainer.classList.add('to-do-edit');
      handleProjectEdit();
    };
    iconDelete.onclick = () => { handleProjectDelete(); };
  }

  constructor(title, priority, handleProjectEdit, handleProjectDelete) {
    this.projectContainer = this.displayProject(title, priority);

    this.loaders(handleProjectEdit, handleProjectDelete);
  }

  changeTitle(newTitle) {
    const textContainerElement = this.projectContainer.querySelector('.text-container');
    const titleElement = textContainerElement.querySelector('.text');

    titleElement.textContent = newTitle;
  }

  changePriority(newPriority) {
    const priorityContainer = this.projectContainer.firstElementChild;

    const previousPriority = priorityContainer.classList.filter(className => className.includes('-priority'))[0];

    priorityContainer.classList.remove(previousPriority);
    priorityContainer.classList.add(newPriority);
  }

  removeElement() {
    this.projectContainer.remove();
  }
}

export default Display;
