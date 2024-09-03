document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const formObject = {};
            formData.forEach((value, key) => (formObject[key] = value));

            try {
                const response = await fetch('/api/sessions/register', {
                    method: 'POST',
                    body: JSON.stringify(formObject),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    showAlert('Registro exitoso. Redirigiendo a su perfil...', 'success');
                    setTimeout(() => {
                        window.location.href = '/profile'; 
                    }, 2000); 
                } else {
                    const errorData = await response.json();
                    showAlert(errorData.message || 'El registro falló. Por favor, inténtelo de nuevo.', 'error');
                }
            } catch (error) {
                console.error('Error en el registro:', error);
                showAlert('Error de red. Por favor, inténtelo de nuevo más tarde.', 'error');
            }
        });
    }

    function showAlert(message, type) {

        const alertContainer = document.createElement('div');
        alertContainer.className = `alert ${type}`; 
        alertContainer.textContent = message;
        document.body.appendChild(alertContainer);
        
        setTimeout(() => {
            alertContainer.remove();
        }, 5000);
    }
});