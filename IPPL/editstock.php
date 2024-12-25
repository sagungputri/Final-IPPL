<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['stock'])) {
    $productId = intval($data['id']);
    $newStock = intval($data['stock']);

    if ($newStock < 0) {
        echo json_encode(['success' => false, 'message' => 'Stock cannot be negative']);
        exit();
    }

    $sql = "UPDATE products SET stock_product = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $newStock, $productId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update stock']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
