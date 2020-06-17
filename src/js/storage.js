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

  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(newProjects));
}

function readProject(index) {
  const projects = JSON.parse(localStorage.getItem('projects'));

  return projects[index];
}

function deleteProject(index) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  projects.splice(index, 1);

  localStorage.clear();
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

  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(newProjects));
}

export {
  saveProject,
  readProject,
  readProjects,
  saveToDo,
  deleteProject,
};
