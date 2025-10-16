document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailErrorMessage = document.getElementById('emailErrorMessage');
    
    const verifyCodeModal = document.getElementById('verifyCodeModal');
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const verificationCodeInput = document.getElementById('verificationCode');
    const codeErrorMessage = document.getElementById('codeErrorMessage');

    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordErrorMessage = document.getElementById('passwordErrorMessage');
    
    const successModal = document.getElementById('successModal');
    let userEmailToReset = null;

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        emailErrorMessage.textContent = '';
        
        const email = emailInput.value.trim();
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = allUsers.some(user => user.email === email);

        if (!email) {
            emailErrorMessage.textContent = 'Vui lòng nhập địa chỉ email.';
            return;
        }

        if (userExists) {
            userEmailToReset = email;
            console.log(`Gửi mã xác thực đến: ${email}`);
            verifyCodeModal.classList.add('show');
        } else {
            emailErrorMessage.textContent = 'Email không tồn tại trong hệ thống.';
        }
    });

    verifyCodeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        codeErrorMessage.textContent = '';
        
        const code = verificationCodeInput.value.trim();

        if (code === "123456") {
            verifyCodeModal.classList.remove('show');
            resetPasswordModal.classList.add('show');
        } else {
            codeErrorMessage.textContent = 'Mã xác thực không chính xác. Vui lòng thử lại.';
        }
    });

    resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        passwordErrorMessage.textContent = '';

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword.length < 6) {
            passwordErrorMessage.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            return;
        }
        if (newPassword !== confirmPassword) {
            passwordErrorMessage.textContent = 'Mật khẩu xác nhận không khớp.';
            return;
        }

        let allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(user => user.email === userEmailToReset);
        
        if(userIndex !== -1) {
            allUsers[userIndex].password = newPassword; 
            localStorage.setItem('users', JSON.stringify(allUsers));
            
            resetPasswordModal.classList.remove('show');
            successModal.classList.add('show');
        } else {
            passwordErrorMessage.textContent = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        }
    });
});

