// Login function with API call
loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Please enter both email and password', true);
        return;
    }
    
    // Show loading state
    loginText.classList.add('hidden');
    loginLoading.classList.remove('hidden');
    
    try {
        // API call to backend
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error);
        }
        
        // Store token and user data
        authToken = data.token;
        currentUser = data.user;
        
        // Store session
        localStorage.setItem('sarFagoAuthToken', authToken);
        localStorage.setItem('sarFagoCurrentUser', JSON.stringify(currentUser));
        
        // Show success notification
        showNotification('Login successful!');
        
        // Switch to todo app
        loginContainer.classList.add('hidden');
        signupContainer.classList.add('hidden');
        todoApp.classList.remove('hidden');
        
        // Load user's tasks
        loadTasks();
    } catch (error) {
        showNotification(error.message, true);
    } finally {
        // Hide loading state
        loginText.classList.remove('hidden');
        loginLoading.classList.add('hidden');
    }
});