document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    
    if (emailInput.value === '') {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'none';
        simulateEmailSending(emailInput.value);
    }
});

function simulateEmailSending(email) {

    const registeredEmails = ['user@example.com', 'admin@example.com']; 

    if (registeredEmails.includes(email)) {
     
        setTimeout(function () {
            
            document.getElementById('success-message').textContent = 'We have sent a password reset link to your email!';
            document.getElementById('success-message').style.display = 'block';
        }, 1500); 
    } else {
   
        setTimeout(function () {
            document.getElementById('error-message').textContent = '*Email not registered in our system.';
            document.getElementById('error-message').style.display = 'block';
        }, 1500);
    }
}


function goBack() {
    window.location.href = 'login.html'; 
}
