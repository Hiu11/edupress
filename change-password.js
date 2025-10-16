document.addEventListener('DOMContentLoaded', function() {
    
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('Vui lòng đăng nhập để thực hiện chức năng này.');
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('changePasswordForm');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageDiv = document.getElementById('passwordMessage');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        messageDiv.textContent = '';
        messageDiv.className = 'message';

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(user => user.email === loggedInUserEmail);
        
        if (userIndex === -1) {
            messageDiv.textContent = 'Lỗi: Không tìm thấy thông tin người dùng.';
            messageDiv.classList.add('error');
            return;
        }

        const currentUser = allUsers[userIndex];

        if (currentUser.password !== currentPassword) {
            messageDiv.textContent = 'Mật khẩu cũ không chính xác.';
            messageDiv.classList.add('error');
            return;
        }

        if (newPassword.length < 6) {
            messageDiv.textContent = 'Mật khẩu mới phải có ít nhất 6 ký tự.';
            messageDiv.classList.add('error');
            return;
        }

        if (newPassword !== confirmPassword) {
            messageDiv.textContent = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
            messageDiv.classList.add('error');
            return;
        }

        allUsers[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(allUsers));

        messageDiv.textContent = 'Đổi mật khẩu thành công!';
        messageDiv.classList.add('success');
        
        form.reset();
    });

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.closest('.password-group').querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });
});

