document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value
    };
    
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Here you would typically make an API call to create the user
        console.log('User signup data:', formData);
        // Redirect to home page or login page after successful signup
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error creating account. Please try again.');
    }
});