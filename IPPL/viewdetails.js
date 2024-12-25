let currentProductId = null;

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('Product ID is missing!');
        window.location.href = 'allproducts.html';
        return;
    }

    try {
        const response = await fetch(`getproduct.php?id=${productId}`);
        const product = await response.json();

        if (product.success) {
            const detailsContainer = document.getElementById('product-details');
            detailsContainer.innerHTML = `
                <div class="product-image">
                    <img src="${product.data.image}" alt="Product Image">
                </div>
                <div class="product-info">
                    <h2>${product.data.name}</h2>
                    <p><strong>Description:</strong> ${product.data.description}</p>
                    <p><strong>Composition:</strong> ${product.data.composition}</p>
                    <p><strong>Side Effects:</strong> ${product.data.sideEffects}</p>
                    <p><strong>Expired:</strong> ${product.data.expired}</p>
                    <p><strong>Code:</strong> ${product.data.code}</p>
                    <p><strong>Price:</strong> ${product.data.price}</p>
                    <p><strong>Stock:</strong> ${product.data.stock}</p>
                    <div class="actions">
                        <button class="edit-stock" onclick="openEditStockModal(${product.data.id}, ${product.data.stock})">Edit Stock</button>
                        <button class="delete-product" onclick="openDeleteProductModal(${product.data.id})">Delete Product</button>
                    </div>
                </div>
            `;
        } else {
            alert('Product not found!');
            window.location.href = 'allproducts.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching product details.');
    }
});

function openEditStockModal(productId, currentStock) {
    const modal = document.getElementById('edit-stock-modal');
    const stockInput = document.getElementById('new-stock');
    stockInput.value = currentStock;
    
    modal.style.display = 'block';

    const form = document.getElementById('edit-stock-form');
    form.onsubmit = async function(event) {
        event.preventDefault();

        const newStock = document.getElementById('new-stock').value;
        try {
            const response = await fetch('editstock.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: productId, stock: newStock }),
            });

            const result = await response.json();
            if (result.success) {
                alert('Stock updated successfully!');
                location.reload();
            } else {
                alert('Failed to update stock: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the stock.');
        }
    };
}

function closeEditStockModal() {
    const modal = document.getElementById('edit-stock-modal');
    modal.style.display = 'none';
}

function openDeleteProductModal(productId) {
    currentProductId = productId;
    const modal = document.getElementById('delete-product-modal');
    modal.style.display = 'block';
}

function closeDeleteProductModal() {
    const modal = document.getElementById('delete-product-modal');
    modal.style.display = 'none';
}

async function confirmDeleteProduct() {
    if (currentProductId === null) return;

    try {
        const response = await fetch('deleteproduct.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentProductId }),
        });

        const result = await response.json();
        if (result.success) {
            alert('Product deleted successfully!');
            window.location.href = 'viewallproducts.html';
        } else {
            alert('Failed to delete product: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the product.');
    }

    closeDeleteProductModal();
}
