import * as Factory from './factories';
import * as Storage from './storage';
import {
  itemCheck, projectSelect, enterProjectEditMode, toggleSidebar,
} from './toggler';

// Aux methods

function getSelectedProjectIndex() {
  const projectsContainer = document.getElementById('projects-container');
  const selectedProject = document.getElementsByClassName('selected')[0];
  const childNodes = Array.from(projectsContainer.children);

  return Array.prototype.indexOf.call(childNodes, selectedProject);
}

// Side bar

function loadSideBarToggle() {
  const fHamburgerIcon = document.getElementById('f-hamburger-icon-click');
  const hamburgerIcon = document.getElementById('hamburger-icon-click');

  hamburgerIcon.onclick = toggleSidebar;
  fHamburgerIcon.onclick = toggleSidebar;
}

// Project logic

function sortProjects() {
  const toDoProjects = Array.from(document.getElementById('projects-container').children);
  const modelPriority = ['uh-priority', 'high-priority', 'medium-priority', 'low-priority'];

  const getClassPriority = className => modelPriority.findIndex(element => element === className);

  const sortByChildrenPriority = (a, b) => {
    const aIndex = getClassPriority(a.firstElementChild.classList[2]);
    const bIndex = getClassPriority(b.firstElementChild.classList[2]);
    if (bIndex < aIndex) return 1;
    if (bIndex > aIndex) return -1;
    return 0;
  };

  toDoProjects.sort(sortByChildrenPriority);

  toDoProjects.forEach(toDoProject => { toDoProject.parentNode.appendChild(toDoProject); });
}

function sortToDos() {
  const toDoContainers = Array.from(document.getElementById('to-do-container').children);
  const modelPriority = ['uh-priority', 'high-priority', 'medium-priority', 'low-priority'];

  const getClassPriority = className => modelPriority.findIndex(element => element === className);
  const sortToDo = (a, b) => {
    if (a.classList.contains('checked') && !b.classList.contains('checked')) return 1;
    if (a.classList.contains('checked') && b.classList.contains('checked')) return 0;
    if (!a.classList.contains('checked') && b.classList.contains('checked')) return -1;

    const aPriority = getClassPriority(a.lastElementChild.classList[0]);
    const bPriority = getClassPriority(b.lastElementChild.classList[0]);

    if (aPriority < bPriority) return -1;
    if (aPriority > bPriority) return 1;
    return 0;
  };

  toDoContainers.sort(sortToDo);
  toDoContainers.forEach(toDoElement => toDoElement.parentNode.appendChild(toDoElement));
}

function saveToDoItems() {
  const toDoContainer = document.getElementById('to-do-container');
  const toDoItems = Array.from(toDoContainer.children).filter(item => !item.classList.contains('to-do-item-edit'));
  const toDoList = toDoItems.map(toDoItem => ({
    priority: toDoItem.lastElementChild.classList[0],
    checked: toDoItem.classList.contains('checked'),
    text: toDoItem.firstElementChild.textContent,
  }));

  Storage.saveToDo({
    index: getSelectedProjectIndex(),
    toDoList,
  });
}

function loadToDoChecker() {
  const toDoItems = Array.from(document.getElementsByClassName('to-do-item'));

  toDoItems.forEach(item => {
    item.onclick = (e) => {
      if (e.target.classList.contains('enter-edit-mode')) {
        const text = item.firstElementChild.textContent;
        const toDoEdit = Factory.toDoListEdit(text);
        const toDoContainer = document.getElementById('to-do-container');
        const currentEdit = document.getElementById('to-do-item-edit');
        const deleteToDo = toDoEdit.lastElementChild;

        item.remove();
        if (currentEdit) currentEdit.remove();
        toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);

        const inputText = document.getElementById('to-do-item-edit-input');
        const prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector'));

        inputText.focus();
        prioritySelectors.forEach(prioritySelector => {
          prioritySelector.onclick = () => {
            // handleToDoPrioritySelectorExit(prioritySelector);
            const priority = prioritySelector.classList[0];
            const text = prioritySelector.parentElement.firstElementChild.value;
            const newToDoElement = Factory.toDoItem({ text, priority });
            const toDoContainer = document.getElementById('to-do-container');
            const editToDo = document.getElementById('to-do-item-edit');

            if (text.length === 0 || !text.trim()) return;

            editToDo.remove();

            toDoContainer.insertBefore(newToDoElement, toDoContainer.firstChild);
            loadToDoChecker();

            sortToDos();
          };
        });

        deleteToDo.onclick = () => {
          toDoEdit.remove();
        };
      } else {
        itemCheck(item);
        sortToDos();
        saveToDoItems();
      }
    };
  });
}

