document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('Vui lòng đăng nhập để xem trang hồ sơ.');
        window.location.href = 'login.html';
        return;
    }

    const allCourses = [
        { id: 'course-ai', title: 'Trí tuệ nhân tạo', author: 'TS: Đặng Ngọc Hoàng Thành', img: 'Course1.png' },
        { id: 'course-oop', title: 'Lập trình hướng đối tượng', author: 'TS: Nguyễn Mạnh Tuấn', img: 'course2.png' },
        { id: 'course-web', title: 'Phát triển ứng dụng web', author: 'ThS: Hồ Thị Thanh Tuyến', img: 'course3.png' },
        { id: 'course-ui', title: 'Thiết kế giao diện', author: 'ThS: Nguyễn Thị Bích Ngọc', img: 'course4.png' },
        { id: 'course-data', title: 'Khai phá dữ liệu', author: 'TS: Nguyễn An Tế', img: 'Course1.png' },
        { id: 'course-db', title: 'Cơ sở dữ liệu', author: 'ThS: Hồ Thị Thanh Tuyến', img: 'course2.png' },
    ];

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = allUsers.find(user => user.email === loggedInUserEmail);

    if (currentUser && !currentUser.registeredCourses) {
        currentUser.registeredCourses = ['course-ai', 'course-oop', 'course-web'];
        currentUser.completedCourses = ['course-ai'];
        localStorage.setItem('users', JSON.stringify(allUsers));
    }

    const registeredCoursesIds = currentUser ? currentUser.registeredCourses || [] : [];
    const completedCoursesIds = currentUser ? currentUser.completedCourses || [] : [];
    
    const elements = {
        profileAvatar: document.getElementById('profileAvatar'),
        displayName: document.getElementById('displayName'),
        displayUsername: document.getElementById('displayUsername'),
        displayEmail: document.getElementById('displayEmail'),
        displayDob: document.getElementById('displayDob'),
        displayIntro: document.getElementById('displayIntro'),
        displayExperience: document.getElementById('displayExperience'),
        displayEducation: document.getElementById('displayEducation'),
        coursesGrid: document.getElementById('coursesGrid'),
        filterAll: document.getElementById('filterAll'),
        filterRegistered: document.getElementById('filterRegistered'),
        filterCompleted: document.getElementById('filterCompleted'),
    };

    function displayUserInfo() {
        if (!currentUser) return;
        elements.profileAvatar.src = currentUser.avatar || `https://placehold.co/120x120/EFEFEF/333?text=${currentUser.email.charAt(0).toUpperCase()}`;
        elements.displayName.textContent = currentUser.name || 'Người dùng mới';
        elements.displayUsername.textContent = `@${currentUser.email.split('@')[0]}`;
        elements.displayEmail.textContent = currentUser.email;
        elements.displayDob.textContent = currentUser.dob || 'Chưa cập nhật';
        elements.displayIntro.textContent = currentUser.intro || 'Chưa cập nhật';
        elements.displayExperience.textContent = currentUser.experience || 'Chưa cập nhật';
        elements.displayEducation.textContent = currentUser.education || 'Chưa cập nhật';
    }

    function createCourseCardHTML(course) {
        const isCompleted = completedCoursesIds.includes(course.id);
        const statusClass = isCompleted ? 'status-completed' : 'status-registered';
        const statusText = isCompleted ? 'Đã hoàn thành' : 'Đã đăng ký';

        return `
            <a href="course-detail.html" class="course-card-profile">
                <img src="${course.img}" alt="${course.title}">
                <div class="info">
                    <h4>${course.title}</h4>
                    <p>${course.author}</p>
                    <div class="course-status ${statusClass}">${statusText}</div>
                </div>
            </a>
        `;
    }

    function renderCourses(coursesToDisplay) {
        if (coursesToDisplay.length === 0) {
            elements.coursesGrid.innerHTML = '<p>Không có khóa học nào trong mục này.</p>';
            return;
        }
        elements.coursesGrid.innerHTML = coursesToDisplay.map(createCourseCardHTML).join('');
    }

    function handleFilter(filterType) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`).classList.add('active');

        let coursesToShow = [];
        const userCoursesIds = [...new Set([...registeredCoursesIds, ...completedCoursesIds])];

        switch (filterType) {
            case 'registered':
                const registeredOnlyIds = registeredCoursesIds.filter(id => !completedCoursesIds.includes(id));
                coursesToShow = allCourses.filter(course => registeredOnlyIds.includes(course.id));
                break;
            case 'completed':
                coursesToShow = allCourses.filter(course => completedCoursesIds.includes(course.id));
                break;
            case 'all':
            default:
                coursesToShow = allCourses.filter(course => userCoursesIds.includes(course.id));
                break;
        }
        renderCourses(coursesToShow);
    }

    elements.filterAll.addEventListener('click', () => handleFilter('all'));
    elements.filterRegistered.addEventListener('click', () => handleFilter('registered'));
    elements.filterCompleted.addEventListener('click', () => handleFilter('completed'));

    displayUserInfo();
    handleFilter('all');
});

