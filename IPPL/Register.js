document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const errorMessage = document.querySelector('.error-message');
    const usernameInput = form.username;
    const emailInput = form.email;
    const passwordInput = form.password;

    form.addEventListener('submit', (event) => {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Validasi
        if (!username || !email || !password) {
            event.preventDefault();
            errorMessage.textContent = "All fields are required.";
            errorMessage.style.display = 'block';
        } else if (password.length < 6) {
            event.preventDefault();
            errorMessage.textContent = "Password must be at least 6 characters long.";
            errorMessage.style.display = 'block';
        } else if (!validateEmail(email)) {
            event.preventDefault();
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.display = 'block';
        }
    });

    // helper untuk validasi email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim().length < 6) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Password must be at least 6 characters long.";
        } else {
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        }
    });
});
