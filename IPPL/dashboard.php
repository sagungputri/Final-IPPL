<?php
session_start();


if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'User not logged in',
        'redirect' => 'login.php' 
    ]);
    exit();
}


$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];


echo json_encode([
    'success' => true,
    'user_id' => $user_id,
    'username' => $username,
    'message' => 'Welcome to the dashboard!'
]);
exit();
?>
