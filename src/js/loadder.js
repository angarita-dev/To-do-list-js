import { itemCheck, projectSelect, exitProjectEditMode, enterProjectEditMode } from './toggler.js';
import * as Factory from './factories.js'; 
import * as Storage from './storage.js';

function firstTimeLoad(){
  // Project logic
  loadAddProject();
  loadStorageProjects();
  loadClickableProjects();
  loadEditIcons();

  // To-do Logic

  loadToDoChecker();
  loadPrioritySelector();
};

// Project logic

function loadStorageProjects() {
  let projects = Storage.readProjects();
  projects.forEach( project => { loadNewProject(project,false) });
}

function loadAddProject() {
  let addProjectButton = document.getElementById('add-project-icon');
  let addToDoButton = document.getElementById('add-to-do-icon');

  addProjectButton.addEventListener('click', loadNewProject);
  addToDoButton.addEventListener('click', loadNewToDo);
}

function loadToDoChecklist(toDoList) {
  let cardContainer = document.getElementById('card-container');
  let oldToDoContainer = document.getElementById('to-do-container');
  let toDoContainer = Factory.toDoList(toDoList);

  if(oldToDoContainer !== null) oldToDoContainer.remove();

  cardContainer.appendChild(toDoContainer);
  loadToDoChecker();
}

function loadNewProject({title,priority='low-priority',toDo=[]}, creatingProject=true) {
  let projectContainer = document.getElementById('projects-container');
  let newProject = Factory.project({title,priority,toDo});
  
  projectContainer.appendChild(newProject);
  loadClickableProjects();
  loadEditIcons();
  loadPrioritySelector();

  if(creatingProject){
    Storage.saveProject({title: 'To-do'});
    handleProjectSelect(newProject);
    enterProjectEditMode(newProject);
  }
}

function loadClickableProjects() {
  let projectItems = Array.from(document.getElementsByClassName('to-do-project'));

  projectItems.forEach( projectItem => {
    projectItem.addEventListener('click', (e) => {
      let targetClassList = e.target.classList;
      if(targetClassList.contains('edit-icon') || targetClassList.contains('icon')){ return false }


      handleProjectSelect(projectItem);
    })
  });
}

function handleProjectSelect(projectItem) {
  projectSelect(projectItem);

  let project = Storage.readProject(getSelectedProjectIndex());
  let projectTitle = document.getElementById('project-title');

  projectTitle.classList.remove('title-uh-priority','title-high-priority','title-medium-priority','title-low-priority');
  projectTitle.classList.add(`title-${project.priority}`);
  projectTitle.textContent = project.title;
  loadToDoChecklist(project.toDo);
}

function loadDeleteProject() {
  let editContainer = document.getElementsByClassName('to-do-edit')[0];
  let editIcon = editContainer.lastElementChild;
  editIcon.addEventListener('click', (e) => { 
    if(!e.target.classList.contains('delete-icon')) return false

    Storage.deleteProject(getSelectedProjectIndex());
    editContainer.remove();
  });
}

function loadEditIcons() {
  let editIcons = Array.from(document.getElementsByClassName('edit-icon'));

  editIcons.forEach( editIcon => {
    let projectContainer = editIcon.parentElement.parentElement;
    editIcon.parentElement.addEventListener('click', () => {
      enterProjectEditMode(projectContainer);
      loadDeleteProject();
    });
  });
}

// To-do logic

function loadNewToDo() {
  let toDoEdit = Factory.toDoListEdit();
  let toDoContainer = document.getElementById('to-do-container');

  if(document.getElementById('to-do-item-edit') == null){
    toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);
  }

  let inputText = document.getElementById('to-do-item-edit-input'); 
  let prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector')); 

  inputText.focus();
  prioritySelectors.forEach( prioritySelector => { 
    prioritySelector.addEventListener('click', () => { handleToDoPrioritySelectorExit(prioritySelector)});
  });
  loadToDoChecker();
}

function loadToDoChecker() {
  let toDoItems = Array.from(document.getElementsByClassName('to-do-item'));

  toDoItems.forEach( item => {
    item.addEventListener('click', e => {
      if(e.target.classList.contains('enter-edit-mode')){
        enterEditToDo(item);
      } else {
        itemCheck(item);
        saveToDoItems();
      }
    });
  });
}

function loadPrioritySelector() {
  let prioritySelector = Array.from(document.getElementsByClassName('priority-selector'));

  prioritySelector.forEach( selectedPriority => { 
    selectedPriority.addEventListener('click', () => { handlePrioritySelectorExit(selectedPriority) })
  });
}

function handlePrioritySelectorExit(selectedPriority) {
  let selectedPriorityClass = selectedPriority.classList[0];
  let savedText = selectedPriority.parentElement.firstElementChild.value;
  let projectContainer = selectedPriority.parentNode.parentNode.firstElementChild;

  projectContainer.classList.remove('uh-priority','high-priority','medium-priority','low-priority');
  projectContainer.classList.add(selectedPriorityClass);
  projectContainer.parentElement.firstElementChild.firstElementChild.innerHTML = savedText;

  Storage.saveProject({
    title: savedText,
    priority: selectedPriorityClass, 
    index: getSelectedProjectIndex()});
}


function handleToDoPrioritySelectorExit(selectedPriority) {
  let priority = selectedPriority.classList[0];
  let text = selectedPriority.parentElement.firstElementChild.value;
  let newToDoElement = Factory.toDoItem({text,priority});
  let toDoContainer = document.getElementById('to-do-container');
  let editToDo = document.getElementById('to-do-item-edit')

  editToDo.remove();
  toDoContainer.insertBefore(newToDoElement, toDoContainer.firstChild);
  loadToDoChecker();

  saveToDoItems();
}

function saveToDoItems(){
  let toDoContainer = document.getElementById('to-do-container');
  let toDoItems = Array.from(toDoContainer.children).filter(item => !item.classList.contains('to-do-item-edit'));
  let toDoList = toDoItems.map( toDoItem => {
    return {
      priority: toDoItem.lastElementChild.classList[0],
      checked: toDoItem.classList.contains('checked'),
      text: toDoItem.firstElementChild.textContent,
    }
  });

  Storage.saveToDo({
    index: getSelectedProjectIndex(),
    toDoList
  })
}


function enterEditToDo(toDoItem) {
  let text = toDoItem.firstElementChild.textContent;
  let toDoEdit = Factory.toDoListEdit(text);
  let toDoContainer = document.getElementById('to-do-container');
  let currentEdit = document.getElementById('to-do-item-edit');
  let deleteToDo = toDoEdit.lastElementChild;

  toDoItem.remove();
  if(currentEdit) currentEdit.remove()
  toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);
  

  let inputText = document.getElementById('to-do-item-edit-input'); 
  let prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector')); 

  inputText.focus();
  prioritySelectors.forEach( prioritySelector => { 
    prioritySelector.addEventListener('click', () => { handleToDoPrioritySelectorExit(prioritySelector)});
  });

  deleteToDo.addEventListener('click', () => { toDoEdit.remove() });
}

// Aux methods

function getSelectedProjectIndex(){
  let projectsContainer = document.getElementById('projects-container');
  let selectedProject = document.getElementsByClassName('selected')[0];
  let childNodes = Array.from(projectsContainer.childNodes).filter(item => item.nodeType != Node.TEXT_NODE);

  return Array.prototype.indexOf.call(childNodes,  selectedProject) 
}

export { firstTimeLoad }
