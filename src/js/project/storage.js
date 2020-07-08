class ProjectStorage {
  static saveProject(title, priority, index = -1) {
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
