const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !message) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    successMsg.textContent = "Cảm ơn bạn, tin nhắn đã được gửi thành công.";
    contactForm.reset();
});

