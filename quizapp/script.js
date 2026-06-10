// ── Quiz Data ────────────────────────────────────────────
const questions = [
  {
    text: "What does S3 stand for in Amazon S3?",
    options: [
      "Simple Storage Service",
      "Secure Server System",
      "Scalable Static Service",
      "Standard Storage Suite",
    ],
    correct: 0,
  },
  {
    text: "What is a CDN (Content Delivery Network)?",
    options: [
      "A type of database",
      "A network that delivers content from the nearest location to the user",
      "A cloud computing language",
      "A security firewall service",
    ],
    correct: 1,
  },
  {
    text: "In Amazon S3, files are stored inside a _____?",
    options: ["Folder", "Container", "Bucket", "Volume"],
    correct: 2,
  },
  {
    text: "What does Amazon CloudFront automatically add to your website?",
    options: ["A database", "HTTPS support", "Server-side rendering", "Authentication"],
    correct: 1,
  },
  {
    text: "In today's architecture, what sits between the user's browser and the S3 bucket?",
    options: ["Lambda", "EC2 instance", "CloudFront", "API Gateway"],
    correct: 2,
  },
];

// ── Result messages based on score ──────────────────────
const results = [
  {
    range: [0, 1],
    icon: "🌧️",
    label: "Keep at it!",
    msg: "Cloud concepts take time to click. Review the session slides and try again — you'll get there.",
  },
  {
    range: [2, 3],
    icon: "⛅",
    label: "Getting there!",
    msg: "You've got the basics down. A quick re-read of the S3 and CloudFront sections and you'll ace it.",
  },
  {
    range: [4, 4],
    icon: "🌤️",
    label: "Almost perfect!",
    msg: "Really solid. One small gap — you've clearly understood most of today's session.",
  },
  {
    range: [5, 5],
    icon: "☀️",
    label: "Cloud Expert!",
    msg: "Perfect score. You nailed S3, CloudFront, and CDN concepts. AWS would be proud.",
  },
];

// ── State ────────────────────────────────────────────────
let currentQ = 0;
let score = 0;
let answered = false;
let answerLog = []; // track correct/wrong for dots

// ── DOM refs ─────────────────────────────────────────────
const screenIntro  = document.getElementById("screen-intro");
const screenQuiz   = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

const progressFill = document.getElementById("progress-fill");
const qCounter     = document.getElementById("q-counter");
const qScore       = document.getElementById("q-score");
const qCard        = document.getElementById("q-card");
const qText        = document.getElementById("q-text");
const optionsGrid  = document.getElementById("options-grid");
const btnNext      = document.getElementById("btn-next");
const btnStart     = document.getElementById("btn-start");
const btnRetry     = document.getElementById("btn-retry");

const resultIcon   = document.getElementById("result-icon");
const resultScore  = document.getElementById("result-score");
const resultLabel  = document.getElementById("result-label");
const resultMsg    = document.getElementById("result-msg");
const scoreBreak   = document.getElementById("score-breakdown");

// ── Screen transitions ───────────────────────────────────
function showScreen(screenEl) {
  [screenIntro, screenQuiz, screenResult].forEach((s) => {
    s.classList.add("hidden");
  });
  screenEl.classList.remove("hidden");
}

// ── Start quiz ───────────────────────────────────────────
btnStart.addEventListener("click", () => {
  currentQ = 0;
  score = 0;
  answered = false;
  answerLog = [];
  showScreen(screenQuiz);
  renderQuestion();
});

// ── Render question ──────────────────────────────────────
function renderQuestion() {
  const q = questions[currentQ];
  answered = false;

  // Update meta
  qCounter.textContent = `${currentQ + 1} / ${questions.length}`;
  qScore.textContent   = `Score: ${score}`;

  // Progress bar
  const pct = (currentQ / questions.length) * 100;
  progressFill.style.width = pct + "%";

  // Animate question card in
  qCard.classList.remove("fade-in");
  void qCard.offsetWidth; // reflow trick to restart animation
  qCard.classList.add("fade-in");
  qText.textContent = q.text;

  // Render options
  optionsGrid.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(i, btn));
    optionsGrid.appendChild(btn);
  });

  // Hide next button
  btnNext.classList.add("hidden");
}

// ── Handle answer selection ──────────────────────────────
function handleAnswer(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const q = questions[currentQ];
  const allBtns = optionsGrid.querySelectorAll(".option-btn");

  // Disable all buttons
  allBtns.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === q.correct) {
    // Correct
    selectedBtn.classList.add("correct");
    score++;
    answerLog.push("correct");
  } else {
    // Wrong — show selected as red, show correct as green
    selectedBtn.classList.add("wrong");
    allBtns[q.correct].classList.add("correct");
    answerLog.push("wrong");
  }

  // Update score display
  qScore.textContent = `Score: ${score}`;

  // Show next / finish button
  btnNext.classList.remove("hidden");
  if (currentQ === questions.length - 1) {
    btnNext.innerHTML = 'Finish <span class="arrow">→</span>';
  } else {
    btnNext.innerHTML = 'Next <span class="arrow">→</span>';
  }
}

// ── Next question or show results ────────────────────────
btnNext.addEventListener("click", () => {
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
});

// ── Show results ─────────────────────────────────────────
function showResults() {
  // Final progress bar
  progressFill.style.width = "100%";

  // Find result tier
  const tier = results.find(
    (r) => score >= r.range[0] && score <= r.range[1]
  );

  resultIcon.textContent  = tier.icon;
  resultScore.textContent = `${score} / ${questions.length}`;
  resultLabel.textContent = tier.label;
  resultMsg.textContent   = tier.msg;

  // Score breakdown dots
  scoreBreak.innerHTML = "";
  answerLog.forEach((status) => {
    const dot = document.createElement("div");
    dot.className = `dot ${status}`;
    scoreBreak.appendChild(dot);
  });

  showScreen(screenResult);
}

// ── Retry ────────────────────────────────────────────────
btnRetry.addEventListener("click", () => {
  currentQ = 0;
  score = 0;
  answered = false;
  answerLog = [];
  showScreen(screenQuiz);
  renderQuestion();
});
