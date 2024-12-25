<?php
include 'db.php'; 
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];

$limit = 6;

$query = "SELECT id, product_name AS name, price, stock_product AS stock, 
          IF(image IS NOT NULL, CONCAT('uploads/', image), 'default-image.jpg') AS image
          FROM products 
          WHERE user_id = ? 
          ORDER BY created_at DESC 
          LIMIT ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Query preparation failed: ' . $conn->error]);
    exit();
}

$stmt->bind_param("ii", $user_id, $limit);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode(['success' => true, 'products' => $products]);
} else {
    echo json_encode(['success' => false, 'message' => 'No recent products found']);
}


$stmt->close();
$conn->close();
?>
