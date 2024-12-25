document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const errorMessage = document.querySelector('.error-message');

    form.addEventListener('submit', (event) => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        let hasError = false;

        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // cek email pass
        if (!email) {
            hasError = true;
            errorMessage.textContent = '*Email is required.';
            errorMessage.style.display = 'block';
        } else if (!password) {
            hasError = true;
            errorMessage.textContent = '*Password is required.';
            errorMessage.style.display = 'block';
        }

        if (hasError) {
            event.preventDefault();
        }
    });


    document.querySelector('.toggle-password').addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
});
