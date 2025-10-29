// Load tasks for current user from API
async function loadTasks() {
    try {
        // Clear current tasks
        todoList.innerHTML = '';
        
        // API call to backend
        const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to load tasks');
        }
        
        const tasks = await response.json();
        
        // Add tasks to UI
        tasks.forEach(task => addTaskToUI(task));
        
        // Apply current filter
        filterTasks();
    } catch (error) {
        showNotification('Failed to load tasks', true);
    }
}