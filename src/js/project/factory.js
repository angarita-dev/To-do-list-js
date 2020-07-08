class Factory {
	static project(title, priority) {
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
}
