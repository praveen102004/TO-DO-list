document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const priority = document.getElementById('priority');
    const dueDate = document.getElementById('due-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksContainer = document.querySelector('.tasks');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check if dark mode preference is set
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Add task functionality
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const taskPriority = priority.value;
        const taskDueDate = dueDate.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>
                <strong>${taskPriority.toUpperCase()}:</strong> ${taskText} - <em>${taskDueDate}</em>
            </span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        tasksContainer.appendChild(taskItem);

        taskInput.value = '';
        priority.value = 'low';
        dueDate.value = '';

        taskItem.querySelector('.complete-btn').addEventListener('click', function() {
            taskItem.classList.toggle('completed');
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
            taskItem.remove();
        });

        // Save tasks to local storage
        saveTasksToLocalStorage();
    });

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        const taskItems = document.querySelectorAll('.task-item');
        let tasks = [];
        taskItems.forEach(item => {
            const taskText = item.querySelector('span').innerText.trim();
            const taskPriority = taskText.split(':')[0].trim().toLowerCase();
            const taskDueDate = taskText.split('-')[1].trim();
            const isCompleted = item.classList.contains('completed');
            tasks.push({ taskText, taskPriority, taskDueDate, isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage on page load
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            if (task.isCompleted) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <span>
                    <strong>${task.taskPriority.toUpperCase()}:</strong> ${task.taskText} - <em>${task.taskDueDate}</em>
                </span>
                <div>
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            tasksContainer.appendChild(taskItem);

            taskItem.querySelector('.complete-btn').addEventListener('click', function() {
                taskItem.classList.toggle('completed');
                saveTasksToLocalStorage();
            });

            taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                taskItem.remove();
                saveTasksToLocalStorage();
            });
        });
    }

    loadTasksFromLocalStorage();
});
