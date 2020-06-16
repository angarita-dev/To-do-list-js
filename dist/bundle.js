/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/factories.js":
/*!*****************************!*\
  !*** ./src/js/factories.js ***!
  \*****************************/
/*! exports provided: project, toDoList, toDoItem, toDoListEdit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"project\", function() { return project; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toDoList\", function() { return toDoList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toDoItem\", function() { return toDoItem; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toDoListEdit\", function() { return toDoListEdit; });\n// Project logic\nfunction project({title='To-do',priority='low-priority'}){\n  let template = document.createElement('template');\n  let html = `\n    <li class='to-do-project'>\n      <div class='project-container text-container ${priority}'>\n        <h4 class='text'>${title}</h4>\n      </div>\n      <div class='edit-container'>\n        <input class='text edit-project'/>\n        <span class='low-priority priority-selector'></span>\n        <span class='medium-priority priority-selector'></span>\n        <span class='high-priority priority-selector'></span>\n        <span class='uh-priority priority-selector'></span>\n      </div>\n      <svg class='icon'>\n        <use class='edit-icon' xlink:href='#edit-icon' />\n        <use class='delete-icon delete-project-icon' xlink:href='#delete-icon' />\n      </svg>\n    </li>\n  `.trim();\n  template.innerHTML = html;\n  return template.content.firstChild;\n}\n\n// To-do logic\n\nfunction toDoList(toDoItemsList){\n  let toDoContainer = document.createElement('ul');\n  toDoContainer.classList.add('to-do-container');\n  toDoContainer.setAttribute('id','to-do-container');\n  toDoItemsList.map( toDoElement => {\n    let text;\n    let priority;\n    let checked;\n    ({text,priority,checked} = toDoElement);\n    toDoContainer.appendChild(\n      toDoItem({text,priority,checked})\n    );\n  });\n  return toDoContainer;\n}\n\nfunction toDoItem({text,priority,checked=false}){\n  console.log({text,priority,checked});\n  let template = document.createElement('template');\n  let checkedClass = checked ? 'checked' : '';\n  let html = `\n    <li class=\"to-do-item ${checkedClass}\">\n      <p>${text}</p>\n      <span class=\"${priority} enter-edit-mode\"/>\n    </li>\n  `.trim();\n  template.innerHTML = html;\n  return template.content.firstChild;\n}\n\nfunction toDoListEdit(value='') {\n  let template = document.createElement('template');\n  template.innerHTML = `\n    <li class=\"to-do-item-edit\" id='to-do-item-edit'>\n      <input class=\"text edit-project\" id='to-do-item-edit-input' value=\"${value}\" placeholder=\"To do Item name\"/>\n      <span class=\"low-priority to-do-priority-selector\"></span>\n      <span class=\"medium-priority to-do-priority-selector\"></span>\n      <span class=\"high-priority to-do-priority-selector\"></span>\n      <span class=\"uh-priority to-do-priority-selector\"></span>\n       <svg class='icon'>\n        <use class='delete-icon' xlink:href='#delete-icon' />\n      </svg>\n    </li>\n  `.trim();\n  return template.content.firstChild;\n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/factories.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadder.js */ \"./src/js/loadder.js\");\n\n\nObject(_loadder_js__WEBPACK_IMPORTED_MODULE_0__[\"firstTimeLoad\"])();\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/loadder.js":
/*!***************************!*\
  !*** ./src/js/loadder.js ***!
  \***************************/
