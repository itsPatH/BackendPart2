document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.add-to-cart-form');

    forms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const productId = form.dataset.productId;
            const quantity = form.querySelector('input[name="quantity"]').value;

            try {
                const response = await fetch(`/carts/${yourCartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${yourJwtToken}` 
                    },
                    body: JSON.stringify({ quantity })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Error al agregar el producto al carrito');
                }

                const result = await response.json();
                alert('Producto agregado al carrito con éxito');
                // Actualiza la UI si es necesario
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        });
    });
});
