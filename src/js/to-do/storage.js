class Storage {
  static saveToDo(name,
    description,
    priority,
    dueDate,
    checked,
    projectIndex,
    toDoIndex) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const newToDo = {
      name,
      description,
      dueDate,
      checked,
    };

    projects[projectIndex].toDo[toDoIndex] = newToDo;
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static removeToDo(projectIndex, toDoIndex) {
    const projects = JSON.parse(localStorage.getItem('projects'));

    projects[projectIndex].toDo.splice(toDoIndex, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static saveChecked(projectIndex, toDoIndex, checked) {
    const projects = JSON.parse(localStorage.getItem('projects'));

    projects[projectIndex].toDo[toDoIndex].checked = checked;
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

export default Storage;
