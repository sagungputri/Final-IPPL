<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $productId = intval($data['id']);

    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {        
        error_log('Delete failed for product ID: ' . $productId);
        echo json_encode(['success' => false, 'message' => 'Failed to delete product']);
    }
    

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
