class GeneralFactory {
  static emptyToDoList() {
    const template = document.createElement('template');
    const html = `
      <li class="empty-to-do">
        <span class="low-priority"></span>
        <span class="medium-priority"></span>
        <span class="high-priority"></span>
        <span class="uh-priority"></span>
        <p>Please create a Project</p>
        <span class="uh-priority"></span>
        <span class="high-priority"></span>
        <span class="medium-priority"></span>
        <span class="low-priority"></span>
      </li>
    `.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }
}

export default GeneralFactory;
