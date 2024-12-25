document.addEventListener('DOMContentLoaded', async function () {
    const productsList = document.getElementById('products-list');
    const pagination = document.getElementById('products-pagination');

    const fetchProducts = async (page = 1) => {
        try {
            const response = await fetch(`getallproducts.php?page=${page}`);
            const data = await response.json();

            if (data.success) {
                productsList.innerHTML = data.products
                    .map(
                        (product) => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Rp ${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        <p>Expired: ${product.expired}</p>
                        <a href="viewdetails.html?id=${product.id}" class="details-btn">Details</a>
                    </div>
                `
                    )
                    .join('');

                pagination.innerHTML = '';
                for (let i = 1; i <= data.total_pages; i++) {
                    pagination.innerHTML += `
                        <a href="#" class="${i === data.current_page ? 'active' : ''}" onclick="fetchProducts(${i})">${i}</a>
                    `;
                }
            } else {
                productsList.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            productsList.innerHTML = `<p>An error occurred while loading products.</p>`;
        }
    };

    fetchProducts(); 
});
