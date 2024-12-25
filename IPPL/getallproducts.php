<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

$user_id = $_SESSION['user_id'];

$perPage = 6; 
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $perPage;

$totalQuery = "SELECT COUNT(*) AS total FROM products WHERE user_id = ?";
$stmtTotal = $conn->prepare($totalQuery);
$stmtTotal->bind_param("i", $user_id);
$stmtTotal->execute();
$totalResult = $stmtTotal->get_result();

if (!$totalResult) {
    die(json_encode(['success' => false, 'message' => 'Error counting products: ' . $conn->error]));
}

$totalRow = $totalResult->fetch_assoc();
$totalProducts = $totalRow['total'];

$query = "SELECT id, product_name AS name, price, stock_product AS stock, 
          expired, IF(image IS NOT NULL, CONCAT('uploads/', image), 'default-image.jpg') AS image
          FROM products WHERE user_id = ? LIMIT ?, ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Query preparation failed: ' . $conn->error]));
}

$stmt->bind_param("iii", $user_id, $offset, $perPage);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    die(json_encode(['success' => false, 'message' => 'Error executing query: ' . $conn->error]));
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

$totalPages = ceil($totalProducts / $perPage);

echo json_encode([
    'success' => true,
    'products' => $products,
    'total_pages' => $totalPages,
    'current_page' => $page,
]);


$stmt->close();
$stmtTotal->close();
$conn->close();
?>
