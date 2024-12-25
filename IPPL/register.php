<?php
include 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validasi input dari user
    $username = htmlspecialchars(trim($_POST['username']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = $_POST['password'];

    if (empty($username) || empty($email) || empty($password)) {
        echo "All fields are required.";
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit();
    }

    if (strlen($password) < 6) {
        echo "Password must be at least 6 characters long.";
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO register (username, email, password) VALUES (?, ?, ?)");
    if (!$stmt) {
        echo "Error preparing statement: " . $conn->error;
        exit();
    }

    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        header("Location: otp.html");
        exit();
    } else {
        if ($conn->errno === 1062) {
            echo "Email is already registered.";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    $stmt->close();
} else {
    echo "Invalid HTTP method: " . $_SERVER['REQUEST_METHOD'];
}
?>
