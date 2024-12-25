    <?php
    include 'db.php';
    session_start();

    if (isset($_SESSION['user_id'])) {
        unset($_SESSION['user_id']);
        unset($_SESSION['username']);
    }

    $error = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = htmlspecialchars(trim($_POST['email']));
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM register WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                header("Location: dashboard.html");
                exit();
            } else {
                $error = "Incorrect email or password.";
            }
        } else {
            $error = "Email not registered.";
        }
        $stmt->close();
    }
    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login | MedWare</title>
        <link rel="stylesheet" href="login.css">
        <script src="login.js"></script>
    </head>
    <body>
        <div class="login-container">
            <div class="login-image">
                <img src="img/fotologin.png" alt="Login Illustration">
            </div>
            <div class="login-form">
                <h1>Welcome to <span class="brand">MedWare</span></h1>

                <?php if (!empty($error)): ?>
                    <p class="error-message server-error"><?php echo $error; ?></p>
                <?php endif; ?>

                <form method="POST" action="login.php">
                    <div class="input-group">
                        <label for="email">Email Address *</label>
                        <div class="input-wrapper">
                            <input type="email" name="email" id="email" placeholder="Enter your email address" required>
                        </div>
                    </div>

                    <div class="input-group">
                        <label for="password">Password *</label>
                        <div class="input-wrapper">
                            <input type="password" name="password" id="password" placeholder="Enter your password" required>
                            <button type="button" class="toggle-password show-password"></button>
                        </div>
                    </div>

                    <button type="submit" class="login-button">Login</button>
                </form>
                <p class="register-text">Don't have an account? <a href="register.html">Register</a></p>
            </div>
        </div>
    </body>
    </html>
