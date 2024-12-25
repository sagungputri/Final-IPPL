document.getElementById('add-product-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const stock = parseInt(form['stock-product'].value, 10);
    const price = parseFloat(form['price'].value);


    if (isNaN(stock) || stock < 0) {
        alert('Stock tidak boleh kosong atau bernilai negatif.');
        return;
    }

    if (isNaN(price) || price < 0) {
        alert('Harga tidak boleh kosong atau bernilai negatif.');
        return;
    }


    const imageInput = form['image'];
    if (imageInput.files.length === 0) {
        alert('Silakan unggah gambar untuk produk.');
        return;
    }

    const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileType = imageInput.files[0].type;

    if (!allowedExtensions.includes(fileType)) {
        alert('Format gambar harus JPG, JPEG, atau PNG.');
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch('addproduct.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            alert('Produk berhasil ditambahkan!');
            window.location.href = 'viewdetails.html?id=' + result.product_id; 
        } else {
            console.error('PHP Error:', result.message);
            alert('Gagal menambahkan produk: ' + result.message);
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Terjadi kesalahan saat menambahkan produk.');
    }
});
