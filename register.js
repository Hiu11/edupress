document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessageDiv.textContent = '';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (name === '' || email === '' || password === '') {
            errorMessageDiv.textContent = 'Vui lòng điền đầy đủ thông tin.';
            return;
        }

        if (password.length < 6) {
            errorMessageDiv.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.find(user => user.email === email);
        if (userExists) {
            errorMessageDiv.textContent = 'Email này đã được sử dụng. Vui lòng chọn email khác.';
            return;
        }

        users.push({ name, email, password });

        localStorage.setItem('users', JSON.stringify(users));

        alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        window.location.href = 'login.html';
    });
});
