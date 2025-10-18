document.addEventListener('DOMContentLoaded', () => {
    const authArea = document.querySelector('.navbar .auth');
    const loggedInUserEmail = localStorage.getItem('loggedInUser');

    if (loggedInUserEmail) {
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = allUsers.find(user => user.email === loggedInUserEmail);
        const displayName = currentUser && currentUser.name ? currentUser.name : loggedInUserEmail.split('@')[0];

        let avatarHTML = '';

        if (currentUser && currentUser.avatar) {
            avatarHTML = `<img src="${currentUser.avatar}" alt="${displayName}" class="user-avatar-img">`;
        } else {
            const initial = displayName.charAt(0).toUpperCase();
            avatarHTML = `<div class="user-avatar-default">${initial}</div>`;
        }

        authArea.innerHTML = `
            <div class="user-menu-container">
                <button class="user-avatar-btn">
                    ${avatarHTML}
                </button>
                <div class="user-dropdown-menu">
                    <ul>
                        <li class="dropdown-header">
                            <strong>${displayName}</strong>
                            <small>${loggedInUserEmail}</small>
                        </li>
                        
                        <li><a href="../html/information.html">Thông tin tài khoản</a></li>
                        <li><a href="../html/profile.html">Hồ sơ của tôi</a></li>
                        <li class="dropdown-divider"></li>
                        <li><a href="#" id="logoutBtnDropdown">Thoát</a></li>
                    </ul>
                </div>
            </div>
        `;
        
        const avatarBtn = document.querySelector('.user-avatar-btn');
        const dropdownMenu = document.querySelector('.user-dropdown-menu');

        avatarBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        window.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        const logoutBtn = document.getElementById('logoutBtnDropdown');
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            alert('Bạn đã đăng xuất thành công.');
            window.location.href = '../html/index.html';
        });

    } else {
        authArea.innerHTML = `
            <a href="../html/login.html">Đăng nhập</a> / <a href="../html/register.html">Đăng kí</a>
        `;
    }
});