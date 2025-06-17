const questionEl = document.getElementById("question");
const buttons = document.querySelectorAll(".options button");

function generateQuestion() {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const isAddition = Math.random() > 0.5;
    const questionText = isAddition ? `${a} + ${b} = ?` : `${a} - ${b} = ?`;
    const answer = isAddition ? a + b : a - b;

    questionEl.textContent = questionText;

    const correctIndex = Math.floor(Math.random() * 4);
    const answers = [];

    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            answers.push(answer);
        } else {
            let wrong;
            do {
                wrong = answer + Math.floor(Math.random() * 10 - 5);
            } while (wrong === answer || answers.includes(wrong));
            answers.push(wrong);
        }
    }

    buttons.forEach((btn, i) => {
        btn.textContent = answers[i];
        btn.dataset.correct = (i === correctIndex);
        btn.style.backgroundColor = "";
    });
}

function checkAnswer(btn) {
    const correct = btn.dataset.correct === "true";
    buttons.forEach(b => b.disabled = true);
    if (correct) {
        btn.style.backgroundColor = "green";
    } else {
        btn.style.backgroundColor = "red";
    }
    setTimeout(() => {
        buttons.forEach(b => b.disabled = false);
        generateQuestion();
    }, 1000);
}

generateQuestion();
