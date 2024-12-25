document.addEventListener('DOMContentLoaded', async function () {
    const recentProductsList = document.getElementById('recent-products-list');
    const productCountElement = document.querySelector('.card.red h2'); 
    const usernamePlaceholder = document.getElementById('username-placeholder'); 
    const searchInput = document.getElementById('search-input'); 
    const searchButton = document.getElementById('search-button'); 
    let allProducts = []; 

    // untuk fetch nama user
    try {
        const response = await fetch('dashboard.php'); 
        const data = await response.json();

        if (data.success) {
            usernamePlaceholder.textContent = `${data.username}!`;
        } else {
            usernamePlaceholder.textContent = 'Guest';
            console.error('Error fetching username:', data.message);
        }
    } catch (error) {
        usernamePlaceholder.textContent = 'Guest';
        console.error('Network error fetching username:', error);
    }

    // untuk fetch jml produk
    try {
        const response = await fetch('getproductcount.php');
        const data = await response.json();

        if (data.success) {
            productCountElement.textContent = data.total; 
        } else {
            console.error('Error fetching product count:', data.message);
            productCountElement.textContent = 'N/A'; 
        }
    } catch (error) {
        console.error('Network error fetching product count:', error);
        productCountElement.textContent = 'N/A';
    }

    // untuk fetch recent pr.
    try {
        const response = await fetch('getrecentproducts.php');
        const data = await response.json();

        if (data.success) {
            allProducts = data.products; 
            recentProductsList.innerHTML = data.products
                .map(
                    (product) => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Rp ${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        <a href="viewdetails.html?id=${product.id}" class="details-btn">Details</a>
                    </div>
                `
                )
                .join('');
        } else {
            recentProductsList.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching recent products:', error);
        recentProductsList.innerHTML = `<p>An error occurred while loading recent products.</p>`;
    }

    // pencarian
    function searchProducts(query) {
        const matchedProduct = allProducts.find((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (matchedProduct) {
            window.location.href = `viewdetails.html?id=${matchedProduct.id}`;
        } else {
            alert('Product not found. Please try again.');
        }
    }

    //  untuk tombol searching
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim(); 
        if (query) {
            searchProducts(query); 
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
});
