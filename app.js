// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add task
function addTask(task) {
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to remove task
function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to render task list
function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.textContent = task.text;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTask(index);
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
        toggleBtn.onclick = () => toggleCompletion(index);
        taskElement.appendChild(removeBtn);
        taskElement.appendChild(toggleBtn);
        taskList.appendChild(taskElement);
    });
}

// Add event listeners
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Render initial task list
renderTaskList();
