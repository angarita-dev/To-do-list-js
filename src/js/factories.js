// Project logic
function project({ title = 'To-do', priority = 'low-priority' }) {
  const template = document.createElement('template');
  const html = `
    <li class='to-do-project'>
      <div class='project-container text-container ${priority}'>
        <h4 class='text'>${title}</h4>
      </div>
      <div class='edit-container'>
        <input class='text edit-project'/>
        <span class='low-priority priority-selector'></span>
        <span class='medium-priority priority-selector'></span>
        <span class='high-priority priority-selector'></span>
        <span class='uh-priority priority-selector'></span>
      </div>
      <svg class='icon'>
        <use class='edit-icon' xlink:href='#edit-icon' />
        <use class='delete-icon delete-project-icon' xlink:href='#delete-icon' />
      </svg>
    </li>
  `.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

// To-do logic
function toDoItem({ text, priority, checked = false }) {
  const template = document.createElement('template');
  const checkedClass = checked ? 'checked' : '';
  const html = `
    <li class="to-do-item ${checkedClass}">
      <p>${text}</p>
      <span class="${priority} enter-edit-mode"/>
    </li>
  `.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

function toDoList(toDoItemsList) {
  const toDoContainer = document.createElement('ul');
  toDoContainer.classList.add('to-do-container');
  toDoContainer.setAttribute('id', 'to-do-container');
  toDoItemsList.forEach(toDoElement => {
    toDoContainer.appendChild(
      toDoItem(toDoElement),
    );
  });
  return toDoContainer;
}

function toDoListEdit(value = '') {
  const template = document.createElement('template');
  template.innerHTML = `
    <li class="to-do-item-edit" id='to-do-item-edit'>
      <input class="text edit-project" id='to-do-item-edit-input' value="${value}" placeholder="To do Item name"/>
      <span class="low-priority to-do-priority-selector"></span>
      <span class="medium-priority to-do-priority-selector"></span>
      <span class="high-priority to-do-priority-selector"></span>
      <span class="uh-priority to-do-priority-selector"></span>
       <svg class='icon'>
        <use class='delete-icon' xlink:href='#delete-icon' />
      </svg>
    </li>
  `.trim();
  return template.content.firstChild;
}

export {
  project, toDoList, toDoItem, toDoListEdit,
};
