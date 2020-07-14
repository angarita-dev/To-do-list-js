class Factory {
  static toDo(name, description, priority, dueDate, checked, rawDate) {
    const inputDate = rawDate.toISOString().substring(0,10);
    const template = document.createElement('template'); 
    const checkedValue = checked ? 'checked' : '';
    const html = `
      <li class="to-do-item ${checkedValue}">
        <div class="to-do-header">
          <div class="header-left">
            <h3 class="to-do-title">${name}</h3>
            <span class="${priority} enter-edit-mode to-do-priority"/>
          </div>
          <p class="to-do-date">${dueDate}</p>
          <div class="icon-container">
            <svg class="icon checked-icon">
              <use class="unchecked-symbol" xlink:href="#checked-icon"/>
              <use class="checked-symbol" xlink:href="#unchecked-icon"/>
            </svg> 
            <svg class="icon edit-icon">
              <use xlink:href="#edit-icon">
            </svg>
            <svg class="icon delete-icon">
              <use xlink:href="#delete-icon">
            </svg>
          </div>
        </div>
        <div class="to-do-body">
          <p class="to-do-description">${description}</p>
        </div>
        <div class="edit-container">
          <div class="to-do-header">
            <input class="to-do-title-edit" type="text" value="${name}">
            <svg class="icon save-icon">
              <use xlink:href="#save-icon"/>
            </svg>
          </div>
          <div class="priority-edit">
            <svg class="icon priority-icon low-priority">
              <use xlink:href="#empty-priority"/>
              <use class="full-priority" xlink:href="#full-priority"/>
            </svg>
            <svg class="icon priority-icon medium-priority">
              <use xlink:href="#empty-priority"/>
              <use class="full-priority" xlink:href="#full-priority"/>
            </svg>
            <svg class="icon priority-icon high-priority">
              <use xlink:href="#empty-priority"/>
              <use class="full-priority" xlink:href="#full-priority"/>
            </svg>
            <svg class="icon priority-icon uh-priority">
              <use xlink:href="#empty-priority"/>
              <use class="full-priority" xlink:href="#full-priority"/>
            </svg>
          </div>
          <input class="to-do-date-edit" type="date" value="${inputDate}">
          <input class="to-do-description-edit" type="text" value="${description}">
        </div>
      </li>
    `.trim();
    template.innerHTML = html;
    return template.content.firstElementChild;
  }
}

export default Factory;
