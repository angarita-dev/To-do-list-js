function toggleSidebar() {
  const fHamburgerIcon = document.getElementById('f-hamburger-icon-click');
  const sidebar = document.getElementById('sidebar');

  if (sidebar.classList.contains('slide-out')) {
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
  if (toDoItem.classList.contains('checked')) {
    toDoItem.classList.remove('checked');
  } else {
    toDoItem.classList.add('checked');
  }
}

function exitProjectEditMode(editContainer) {
  editContainer.classList.remove('to-do-edit');
}

function projectSelect(selectedProjectContainer) {
  const projectContainers = Array.from(document.getElementsByClassName('to-do-project'));
  projectContainers.forEach(projectContainer => {
    projectContainer.classList.remove('selected');
    exitProjectEditMode(projectContainer);
  });
  selectedProjectContainer.classList.add('selected');
}

function enterProjectEditMode(projectContainer) {
  const titleText = projectContainer.childNodes[1].childNodes[1].innerHTML;
  const inputText = projectContainer.childNodes[3].childNodes[1];
  projectContainer.classList.add('to-do-edit');
  inputText.value = titleText;
  inputText.focus();
}

export {
  itemCheck,
  projectSelect,
  exitProjectEditMode,
  enterProjectEditMode,
  toggleSidebar,
};
