document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyButton = document.querySelector('.verify-button');
    const errorMessage = document.querySelector('.error-message');
    const defaultOtp = '000000'; 

    const resetInputs = () => {
        otpInputs.forEach(input => {
            input.value = ''; 
        });
        otpInputs[0].focus(); 
    };

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            } else if (e.target.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    verifyButton.addEventListener('click', () => {
        let enteredOtp = '';
        otpInputs.forEach((input) => {
            enteredOtp += input.value.trim();
        });

        if (enteredOtp === defaultOtp) {
            console.log('OTP correct! Redirecting...');
            window.location.href = 'login.php';
        } else {
            console.log('OTP incorrect.');
            errorMessage.style.display = 'block'; 
            errorMessage.textContent = 'Invalid OTP, please try again.';
            resetInputs(); 
        }
    });
});
