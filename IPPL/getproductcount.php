<?php
include 'db.php';
session_start();


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}


$user_id = $_SESSION['user_id'];


$query = "SELECT COUNT(*) AS total FROM products WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode(['success' => true, 'total' => $row['total']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch product count']);
}

$stmt->close();
$conn->close();
?>
