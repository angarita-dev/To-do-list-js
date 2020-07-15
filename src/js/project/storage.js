class ProjectStorage {
  static saveAllProjects(projectList) {
    localStorage.setItem('projects', JSON.stringify(projectList));
  }

  static saveProject(title, priority, index) {
    const oldProjects = localStorage.getItem('projects');
    let newProjects;

    if (oldProjects === null) {
      newProjects = [{ title, priority, toDo: [] }];
    } else {
      newProjects = JSON.parse(oldProjects);
      const toDo = newProjects[index] === undefined
        ? []
        : newProjects[index].toDo;
      newProjects[index] = { title, priority, toDo };
    }

    localStorage.setItem('projects', JSON.stringify(newProjects));
  }

  static readProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects'));

    return projects[index];
  }

  static deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects.splice(index, 1);

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static readProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (projects == null) return [];

    return projects;
  }
}

export default ProjectStorage;
