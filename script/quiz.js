//vars that have to be accessible across the script
var array_infos = 
[
    '',
    'Na zona tropical do Pacífico. O El Niño é um fenómeno climático global que está relacionado com uma flutuação da pressão atmosférica à superfície – a Oscilação do Sul (“Southern Oscillation”). Está associado a variações do vento e das temperaturas da superfície do mar sobre o Oceano Pacífico tropical e afecta o clima de grande parte dos trópicos e subtrópicos. Não ocorre todos os anos e caracteriza-se pelo aparecimento de água mais quente do que em condições normais ao largo da costa ocidental tropical da América do Sul',
    'A maré é um fenómeno periódico de subida e descida do nível do mar e tem uma origem astronómica associada à acção gravitacional da Lua e do Sol. A altura da maré é definida como a diferença de níveis entre a maré cheia e a maré vazia. O tipo de marés mais frequentemente encontrado é aquele em que há 2 marés cheias e 2 marés vazias em cada dia. Mas há, em alguns locais do Globo, outros tipos de marés (p. ex., com uma única maré cheia e uma única maré vazia ao longo de um dia)',
    'Os agueiros ou correntes de retorno são correntes fortes e estreitas que fluem para o largo a partir da zona de rebentação. Estas correntes são responsáveis por muitos dos afogamentos de banhistas que são apanhados e levados para fora de pé rapidamente (os banhistas apanhados nesta situação devem nadar paralelamente à costa para sair da influência dessas correntes que são muito estreitas). Os agueiros são alimentados por um sistema de correntes ao longo da costa que, por sua vez, se devem ao transporte de água para a costa associado às ondas',
    'As ondas de superfície correspondem a um fenómeno de interacção entre o oceano e a atmosfera, sendo o vento a causa directa da geração das ondas. Mas as ondas que mais interessam para a prática do surf ou do bodyboard não são aquelas que estão associadas a ventos locais (que, em geral, são de pequena amplitude e desordenadas), mas sim as ondas de maior amplitude que vêm de enormes distâncias, da ordem de milhares de quilómetros, e que têm uma forma mais regular (ondulação ou”swell”)',
    'Um tsunami ou maremoto é uma onda de água (ou uma série de ondas) causada por um sismo, uma erupção vulcânica, um deslizamento de terra ou outros movimentos de massa no oceano. O Terramoto de 1755, que destruiu grande parte de Lisboa, foi seguido de um tsunami - que se crê ter atingido a altura de 20 m. Os sismólogos estimam que este sismo atingiu, na escala de Richter, magnitudes entre 8,5 e 9,0 (correspondem praticamente ao máximo atingido em sismos)',
    'A camada da atmosfera desde a superfície do Globo até cerca de 10 km é a Troposfera. Nas regiões tropicais a espessura é cerca do dobro da existente nas regiões polares. Cerca de 80% do ar da atmosfera está na troposfera. O ar perto da superfície é mais quente (porque recebe calor do Globo) e vai arrefecendo em altitude a uma taxa de cerca de 6,5ºC/km',
    'Os gases da atmosfera com efeito de estufa são, fundamentalmente, o vapor de água, o dióxido de carbono, o metano, o ozono, o óxido nitroso, os Clorofluorcarbonetos. Eles são praticamente transparentes para a radiação solar (pequeno comprimento de onda) mas absorvem grande parte da radiação do Globo (grandes comprimentos de onda), não deixando que esta escape para fora da atmosfera. A temperatura da superfície do Globo, na ausência do efeito de estufa, seria -18oC; o aquecimento devido ao efeito de estufa corresponde a 33oC e portanto a temperatura média observada é cerca de 15ºC'
];
var info_text = document.getElementById('answer-info');
var graph_wrapper = document.querySelector('.graph-wrapper');
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
                
                switch (this.parentElement.id) {
                    case "question1":
                        info_text.classList.add('isActive'); 
                        let temp_img = document.getElementById('gulf-img');
                        temp_img.setAttribute('src', './img/gulf.png');                                                                          
                        break;
                    case "question2":
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[1]
                        break;
                    case "question3":
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[2] 
                        break;
                    case "question4":
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[3] 
                        break;
                    case "question5":
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[4] 
                        break;
                    case "question6":                        
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[5]; 
                        break;
                    case "question7":                        
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[6];
                        graph_wrapper.style.filter = "blur(0px)"; 
                        break;
                    case "question8":                        
                        info_text.classList.add('isActive');
                        info_text.innerText = array_infos[7] 
                        break;
                    default:
                        break;
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
        if (currentQuestionIndex === 6) {
            graph_wrapper.style.filter = "blur(10px)";
        } 
        nextButton.style.display = 'none';
        info_text.classList.remove('isActive');
    });
});
