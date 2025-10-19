const fileInput = document.getElementById('personalFile');
const fileName = document.getElementById('fileName');
const uploadBtn = document.getElementById('uploadBtn');
uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        fileName.innerHTML = `Bạn vừa gửi: ${file.name}`;
        fileName.textContent = `Bạn vừa gửi: ${file.name}`;
        alert("File đã được gửi.");
    } else {
        alert("Vui lòng chọn file trước khi gửi.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registerModal");
    const registerBtn = document.getElementById("registerBtn");
    const closeModal = document.getElementById("closeModal");
    const mainContent = document.querySelector(".course-detail");

    const isRegistered = localStorage.getItem("registeredForNews");

    if (!isRegistered) {
        modal.style.display = "flex";
        mainContent.style.filter = "blur(4px)";
    }

    registerBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name && email) {
            localStorage.setItem("registeredForNews", "true");
            alert("Đăng ký thành công! Bạn có thể xem khóa học.");
            modal.style.display = "none";
            mainContent.style.filter = "none";
        } else {
            alert(" Vui lòng nhập đầy đủ thông tin!");
        }
    });

    closeModal.addEventListener("click", () => {
        const choice = confirm(
            " Bạn chưa hoàn tất đăng ký!\n\n👉 OK để tiếp tục đăng ký\n❌ Cancel để quay về danh sách khóa học"
        );

        if (choice) {
            modal.style.display = "flex";
        } else {
            window.location.href = "../html/course-listing.html";
        }
    });
});


