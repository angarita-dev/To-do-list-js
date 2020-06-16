// Project logic
function saveProject({title, priority='low-priority',index=-1}){
  let newProjects;
  let oldProjects = localStorage.getItem('projects');

  if (oldProjects == null){
    newProjects = [{title, priority, toDo:[]}]
  } else if(index == -1) {
    // Should append project
    newProjects = [JSON.parse(oldProjects),{title,priority,toDo:[]}].flat();
  } else {
    newProjects = JSON.parse(oldProjects);
    newProjects[index].title = title;
    newProjects[index].priority = priority;
  }

  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(newProjects));
}

function readProject(index) {
  let projects = JSON.parse(localStorage.getItem('projects'));

  return projects[index];
}

function deleteProject(index){
  let projects = JSON.parse(localStorage.getItem('projects'));
  projects.splice(index,1);
  
  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(projects));
}

function readProjects() {
  let projects = JSON.parse(localStorage.getItem('projects'));
  if(projects == null) return [];

  return projects;
}

// To-Do logic
function saveToDo({index, toDoList}){
  if(index == -1) return;
  let newProjects;
  let oldProjects = localStorage.getItem('projects');

  newProjects = JSON.parse(oldProjects);
  newProjects[index].toDo = toDoList;

  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(newProjects)); 
}

export { saveProject, readProject, readProjects, saveToDo, deleteProject };