/*! exports provided: firstTimeLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firstTimeLoad\", function() { return firstTimeLoad; });\n/* harmony import */ var _toggler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toggler.js */ \"./src/js/toggler.js\");\n/* harmony import */ var _factories_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories.js */ \"./src/js/factories.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ \"./src/js/storage.js\");\n\n \n\n\nfunction firstTimeLoad(){\n  // Project logic\n  loadAddProject();\n  loadStorageProjects();\n  loadClickableProjects();\n  loadEditIcons();\n\n  // To-do Logic\n\n  loadToDoChecker();\n  loadPrioritySelector();\n};\n\n// Project logic\n\nfunction loadStorageProjects() {\n  let projects = _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"readProjects\"]();\n  projects.forEach( project => { loadNewProject(project,false) });\n}\n\nfunction loadAddProject() {\n  let addProjectButton = document.getElementById('add-project-icon');\n  let addToDoButton = document.getElementById('add-to-do-icon');\n\n  addProjectButton.addEventListener('click', loadNewProject);\n  addToDoButton.addEventListener('click', loadNewToDo);\n}\n\nfunction loadToDoChecklist(toDoList) {\n  let cardContainer = document.getElementById('card-container');\n  let oldToDoContainer = document.getElementById('to-do-container');\n  let toDoContainer = _factories_js__WEBPACK_IMPORTED_MODULE_1__[\"toDoList\"](toDoList);\n\n  if(oldToDoContainer !== null) oldToDoContainer.remove();\n\n  cardContainer.appendChild(toDoContainer);\n  loadToDoChecker();\n}\n\nfunction loadNewProject({title,priority='low-priority',toDo=[]}, creatingProject=true) {\n  let projectContainer = document.getElementById('projects-container');\n  let newProject = _factories_js__WEBPACK_IMPORTED_MODULE_1__[\"project\"]({title,priority,toDo});\n  \n  projectContainer.appendChild(newProject);\n  loadClickableProjects();\n  loadEditIcons();\n  loadPrioritySelector();\n\n  if(creatingProject){\n    _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"saveProject\"]({title: 'To-do'});\n    handleProjectSelect(newProject);\n    Object(_toggler_js__WEBPACK_IMPORTED_MODULE_0__[\"enterProjectEditMode\"])(newProject);\n  }\n}\n\nfunction loadClickableProjects() {\n  let projectItems = Array.from(document.getElementsByClassName('to-do-project'));\n\n  projectItems.forEach( projectItem => {\n    projectItem.addEventListener('click', (e) => {\n      let targetClassList = e.target.classList;\n      if(targetClassList.contains('edit-icon') || targetClassList.contains('icon')){ return false }\n\n\n      handleProjectSelect(projectItem);\n    })\n  });\n}\n\nfunction handleProjectSelect(projectItem) {\n  Object(_toggler_js__WEBPACK_IMPORTED_MODULE_0__[\"projectSelect\"])(projectItem);\n\n  let project = _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"readProject\"](getSelectedProjectIndex());\n  let projectTitle = document.getElementById('project-title');\n\n  projectTitle.classList.remove('title-uh-priority','title-high-priority','title-medium-priority','title-low-priority');\n  projectTitle.classList.add(`title-${project.priority}`);\n  projectTitle.textContent = project.title;\n  loadToDoChecklist(project.toDo);\n}\n\nfunction loadDeleteProject() {\n  let editContainer = document.getElementsByClassName('to-do-edit')[0];\n  let editIcon = editContainer.lastElementChild;\n  editIcon.addEventListener('click', (e) => { \n    if(!e.target.classList.contains('delete-icon')) return false\n\n    _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"deleteProject\"](getSelectedProjectIndex());\n    editContainer.remove();\n  });\n}\n\nfunction loadEditIcons() {\n  let editIcons = Array.from(document.getElementsByClassName('edit-icon'));\n\n  editIcons.forEach( editIcon => {\n    let projectContainer = editIcon.parentElement.parentElement;\n    editIcon.parentElement.addEventListener('click', () => {\n      Object(_toggler_js__WEBPACK_IMPORTED_MODULE_0__[\"enterProjectEditMode\"])(projectContainer);\n      loadDeleteProject();\n    });\n  });\n}\n\n// To-do logic\n\nfunction loadNewToDo() {\n  let toDoEdit = _factories_js__WEBPACK_IMPORTED_MODULE_1__[\"toDoListEdit\"]();\n  let toDoContainer = document.getElementById('to-do-container');\n\n  if(document.getElementById('to-do-item-edit') == null){\n    toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);\n  }\n\n  let inputText = document.getElementById('to-do-item-edit-input'); \n  let prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector')); \n\n  inputText.focus();\n  prioritySelectors.forEach( prioritySelector => { \n    prioritySelector.addEventListener('click', () => { handleToDoPrioritySelectorExit(prioritySelector)});\n  });\n  loadToDoChecker();\n}\n\nfunction loadToDoChecker() {\n  let toDoItems = Array.from(document.getElementsByClassName('to-do-item'));\n\n  toDoItems.forEach( item => {\n    item.addEventListener('click', e => {\n      if(e.target.classList.contains('enter-edit-mode')){\n        enterEditToDo(item);\n      } else {\n        Object(_toggler_js__WEBPACK_IMPORTED_MODULE_0__[\"itemCheck\"])(item);\n        saveToDoItems();\n      }\n    });\n  });\n}\n\nfunction loadPrioritySelector() {\n  let prioritySelector = Array.from(document.getElementsByClassName('priority-selector'));\n\n  prioritySelector.forEach( selectedPriority => { \n    selectedPriority.addEventListener('click', () => { handlePrioritySelectorExit(selectedPriority) })\n  });\n}\n\nfunction handlePrioritySelectorExit(selectedPriority) {\n  let selectedPriorityClass = selectedPriority.classList[0];\n  let savedText = selectedPriority.parentElement.firstElementChild.value;\n  let projectContainer = selectedPriority.parentNode.parentNode.firstElementChild;\n\n  projectContainer.classList.remove('uh-priority','high-priority','medium-priority','low-priority');\n  projectContainer.classList.add(selectedPriorityClass);\n  projectContainer.parentElement.firstElementChild.firstElementChild.innerHTML = savedText;\n\n  _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"saveProject\"]({\n    title: savedText,\n    priority: selectedPriorityClass, \n    index: getSelectedProjectIndex()});\n}\n\n\nfunction handleToDoPrioritySelectorExit(selectedPriority) {\n  let priority = selectedPriority.classList[0];\n  let text = selectedPriority.parentElement.firstElementChild.value;\n  let newToDoElement = _factories_js__WEBPACK_IMPORTED_MODULE_1__[\"toDoItem\"]({text,priority});\n  let toDoContainer = document.getElementById('to-do-container');\n  let editToDo = document.getElementById('to-do-item-edit')\n\n  editToDo.remove();\n  toDoContainer.insertBefore(newToDoElement, toDoContainer.firstChild);\n  loadToDoChecker();\n\n  saveToDoItems();\n}\n\nfunction saveToDoItems(){\n  let toDoContainer = document.getElementById('to-do-container');\n  let toDoItems = Array.from(toDoContainer.children).filter(item => !item.classList.contains('to-do-item-edit'));\n  let toDoList = toDoItems.map( toDoItem => {\n    console.log(toDoItem.children)\n    return {\n      priority: toDoItem.lastElementChild.classList[0],\n      checked: toDoItem.classList.contains('checked'),\n      text: toDoItem.firstElementChild.textContent,\n    }\n  });\n\n  _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"saveToDo\"]({\n    index: getSelectedProjectIndex(),\n    toDoList\n  })\n}\n\n\nfunction enterEditToDo(toDoItem) {\n  let text = toDoItem.firstElementChild.textContent;\n  let toDoEdit = _factories_js__WEBPACK_IMPORTED_MODULE_1__[\"toDoListEdit\"](text);\n  let toDoContainer = document.getElementById('to-do-container');\n  let currentEdit = document.getElementById('to-do-item-edit');\n  let deleteToDo = toDoEdit.lastElementChild;\n\n  toDoItem.remove();\n  if(currentEdit) currentEdit.remove()\n  toDoContainer.insertBefore(toDoEdit, toDoContainer.firstChild);\n  \n\n  let inputText = document.getElementById('to-do-item-edit-input'); \n  let prioritySelectors = Array.from(document.getElementsByClassName('to-do-priority-selector')); \n\n  inputText.focus();\n  prioritySelectors.forEach( prioritySelector => { \n    prioritySelector.addEventListener('click', () => { handleToDoPrioritySelectorExit(prioritySelector)});\n  });\n\n  deleteToDo.addEventListener('click', () => { toDoEdit.remove() });\n}\n\n// Aux methods\n\nfunction getSelectedProjectIndex(){\n  let projectsContainer = document.getElementById('projects-container');\n  let selectedProject = document.getElementsByClassName('selected')[0];\n  let childNodes = Array.from(projectsContainer.childNodes).filter(item => item.nodeType != Node.TEXT_NODE);\n\n  return Array.prototype.indexOf.call(childNodes,  selectedProject) \n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/loadder.js?");

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! exports provided: saveProject, readProject, readProjects, saveToDo, deleteProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveProject\", function() { return saveProject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readProject\", function() { return readProject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readProjects\", function() { return readProjects; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveToDo\", function() { return saveToDo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteProject\", function() { return deleteProject; });\n// Project logic\nfunction saveProject({title, priority='low-priority',index=-1}){\n  let newProjects;\n  let oldProjects = localStorage.getItem('projects');\n\n  if (oldProjects == null){\n    newProjects = [{title, priority, toDo:[]}]\n  } else if(index == -1) {\n    // Should append project\n    newProjects = [JSON.parse(oldProjects),{title,priority,toDo:[]}].flat();\n  } else {\n    newProjects = JSON.parse(oldProjects);\n    newProjects[index].title = title;\n    newProjects[index].priority = priority;\n  }\n\n  localStorage.clear();\n  localStorage.setItem('projects', JSON.stringify(newProjects));\n}\n\nfunction readProject(index) {\n  let projects = JSON.parse(localStorage.getItem('projects'));\n\n  return projects[index];\n}\n\nfunction deleteProject(index){\n  let projects = JSON.parse(localStorage.getItem('projects'));\n  projects.splice(index,1);\n  \n  localStorage.clear();\n  localStorage.setItem('projects', JSON.stringify(projects));\n}\n\nfunction readProjects() {\n  let projects = JSON.parse(localStorage.getItem('projects'));\n  if(projects == null) return [];\n\n  return projects;\n}\n\n// To-Do logic\nfunction saveToDo({index, toDoList}){\n  if(index == -1) return;\n  let newProjects;\n  let oldProjects = localStorage.getItem('projects');\n\n  newProjects = JSON.parse(oldProjects);\n  newProjects[index].toDo = toDoList;\n\n  localStorage.clear();\n  localStorage.setItem('projects', JSON.stringify(newProjects)); \n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/storage.js?");

