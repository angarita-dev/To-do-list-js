import Factory from './factory';

class Display {
  static removeSelected() {
    const projectsSelected = Array.from(document.getElementsByClassName('selected'));

    projectsSelected.forEach(project => project.classList.remove('selected'));
  }

  selectProject() {
    Display.removeSelected();

    this.projectContainer.classList.add('selected');
  }

  editProject(handleFunction) {
    const textContainerElement = this.projectContainer.querySelector('.text-container');
    const titleElement = textContainerElement.querySelector('.text');

    const editContainer = this.projectContainer.querySelector('.edit-container');
    const prioritySelectors = Array.from(editContainer.querySelectorAll('.priority-selector'));
    const nameInputElement = editContainer.querySelector('.edit-project');

    nameInputElement.value = titleElement.textContent;
    prioritySelectors.forEach(prioritySelector => {
      prioritySelector.onclick = () => {
        const projectName = nameInputElement.value;
        const selectedPriority = Array.from(prioritySelector.classList)
          .filter(className => className.includes('-priority'))[0];

        this.projectContainer.classList.remove('to-do-edit');
        handleFunction(projectName, selectedPriority);
      };
    });
  }

  static displayProject(title, priority) {
    const projectsContainer = document.getElementById('projects-container');
    const project = Factory.project(title, priority);

    projectsContainer.append(project);
    return project;
  }

  loaders(handleProjectEdit, handleProjectDelete) {
    const iconContainer = this.projectContainer.querySelector('.icon-container');

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
    this.projectContainer = Display.displayProject(title, priority);

    this.loaders(handleProjectEdit, handleProjectDelete);
  }

  changeTitle(newTitle) {
    const textContainerElement = this.projectContainer.querySelector('.text-container');
    const titleElement = textContainerElement.querySelector('.text');

    titleElement.textContent = newTitle;
  }

  changePriority(newPriority) {
    const priorityContainer = this.projectContainer.firstElementChild;

    const previousPriority = Array.from(priorityContainer.classList)
      .filter(className => className.includes('-priority'))[0];

    priorityContainer.classList.remove(previousPriority);
    priorityContainer.classList.add(newPriority);
  }

  removeElement() {
    this.projectContainer.remove();
  }
}

export default Display;
