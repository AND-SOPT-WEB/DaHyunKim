![banner_Web-2](https://github.com/user-attachments/assets/09169e8f-f4b5-498c-acb2-fd26d69cc861)

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    const doneList = document.getElementById('doneList');

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        
        const doneButton = document.createElement('button');
        doneButton.textContent = '완료';
        doneButton.addEventListener('click', () => moveToDone(li));

        li.appendChild(doneButton);
        todoList.appendChild(li);
    }

    function moveToDone(taskElement) {
        taskElement.removeChild(taskElement.querySelector('button'));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => taskElement.remove());

        taskElement.appendChild(deleteButton);
        doneList.appendChild(taskElement);
    }
});