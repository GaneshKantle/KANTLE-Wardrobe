const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    quizQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${question.question}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <div class="option">
                        <input type="radio" name="question${index}" value="${option}">
                        <label>${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.question');
    let score = 0;

    quizQuestions.forEach((question, index) => {
        const answerContainer = answerContainers[index];
        const selector = `input[name=question${index}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === question.answer) {
            score++;
            answerContainers[index].style.color = 'green';
        } else {
            answerContainers[index].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);