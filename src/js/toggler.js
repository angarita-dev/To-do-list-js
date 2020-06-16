function itemCheck(toDoItem) {
  toDoItem.classList.contains('checked') ? 
    toDoItem.classList.remove('checked') :
    toDoItem.classList.add('checked')
}

function projectSelect(selectedProjectContainer) {
  let projectContainers = Array.from(document.getElementsByClassName('to-do-project'));
  projectContainers.map( projectContainer => {
    projectContainer.classList.remove('selected');
    exitProjectEditMode(projectContainer);
  });
  selectedProjectContainer.classList.add('selected');
}

function exitProjectEditMode(editContainer) {
  editContainer.classList.remove('to-do-edit');
}

function enterProjectEditMode(projectContainer) {
  let titleText = projectContainer.childNodes[1].childNodes[1].innerHTML;
  let inputText = projectContainer.childNodes[3].childNodes[1];
  projectContainer.classList.add('to-do-edit');
  inputText.value = titleText
  inputText.focus();
}

export { itemCheck, projectSelect, exitProjectEditMode, enterProjectEditMode };
