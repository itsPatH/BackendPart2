const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.location.href = '/profile';
        } else {
            const result = await response.json();
            alert(result.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration error');
    }
});