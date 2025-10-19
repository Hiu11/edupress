const searchInput = document.getElementById("searchInput");
const courseCards = document.querySelectorAll(".course-card");
searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    courseCards.forEach(card => {
        const title = card.querySelector(".course-title").textContent.toLowerCase();
        if (title.includes(keyword)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

