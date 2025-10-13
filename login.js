document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        errorMessageDiv.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '') {
            errorMessageDiv.textContent = 'Vui lòng nhập tài khoản email.';
            emailInput.focus(); 
            return; 
        }

        if (password === '') {
            errorMessageDiv.textContent = 'Vui lòng nhập mật khẩu.';
            passwordInput.focus(); 
            return; 
        }
        
        if (password.length < 6) {
            errorMessageDiv.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            passwordInput.focus();
            return;
        }

console.log('Email:', email);
console.log('Password:', password);
localStorage.setItem('loggedInUser', email);
alert('Đăng nhập thành công!');
window.location.href = 'index.html';
    });
});
