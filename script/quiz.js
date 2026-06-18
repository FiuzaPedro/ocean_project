document.addEventListener('DOMContentLoaded', function() {
    const questionContainers = document.querySelectorAll('.question-container');
    const glass = document.querySelector('.glass');
    const images = document.querySelectorAll('.graph-wrapper img');
    const counter = document.querySelector('.counter');
    let score = 0;
    let totalQuestions = questionContainers.length;
    let currentQuestionIndex = 0;

    // Initialize counter
    counter.textContent = '0';

    // Show first image initially
    if (images[0]) {
        images[0].classList.add('active');
    }

    // Hide all questions except the first one and add fade-in to first
    questionContainers.forEach((container, index) => {
        if (index !== 0) {
            container.style.display = 'none';
        } else {
            // Add fade-in class to first question after a small delay
            setTimeout(() => {
                container.classList.add('fade-in');
            }, 100);
        }
    });

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'next-button';
    nextButton.textContent = 'Próxima';
    nextButton.style.display = 'none';
    document.querySelector('.left-container').appendChild(nextButton);

    function showQuestion(index) {
        if (index >= totalQuestions) {
            // Quiz completed
            nextButton.style.display = 'none';
            showCompletionMessage();
            return;
        }

        // Hide all questions
        questionContainers.forEach(container => {
            container.style.display = 'none';
            container.classList.remove('fade-in');
        });

        // Show current question with fade-in
        const currentContainer = questionContainers[index];
        currentContainer.style.display = 'block';
        setTimeout(() => {
            currentContainer.classList.add('fade-in');
        }, 10);

        // Show corresponding image
        if (images[index]) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        // Hide glass effect
        glass.classList.add('hidden');
    }

    function showCompletionMessage() {
        const completionDiv = document.createElement('div');
        completionDiv.className = 'completion-message fade-in';
        completionDiv.innerHTML = `
            <h2>Quiz Completado!</h2>
            <p>A sua pontuação: ${score} de ${totalQuestions}</p>
            <button onclick="location.reload()" class="restart-button">Reiniciar Quiz</button>
        `;
        if (score === totalQuestions) {
            new Audio('./audio/freesound_community-goodresult-82807.mp3').play();
        }
        // Hide all questions
        questionContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        // Show completion message
        document.querySelector('.left-container').appendChild(completionDiv);
    }

    questionContainers.forEach((container, index) => {
        const options = container.querySelectorAll('.options > a > div');
        const correctAnswer = container.querySelector('.true');
        const answerImage = images[index];

        // Add click event to each option
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if question is already answered
                if (container.classList.contains('answered')) {
                    return;
                }

                const isCorrect = this.querySelector('p').classList.contains('true');
                const span = this.querySelector('span');

                // Mark question as answered
                container.classList.add('answered');

                // Update score and show feedback
                if (isCorrect) {
                    score++;
                    counter.textContent = score;
                    this.classList.add('answered-correct');
                    span.innerHTML = '<i class="fa-solid fa-check"></i>';
                    new Audio('./audio/chrisiex1-correct-156911.mp3').play();
                } else {
                    this.classList.add('answered-incorrect');
                    span.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    new Audio('./audio/tuomas_data-wrong-answer-21-199825.mp3').play();
                    
                    // Highlight the correct answer
                    if (correctAnswer) {
                        const correctOption = correctAnswer.parentElement;
                        correctOption.classList.add('correct');
                        const correctSpan = correctOption.querySelector('span');
                        correctSpan.innerHTML = '<i class="fa-solid fa-check"></i>';
                    }
                }

                // Show next button if there are more questions
                if (currentQuestionIndex < totalQuestions - 1) {
                    nextButton.style.display = 'block';
                } else {
                    // Last question, show completion after a delay
                    setTimeout(() => {
                        showCompletionMessage();
                    }, 1500);
                }
            });
        });
    });

    // Next button click handler
    nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        nextButton.style.display = 'none';
    });
});
