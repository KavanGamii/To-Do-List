document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');

            const textarea = document.createElement('textarea');
            textarea.value = taskText;
            textarea.classList.add('task-textarea');
            textarea.rows = 1; // initial number of rows

            textarea.addEventListener('input', autoResize);
            textarea.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    textarea.blur(); // to trigger the blur event and save the changes
                }
            });

            textarea.addEventListener('blur', () => {
                if (textarea.value.trim() === '') {
                    taskList.removeChild(li); // remove the task if input is empty
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remove';
            deleteBtn.classList.add('delete');
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(textarea);
            li.appendChild(deleteBtn);
            li.addEventListener('click', () => {
                li.classList.toggle('done');
            });

            // Insert the new task at the beginning of the task list
            taskList.insertBefore(li, taskList.firstChild);
            newTaskInput.value = '';
        }
    }

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
});
