import ProjectStorage from './storage';
import ProjectDisplay from './display';

class Project {

	handleProjectEdit() {
		const exitEdit = (name, priority) => {
			this.name = name;
			this.priority = priority;

			this.display.changeName(this.name);
			this.display.changePriority(this.priority);
			ProjectStorage.saveProject(this.name, this.priority, this.index);
		}

		this.display.editProject(exitEdit)
	}

	handleProjectDelete() {
		this.display.removeElement();

		ProjectStorage.deleteProject(this.index);
	}

	constructor(name = 'To-do Project', priority = 'low-priority', toDos = [], index = -1) {
		this.name = name;
		this.priority = priority;
		this.toDos = toDos;
		this.index = index;

		this.display = new ProjectDisplay(this.name,
																			this.priority handleProjectEdit.bind(this),
																			handleProjectDelete.bind(this));
	}
}
