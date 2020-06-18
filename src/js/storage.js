// Project logic
function saveProject({ title, priority = 'low-priority', index = -1 }) {
  const oldProjects = localStorage.getItem('projects');
  let newProjects;

  if (oldProjects === null) {
    newProjects = [{ title, priority, toDo: [] }];
  } else if (index === -1) {
    // Should append project
    newProjects = [JSON.parse(oldProjects), { title, priority, toDo: [] }].flat();
  } else {
    newProjects = JSON.parse(oldProjects);
    newProjects[index].title = title;
    newProjects[index].priority = priority;
  }

  localStorage.setItem('projects', JSON.stringify(newProjects));
}

function readProject(index) {
  const projects = JSON.parse(localStorage.getItem('projects'));

  return projects[index];
}

function deleteProject(index) {
  console.log(index)
  const projects = JSON.parse(localStorage.getItem('projects'));
  projects.splice(index, 1);

  localStorage.setItem('projects', JSON.stringify(projects));
}

function readProjects() {
  const projects = JSON.parse(localStorage.getItem('projects'));
  if (projects == null) return [];

  return projects;
}

// To-Do logic
function saveToDo({ index, toDoList }) {
  if (index === -1) return;

  const oldProjects = localStorage.getItem('projects');
  const newProjects = JSON.parse(oldProjects);

  newProjects[index].toDo = toDoList;

  localStorage.setItem('projects', JSON.stringify(newProjects));
}

// Tutorial
function shouldAddTutorial() {
  return localStorage.getItem('tutorial') === null;
}

function addTutorial() {
  console.log('adding tutorial');
  const tutorialInfo = [{ title: 'Tutorial', priority: 'uh-priority', toDo: [{ priority: 'uh-priority', checked: false, text: 'Welcome to the to-do-list-project' }, { priority: 'uh-priority', checked: false, text: 'You can order items by priority' }, { priority: 'uh-priority', checked: false, text: 'Click on the text to mark it as done' }, { priority: 'high-priority', checked: false, text: 'You can edit by clicking the priority dot' }, { priority: 'high-priority', checked: false, text: 'You can add items by clicking the plus button' }, { priority: 'medium-priority', checked: false, text: 'Or adding project on the left sidebar' }, { priority: 'low-priority', checked: false, text: 'Items will be sorted automatically' }, { priority: 'low-priority', checked: true, text: 'This item is checked' }] }];

  localStorage.setItem('tutorial', 'true');
  localStorage.setItem('projects', JSON.stringify(tutorialInfo));
}

export {
  shouldAddTutorial,
  addTutorial,
  saveProject,
  readProject,
  readProjects,
  saveToDo,
  deleteProject,
};
