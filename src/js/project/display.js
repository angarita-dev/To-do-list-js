import Factory from './factory';

class Display {
  static removeSelected() {
    const projects = Array.from(document.getElementsByClassName('to-do-project'));
    const projectsSelected = projects.filter(project => project.classList.contains('selected'));

    projectsSelected.forEach(project => project.classList.remove('selected'));
  }

  togglePriority() {
    const priorityContainer = this.projectContainer.querySelector('.priority-edit');
    const priorityItems = Array.from(priorityContainer.children);

    priorityItems.forEach(priorityInput => {
      priorityInput.onclick = () => {
        this.removeSelectedPriorityInput();
        priorityInput.classList.add('selected');
      };
    });
  }

  removeSelectedPriorityInput() {
    const priorityContainer = this.projectContainer.querySelector('.priority-edit');
    const priorityItems = Array.from(priorityContainer.children);
    priorityItems.forEach(priorityItem => {
      priorityItem.classList.remove('selected');
    });
  }

  selectPriorityInput() {
    const editPriorityContainer = this.projectContainer.querySelector('.priority-edit');
    const priorityInputs = Array.from(editPriorityContainer.children);
    const currentPriorityContainer = this.projectContainer.querySelector('.project-container');
    const selectedPriority = Array.from(currentPriorityContainer.classList)
      .filter(className => className.includes('-priority'))[0];

    this.removeSelectedPriorityInput();
    priorityInputs.forEach(inputElement => {
      const reducer = (accumulator, current) => accumulator || current.includes(selectedPriority);
      const selectedClass = Array.from(inputElement.classList).reduce(reducer, false);
      if (selectedClass) {
        inputElement.classList.add('selected');
      }
    });
  }

  static removeEdit() {
    const projects = Array.from(document.getElementsByClassName('to-do-project'));
    const projectsSelected = projects.filter(project => project.classList.contains('to-do-edit'));

    projectsSelected.forEach(project => project.classList.remove('to-do-edit'));
  }

  selectProject() {
    Display.removeSelected();

    this.projectContainer.classList.add('selected');
  }

  enterEdit() {
    Display.removeEdit();
    this.projectContainer.classList.add('to-do-edit');
  }

  exitEdit(saveHandler) {
    const editContainer = this.projectContainer.querySelector('.edit-container');
    const selectedName = editContainer.querySelector('.edit-project').value;
    const priorityInput = editContainer.querySelector('.selected');
    const selectedPriority = Array.from(priorityInput.classList).filter(className => className.includes('-priority'))[0];
    this.projectContainer.classList.remove('to-do-edit');

    saveHandler(selectedName, selectedPriority);
  }

  editProject(exitEditHandler) {
    this.selectProject();
    this.enterEdit();

    this.togglePriority();

    const saveIcon = this.projectContainer.querySelector('.save-icon');
    saveIcon.onclick = () => this.exitEdit(exitEditHandler);
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

    this.selectPriorityInput();
    iconEdit.onclick = () => {
      const exitHandle = handleProjectEdit();
      this.editProject(exitHandle);
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

  reDisplay(newTitle, newPriority) {
    const textContainerElement = this.projectContainer.querySelector('.text-container');
    const titleElement = textContainerElement.querySelector('.text');
    const priorityContainer = this.projectContainer.firstElementChild;

    const previousPriority = Array.from(priorityContainer.classList)
      .filter(className => className.includes('-priority'))[0];

    titleElement.textContent = newTitle;
    priorityContainer.classList.remove(previousPriority);
    priorityContainer.classList.add(newPriority);

    this.selectPriorityInput();
  }

  removeElement() {
    this.projectContainer.remove();
  }
}

export default Display;
