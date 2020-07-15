import Factory from './factory';

class Display {
  static parseDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month < 10 ?
      `${day}-0${month}-${year}` :
      `${day}-${month}-${year}`;
  }

  static removeSelected() {
    const projects = Array.from(document.getElementsByClassName('to-do-item'));
    const projectsSelected = projects.filter( project => project.classList.contains('selected'));

    projectsSelected.forEach(project => project.classList.remove('selected'));
  }

  selectToDo() {
    Display.removeSelected();

    this.toDoContainer.classList.add('selected');
  }

  static removeEdit() {
    const toDos = Array.from(document.getElementsByClassName('to-do-item'));
    const toDosEdit = toDos.filter( toDo => toDo.classList.contains('edit'));

    toDosEdit.forEach(toDo => toDo.classList.remove('edit'));
  }

  removeSelectedPriorityInput() {
    const priorityContainer = this.toDoContainer.querySelector('.priority-edit');
    const priorityItems = Array.from(priorityContainer.children);
    priorityItems.forEach( priorityItem => {
      priorityItem.classList.remove('selected');
    });
  }

  togglePriority() {
    const priorityContainer = this.toDoContainer.querySelector('.priority-edit');
    const priorityItems = Array.from(priorityContainer.children);
      
    priorityItems.forEach( priorityInput => {
      priorityInput.onclick = () => {
        this.removeSelectedPriorityInput();
        priorityInput.classList.add('selected');
      }
    });
  }

  selectPriorityInput() {
    const editPriorityContainer = this.toDoContainer.querySelector('.priority-edit');
    const priorityInputs = Array.from(editPriorityContainer.children);
    const currentPriorityContainer = this.toDoContainer.querySelector('.to-do-priority');
    const selectedPriority = Array.from(currentPriorityContainer.classList)
      .filter(className => className != 'to-do-priority' && className.includes('-priority'))[0];

    this.removeSelectedPriorityInput();
    priorityInputs.forEach(inputElement => {
      const reducer = (accumulator, current) => accumulator || current.includes(selectedPriority);
      const selectedClass = Array.from(inputElement.classList).reduce(reducer, false);
      if(selectedClass) {
        inputElement.classList.add('selected');
      }
    });
  }

  exitEdit(saveHandler) {
    const editContainer = this.toDoContainer.querySelector('.edit-container');
    const titleValue = editContainer.querySelector('.to-do-title-edit').value;
    const dateValue = editContainer.querySelector('.to-do-date-edit').valueAsDate;
    const descriptionValue = editContainer.querySelector('.to-do-description-edit').value;
    const priorityInput = editContainer.querySelector('.selected');
    const selectedPriority = Array.from(priorityInput.classList).filter( className => {
      return className.includes('-priority')
    })[0];
    this.toDoContainer.classList.remove('edit');
    saveHandler(titleValue,
      descriptionValue,
      selectedPriority,
      dateValue);
  }

  editToDo(exitEditHandler) {
    Display.removeEdit();

    this.selectToDo();
    this.togglePriority();
    this.toDoContainer.classList.add('edit');

    const saveIcon = this.toDoContainer.querySelector('.save-icon');
    saveIcon.onclick = () => { this.exitEdit(exitEditHandler) };
  }

  static displayToDo(name, description, priority, dueDate, checked) {
    const parsedDate = Display.parseDate(dueDate);
    const toDoContainer = document.getElementById('to-do-container');
    const toDo = Factory.toDo(name, description, priority, parsedDate, checked, dueDate);
    toDoContainer.append(toDo);
    return toDo;
  }

  toggleCheck() {
    this.toDoContainer.classList.toggle('checked');
  }

  loaders(handleEdit, handleDelete, handleCheck) {
    const iconContainer = this.toDoContainer.querySelector('.icon-container');
    const editIcon = iconContainer.querySelector('.edit-icon'); 
    const deleteIcon = iconContainer.querySelector('.delete-icon');
    const checkIcon = iconContainer.querySelector('.checked-icon');

    this.toDoContainer.onclick = (event) => { 
      const tagName = event.target.tagName;
      if(tagName === 'svg' || tagName === 'use') return;
      this.selectToDo()
    }; 

    editIcon.onclick = () => {
      const exitEditHandler = handleEdit();
      this.editToDo(exitEditHandler);
    };

    deleteIcon.onclick = () => {
      handleDelete();
      this.toDoContainer.remove();
    }

    checkIcon.onclick = () => {
      handleCheck();
      this.toggleCheck();
    }
  }

  constructor(name,
    description,
    priority,
    dueDate,
    checked,
    handleEdit,
    handleDelete,
    handleCheck) {
    this.toDoContainer = Display.displayToDo(name, description, priority, dueDate, checked);
    this.selectPriorityInput();
    this.loaders(handleEdit, handleDelete, handleCheck);
  }

  reDisplayValues(name, description, priority, dueDate) {
    const toDoHeader = this.toDoContainer.querySelector('.to-do-header');
    const nameContainer = toDoHeader.querySelector('.to-do-title'); 
    const dateContainer = toDoHeader.querySelector('.to-do-date');
    const descriptionContainer = this.toDoContainer.querySelector('.to-do-description');
    const priorityContainer = toDoHeader.querySelector('.to-do-priority');

    const selectedPriority = Array.from(priorityContainer.classList)
      .filter(className => className.includes('-priority'))[0];
    priorityContainer.classList.remove(selectedPriority);

    priorityContainer.classList.add(priority);
    nameContainer.textContent = name;
    dateContainer.textContent = Display.parseDate(dueDate);
    descriptionContainer.textContent = description;

    const editContainer = this.toDoContainer.querySelector('.edit-container');
    const titleInput = editContainer.querySelector('.to-do-title-edit');
    const dateInput = editContainer.querySelector('.to-do-date-edit');
    const descriptionInput = editContainer.querySelector('.to-do-description-edit');

    titleInput.value = name;
    dateInput.value = new Date(dueDate).toISOString().substring(0,10);
    descriptionInput.value = description;
    this.selectPriorityInput();
  }

  removeElement() {
    this.toDoContainer.remove();
  }
}

export default Display;
