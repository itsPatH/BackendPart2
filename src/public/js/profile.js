document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('/api/sessions/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${yourJwtToken}`
                    }
                });

                if (response.ok) {
                    window.location.href = '/';
                } else {
                    const errorData = await response.json();
                    const errorMessage = errorData.message || 'No se pudo cerrar sesión. Por favor, inténtelo de nuevo.';
                    showAlert(errorMessage, 'error');
                }
            } catch (error) {
                console.error('Error en el logout:', error);
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