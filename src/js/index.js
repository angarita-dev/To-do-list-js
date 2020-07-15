import Project from './project/project';
import ProjectStorage from './project/storage';
import GeneralDisplay from './display';

class ProjectManager {
  sortProjects() {
    const modelPriority = ['uh-priority', 'high-priority', 'medium-priority', 'low-priority'];
    const getProjectPriority = priority => modelPriority.indexOf(priority);

    const sortByProjectPriority = (a, b) => {
      const aPriorityIndex = getProjectPriority(a.priority);
      const bPriorityIndex = getProjectPriority(b.priority);
      if (bPriorityIndex < aPriorityIndex) return 1;
      if (bPriorityIndex > aPriorityIndex) return -1;
      return 0;
    };

    this.projects.sort(sortByProjectPriority);
  }

  reIndexProjects() {
    this.projects.forEach((project, index) => { project.setIndex(index); });
  }

  addProject() {
    const newProject = new Project(this.reDisplayProject.bind(this),
      this.deleteProjectHandler.bind(this),
      0);
    this.projects.unshift(newProject);
    this.reIndexProjects();
    this.saveProjects();
    this.displayProjects();
    newProject.selectAndEdit();
    this.selectProject(newProject);
  }

  loadNewProject() {
    GeneralDisplay.loadNewProject(this.addProject.bind(this));
  }

  saveProjects() {
    const projects = this.projects.map(project => {
      const { name } = project;
      const { priority } = project;
      const toDo = project.toDoManager.getToDos();
      return { name, priority, toDo };
    });
    ProjectStorage.saveAllProjects(projects);
  }

  selectProject(project) {
    const newTitle = project.name;
    const newTitlePriority = project.priority;
    GeneralDisplay.displayNewTitle(newTitle, newTitlePriority);

    this.toDoManager = project.toDoManager;
    project.selectProject();
    this.displayToDos();
  }

  displayToDos() {
    this.toDoManager.displayToDos();
    this.toDoManager.loadNewToDo();
  }

  displayProjects() {
    GeneralDisplay.clearProjectList();
    this.saveProjects();
    this.projects.forEach(project => {
      project.displayProject();

      const projectHTML = project.display.projectContainer;
      projectHTML.onclick = (event) => {
        const onEdit = projectHTML.classList.contains('to-do-edit');
        const onDeath = event.target.classList.contains('delete-icon');
        if (onEdit || onDeath) return;
        this.selectProject(project);
      };
    });
  }

  reDisplayProject() {
    this.sortProjects();
    this.reIndexProjects();
    this.saveProjects();
    this.displayProjects();
  }

  selectFirstProject() {
    if (this.projects.length === 0) {
      GeneralDisplay.clearProjectList();
      GeneralDisplay.disableToDoCreation();
      GeneralDisplay.displayNewTitle('To-do app', 'medium-priority');
    } else {
      const project = this.projects[0];
      this.selectProject(project);
    }
  }

  deleteProjectHandler(removedProjectIndex) {
    this.projects.splice(removedProjectIndex, 1);
    this.reIndexProjects();
    this.saveProjects();
    this.selectFirstProject();
  }

  constructor() {
    const projectsData = ProjectStorage.readProjects();
    const projects = projectsData.map((project, index) => {
      const projectInstance = new Project(this.reDisplayProject.bind(this),
        this.deleteProjectHandler.bind(this),
        index,
        project.name,
        project.priority,
        project.toDo);
      return projectInstance;
    });
    this.projects = projects;
  }

  firstLoad() {
    this.displayProjects();
    this.selectFirstProject();
    this.loadNewProject();
  }
}

const projectManager = new ProjectManager();
projectManager.firstLoad();