function handleToDoPrioritySelectorExit(selectedPriority) {
  const priority = selectedPriority.classList[0];
  const text = selectedPriority.parentElement.firstElementChild.value;
  const newToDoElement = Factory.toDoItem({ text, priority });
  const toDoContainer = document.getElementById('to-do-container');
  const editToDo = document.getElementById('to-do-item-edit');

  if (text.length === 0 || !text.trim()) return;

  editToDo.remove();

  toDoContainer.insertBefore(newToDoElement, toDoContainer.firstChild);
  loadToDoChecker();

  sortToDos();
}

function handlePrioritySelectorExit(selectedPriority) {
  const selectedPriorityClass = selectedPriority.classList[0];
  const savedText = selectedPriority.parentElement.firstElementChild.value;
  const projectContainer = selectedPriority.parentNode.parentNode.firstElementChild;

  projectContainer.classList.remove('uh-priority', 'high-priority', 'medium-priority', 'low-priority');
  projectContainer.classList.add(selectedPriorityClass);
  projectContainer.parentElement.firstElementChild.firstElementChild.innerHTML = savedText;

  sortProjects();
  Storage.saveProject({
    title: savedText,
    priority: selectedPriorityClass,
    index: getSelectedProjectIndex(),
  });
}

function loadPrioritySelector() {
  const prioritySelector = Array.from(document.getElementsByClassName('priority-selector'));

  prioritySelector.forEach(selectedPriority => {
    selectedPriority.onclick = () => { handlePrioritySelectorExit(selectedPriority); };
  });
}

function loadToDoChecklist(toDoList) {
  const cardContainer = document.getElementById('card-container');
  const oldToDoContainer = document.getElementById('to-do-container');
  const toDoContainer = Factory.toDoList(toDoList);

  if (oldToDoContainer !== null) oldToDoContainer.remove();

  cardContainer.appendChild(toDoContainer);
  loadToDoChecker();
}

function handleProjectSelect(projectItem) {
  projectSelect(projectItem);

  const project = Storage.readProject(getSelectedProjectIndex());
  const projectTitle = document.getElementById('project-title');

  projectTitle.classList.remove('title-uh-priority', 'title-high-priority', 'title-medium-priority', 'title-low-priority');
  projectTitle.classList.add(`title-${project.priority}`);
  projectTitle.textContent = project.title;
  loadToDoChecklist(project.toDo);
  sortToDos();
}

function loadClickableProjects() {
  const projectItems = Array.from(document.getElementsByClassName('to-do-project'));

  projectItems.forEach(projectItem => {
    projectItem.onclick = (e) => {
      const targetClassList = e.target.classList;
      if (targetClassList.contains('delete-icon')) {
        const editContainer = document.getElementsByClassName('to-do-edit')[0];

        if (editContainer) {
          Storage.deleteProject(getSelectedProjectIndex());
          editContainer.remove();
        }
      } else if (targetClassList.contains('edit-icon')) {
        enterProjectEditMode(projectItem);
      } else {
        handleProjectSelect(projectItem);
      }
    };
  });
}

function loadNewProject({ title, priority = 'low-priority', toDo = [] }, creatingProject = true) {
  const projectContainer = document.getElementById('projects-container');
  const newProject = Factory.project({ title, priority, toDo });

  projectContainer.appendChild(newProject);

  if (creatingProject) {
    loadClickableProjects();
    loadPrioritySelector();

    Storage.saveProject({ title: 'To-do' });
    handleProjectSelect(newProject);
    enterProjectEditMode(newProject);
  }
}

function loadStorageProjects() {
  const projects = Storage.readProjects();
  projects.forEach(project => { loadNewProject(project, false); });
  if (projects.length > 0) { handleProjectSelect(document.getElementById('projects-container').firstElementChild); }
}

function loadNewToDo() {
  const toDoEdit = Factory.toDoListEdit();
  const toDoContainer = document.getElementById('to-do-container');

  if (document.getElementById('to-do-item-edit') == null) {
    toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);
  }

  const inputText = document.getElementById('to-do-item-edit-input');
  const prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector'));

  inputText.focus();
  prioritySelectors.forEach(prioritySelector => {
    prioritySelector.onclick = () => { handleToDoPrioritySelectorExit(prioritySelector); };
  });
  loadToDoChecker();
}

function loadAddProject() {
  const addProjectButton = document.getElementById('add-project-icon');
  const addToDoButton = document.getElementById('add-to-do-icon');

  addProjectButton.onclick = loadNewProject;
  addToDoButton.onclick = loadNewToDo;
}

// To-do logic

function firstTimeLoad() {
  // Load tutorial
  if (Storage.shouldAddTutorial()) Storage.addTutorial();

  // Side bar toggle
  loadSideBarToggle();

  // Project logic
  loadAddProject();
  loadStorageProjects();
  sortProjects();
  loadClickableProjects();

  // To-do Logic

  loadToDoChecker();
  loadPrioritySelector();
}

export default firstTimeLoad;
