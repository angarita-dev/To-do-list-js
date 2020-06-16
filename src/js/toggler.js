function toggleSidebar() {
  let fHamburgerIcon = document.getElementById('f-hamburger-icon-click');
  let hamburgerIcon = document.getElementById('hamburger-icon-click');
  let sidebar = document.getElementById('sidebar');

  if(sidebar.classList.contains('slide-out')){
    console.log('inside if');
    sidebar.classList.remove('slide-out');
    sidebar.classList.add('slide-in');
    fHamburgerIcon.classList.remove('slide-in');
    fHamburgerIcon.classList.add('slide-out');
  } else {
    sidebar.classList.remove('slide-in');
    sidebar.classList.add('slide-out');
    fHamburgerIcon.classList.remove('slide-out');
    fHamburgerIcon.classList.add('slide-in');
  }
}

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

export { itemCheck, projectSelect, exitProjectEditMode, enterProjectEditMode, toggleSidebar };
