class Factory {
  static project(title, priority) {
    const template = document.createElement('template');
    const html = `
      <li class='to-do-project'>
        <div class='project-container text-container ${priority}'>
          <h4 class='text'>${title}</h4>
        </div>
        <div class='edit-container'>
          <input class='text edit-project' value="${title}"/>
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
        </div>
        <div class='icon-container'>
          <svg class='icon save-icon'>
            <use class='save-icon' xlink:href='#save-icon' />
          </svg>
          <svg class='icon edit-icon'>
            <use class='edit-icon' xlink:href='#edit-icon' />
          </svg>
          <svg class='icon delete-icon'>
            <use class='delete-icon delete-project-icon' xlink:href='#delete-icon' />
          </svg>
        </div>
      </li>
    `.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }
}

export default Factory;
