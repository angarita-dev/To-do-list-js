import GeneralFactory from './factory';

class GeneralDisplay {
  static clearToDoList() {
    const toDoListContainer = document.getElementById('to-do-container');
    toDoListContainer.innerHTML = '';
  }

  static clearProjectList() {
    const projectList = document.getElementById('projects-container');
    projectList.innerHTML = '';
  }

  static loadNewProject(handlerFunction) {
    const projectAddIcon = document.getElementById('add-project-icon');
    projectAddIcon.onclick = () => { handlerFunction(); };
  }

  static displayNewTitle(title, priority) {
    const currentTitle = document.getElementById('project-title');
    const currentTitlePriority = Array.from(currentTitle.classList)
      .filter(className => className.includes('-priority'))[0];

    currentTitle.textContent = title;
    currentTitle.classList.remove(currentTitlePriority);
    currentTitle.classList.add(`title-${priority}`);
  }

  static disableToDoCreation() {
    const toDoListContainer = document.getElementById('to-do-container');
    const addToDoIcon = document.getElementById('add-to-do-icon');

    addToDoIcon.onclick = '';
    GeneralDisplay.clearToDoList();
    toDoListContainer.appendChild(GeneralFactory.emptyToDoList());
  }
}

export default GeneralDisplay;
