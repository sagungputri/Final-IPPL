<?php
include 'db.php';

if (isset($_GET['id'])) {
    $productId = intval($_GET['id']);

    $sql = "SELECT * FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();

        echo json_encode([
            'success' => true,
            'data' => [
                'id' => $product['id'],
                'name' => $product['product_name'],
                'code' => $product['code'],
                'description' => $product['description'],
                'composition' => $product['composition'],
                'sideEffects' => $product['side_effects'],
                'expired' => $product['expired'],
                'stock' => $product['stock_product'],
                'price' => $product['price'],
                'image' => $product['image'] ? 'uploads/' . $product['image'] : 'default-image.jpg',
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Product not found']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Product ID is missing']);
}
?>
