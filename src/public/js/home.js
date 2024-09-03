document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-list');
    const yourCartId = 'yourCartId'; 
    const yourJwtToken = 'yourJwtToken';

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error:', error.message);
            productContainer.innerHTML = '<p>No se pudieron cargar los productos.</p>';
        }
    }

    function renderProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" data-product-id="${product._id}">Add to Cart</button>
            `;

            productContainer.appendChild(productElement);
        });

        attachAddToCartListeners();
    }

    function attachAddToCartListeners() {
        const buttons = document.querySelectorAll('.add-to-cart');
        
        buttons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = button.getAttribute('data-product-id');
                const quantity = 1;

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
                        throw new Error('Error al agregar el producto al carrito');
                    }

                    alert('Producto agregado al carrito con éxito');
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            });
        });
    }
    fetchProducts();
});