/***/ }),

/***/ "./src/js/toggler.js":
/*!***************************!*\
  !*** ./src/js/toggler.js ***!
  \***************************/
/*! exports provided: itemCheck, projectSelect, exitProjectEditMode, enterProjectEditMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"itemCheck\", function() { return itemCheck; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectSelect\", function() { return projectSelect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exitProjectEditMode\", function() { return exitProjectEditMode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enterProjectEditMode\", function() { return enterProjectEditMode; });\nfunction itemCheck(toDoItem) {\n  toDoItem.classList.contains('checked') ? \n    toDoItem.classList.remove('checked') :\n    toDoItem.classList.add('checked')\n}\n\nfunction projectSelect(selectedProjectContainer) {\n  let projectContainers = Array.from(document.getElementsByClassName('to-do-project'));\n  projectContainers.map( projectContainer => {\n    projectContainer.classList.remove('selected');\n    exitProjectEditMode(projectContainer);\n  });\n  selectedProjectContainer.classList.add('selected');\n}\n\nfunction exitProjectEditMode(editContainer) {\n  editContainer.classList.remove('to-do-edit');\n}\n\nfunction enterProjectEditMode(projectContainer) {\n  let titleText = projectContainer.childNodes[1].childNodes[1].innerHTML;\n  let inputText = projectContainer.childNodes[3].childNodes[1];\n  console.log(titleText);\n  projectContainer.classList.add('to-do-edit');\n  inputText.value = titleText\n  inputText.focus();\n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/toggler.js?");

/***/ })

/******/ });