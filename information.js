document.addEventListener('DOMContentLoaded', function() {

    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('Vui lòng đăng nhập để xem trang này.');
        window.location.href = 'login.html';
        return;
    }

    const elements = {
        profileAvatar: document.getElementById('profileAvatar'),
        displayName: document.getElementById('displayName'),
        displayUsername: document.getElementById('displayUsername'),
        displayEmail: document.getElementById('displayEmail'),
        displayDob: document.getElementById('displayDob'),
        displayPhone: document.getElementById('displayPhone'),
        socialFacebook: document.getElementById('socialFacebook'),
        socialLinkedin: document.getElementById('socialLinkedin'),
        socialTwitter: document.getElementById('socialTwitter'),
        
        updateInfoBtn: document.getElementById('updateInfoBtn'),
        updateSocialBtn: document.getElementById('updateSocialBtn'),
        
        infoModal: document.getElementById('infoModal'),
        socialModal: document.getElementById('socialModal'),
        infoForm: document.getElementById('infoForm'),
        socialForm: document.getElementById('socialForm'),
        avatarUploadInput: document.getElementById('avatarUploadInput'),
        
        inputName: document.getElementById('inputName'),
        inputDob: document.getElementById('inputDob'),
        inputPhone: document.getElementById('inputPhone'),
        inputFacebook: document.getElementById('inputFacebook'),
        inputLinkedin: document.getElementById('inputLinkedin'),
        inputTwitter: document.getElementById('inputTwitter'),

        displayExperience: document.getElementById('displayExperience'),
        displayEducation: document.getElementById('displayEducation'),
        displayIntro: document.getElementById('displayIntro'),

        updateExperienceBtn: document.getElementById('updateExperienceBtn'),
        updateEducationBtn: document.getElementById('updateEducationBtn'),
        updateIntroBtn: document.getElementById('updateIntroBtn'),

        textModal: document.getElementById('textModal'),
        textModalTitle: document.getElementById('textModalTitle'),
        textForm: document.getElementById('textForm'),
        inputText: document.getElementById('inputText'),
    };

    let currentEditingField = null; 

    function loadUserData() {
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = allUsers.find(user => user.email === loggedInUserEmail);

        if (!currentUser) {
            console.error('Không tìm thấy thông tin người dùng.');
            return;
        }

        elements.profileAvatar.src = currentUser.avatar || 'https://placehold.co/120x120/EFEFEF/333?text=A';
        elements.displayName.textContent = currentUser.name || 'Chưa cập nhật';
        elements.displayUsername.textContent = currentUser.email.split('@')[0];
        elements.displayEmail.textContent = currentUser.email;
        elements.displayDob.textContent = currentUser.dob || 'Chưa cập nhật';
        elements.displayPhone.textContent = currentUser.phone || 'Chưa cập nhật';
        updateSocialLink(elements.socialFacebook, currentUser.facebook);
        updateSocialLink(elements.socialLinkedin, currentUser.linkedin);
        updateSocialLink(elements.socialTwitter, currentUser.twitter);
        elements.inputName.value = currentUser.name || '';
        elements.inputDob.value = currentUser.dob || '';
        elements.inputPhone.value = currentUser.phone || '';
        elements.inputFacebook.value = currentUser.facebook || '';
        elements.inputLinkedin.value = currentUser.linkedin || '';
        elements.inputTwitter.value = currentUser.twitter || '';
        elements.displayExperience.textContent = currentUser.experience || 'Chưa cập nhật';
        elements.displayEducation.textContent = currentUser.education || 'Chưa cập nhật';
        elements.displayIntro.textContent = currentUser.intro || 'Chưa cập nhật';
    }

    function updateSocialLink(element, url) {
        if (url) {
            element.href = url;
            element.style.display = 'inline-flex';
        } else {
            element.href = '#';
            element.style.display = 'none';
        }
    }

    function saveUserData(updatedData) {
        let allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = allUsers.findIndex(user => user.email === loggedInUserEmail);

        if (userIndex !== -1) {
            allUsers[userIndex] = { ...allUsers[userIndex], ...updatedData };
            localStorage.setItem('users', JSON.stringify(allUsers));
            loadUserData();
        }
    }

    function setupModal(modal, openBtn) {
        const closeBtn = modal.querySelector('.modal-close-btn');
        openBtn.addEventListener('click', () => modal.classList.add('show'));
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    function setupTextModal(openBtn, fieldName, modalTitle) {
        openBtn.addEventListener('click', () => {
            currentEditingField = fieldName;
            elements.textModalTitle.textContent = `Cập nhật ${modalTitle}`;
            
            const allUsers = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = allUsers.find(user => user.email === loggedInUserEmail);
            elements.inputText.value = currentUser[fieldName] || '';

            elements.textModal.classList.add('show');
        });
    }

    setupModal(elements.infoModal, elements.updateInfoBtn);
    setupModal(elements.socialModal, elements.updateSocialBtn);

    setupTextModal(elements.updateExperienceBtn, 'experience', 'Kinh nghiệm');
    setupTextModal(elements.updateEducationBtn, 'education', 'Học vấn');
    setupTextModal(elements.updateIntroBtn, 'intro', 'Giới thiệu');

    const closeTextBtn = elements.textModal.querySelector('.modal-close-btn');
    closeTextBtn.addEventListener('click', () => elements.textModal.classList.remove('show'));
    elements.textModal.addEventListener('click', (event) => {
        if (event.target === elements.textModal) {
            elements.textModal.classList.remove('show');
        }
    });

    elements.infoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveUserData({
            name: elements.inputName.value.trim(),
            dob: elements.inputDob.value,
            phone: elements.inputPhone.value.trim()
        });
        elements.infoModal.classList.remove('show');
        alert('Cập nhật thông tin thành công!');
    });

    elements.socialForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveUserData({
            facebook: elements.inputFacebook.value.trim(),
            linkedin: elements.inputLinkedin.value.trim(),
            twitter: elements.inputTwitter.value.trim()
        });
        elements.socialModal.classList.remove('show');
        alert('Cập nhật mạng xã hội thành công!');
    });

    elements.textForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (currentEditingField) {
            const updatedData = {};
            updatedData[currentEditingField] = elements.inputText.value.trim();
            saveUserData(updatedData);
        }
        elements.textModal.classList.remove('show');
        alert('Cập nhật thành công!');
    });

    elements.avatarUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            elements.profileAvatar.src = base64Image;
            saveUserData({ avatar: base64Image });
            if (typeof window.updateHeader === 'function') {
                window.updateHeader();
            }
            alert('Cập nhật ảnh đại diện thành công!');
        };
        reader.readAsDataURL(file);
    });
    
    loadUserData();
});
