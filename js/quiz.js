const questions = [
  { q: "2 + 3 = ?", a: "5" },
  { q: "4 - 1 = ?", a: "3" },
  { q: "6 + 2 = ?", a: "8" }
];

let index = 0;
let score = 0;
let timer;
let timeLeft = 10;

const qBox = document.getElementById("question-box");
const result = document.getElementById("result");
const timerDisplay = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const historyBody = document.getElementById("history-body");

function getHistory() {
  return JSON.parse(localStorage.getItem("quizHistory")) || [];
}

function saveHistory(score, total, passed) {
  const history = getHistory();
  const newRecord = {
    id: history.length + 1,
    date: new Date().toLocaleString("vi-VN"),
    result: `${score}/${total}`,
    status: passed ? "✅ Đạt" : "❌ Chưa đạt"
  };
  history.push(newRecord);
  localStorage.setItem("quizHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  historyBody.innerHTML = "";
  history.slice().reverse().forEach((item) => {
    const row = `
      <tr>
        <td>${item.id}</td>
        <td>${item.date}</td>
        <td>${item.result}</td>
        <td>${item.status}</td>
      </tr>`;
    historyBody.innerHTML += row;
  });
}

function showQuestion() {
  if (index >= questions.length) return endQuiz();

  qBox.style.display = "block";
  nextBtn.style.display = "inline-block";
  qBox.innerHTML = `
    <p><b>Câu ${index + 1}:</b> ${questions[index].q}</p>
    <input type="text" id="answer" placeholder="Nhập đáp án...">
  `;
  result.textContent = "";
  timeLeft = 10;
  timerDisplay.textContent = `Thời gian: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Thời gian: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);
  const userAns = document.getElementById("answer")?.value.trim();
  if (userAns === questions[index].a) score++;
  index++;
  showQuestion();
}

function endQuiz() {
  clearInterval(timer);
  qBox.innerHTML = "";
  nextBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  startBtn.textContent = "Làm lại";

  const passed = score >= 2;
  if (passed) {
    result.textContent = `Hoàn thành bài! Bạn đúng ${score}/${questions.length} câu.`;
    result.style.color = "green";
  } else {
    result.textContent = `Chưa đạt! Bạn chỉ đúng ${score}/${questions.length} câu.`;
    result.style.color = "red";
  }

  saveHistory(score, questions.length, passed);
}

startBtn.addEventListener("click", () => {
  index = 0;
  score = 0;
  startBtn.style.display = "none";
  result.textContent = "";
  showQuestion();
});

nextBtn.addEventListener("click", nextQuestion);

renderHistory();
