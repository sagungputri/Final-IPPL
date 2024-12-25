<?php
include 'db.php'; 
session_start(); 

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $product_name = htmlspecialchars(trim($_POST['product-name']));
    $code = htmlspecialchars(trim($_POST['code']));
    $composition = htmlspecialchars(trim($_POST['composition']));
    $description = htmlspecialchars(trim($_POST['description']));
    $side_effects = htmlspecialchars(trim($_POST['side-effects']));
    $expired = htmlspecialchars(trim($_POST['expired']));
    $stock_product = intval($_POST['stock-product']);
    $category = htmlspecialchars(trim($_POST['category']));
    $price = floatval($_POST['price']);

    if ($stock_product < 0) {
        echo json_encode(['success' => false, 'message' => 'Stock cannot be negative.']);
        exit();
    }

    if ($price < 0) {
        echo json_encode(['success' => false, 'message' => 'Price cannot be negative.']);
        exit();
    }

    // up gambar
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image']['name'];
        $image_tmp = $_FILES['image']['tmp_name'];
        $image_path = 'uploads/' . $image;


        if (!file_exists('uploads')) {
            mkdir('uploads', 0777, true);
        }

        if (!move_uploaded_file($image_tmp, $image_path)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit();
        }
    }

    // untuk nyimpen poroduk
    $sql = "INSERT INTO products (user_id, product_name, composition, side_effects, stock_product, price, code, description, expired, category, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param(
        'isssissssss',
        $user_id,
        $product_name,
        $composition,
        $side_effects,
        $stock_product,
        $price,
        $code,
        $description,
        $expired,
        $category,
        $image
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'product_id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to execute statement: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
